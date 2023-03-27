import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  Avatar,
  ButtonBase,
  Grid,
  IconButton,
  SvgIcon,
  Link
} from '@material-ui/core'
import {
  RadioButtonChecked,
  FiberManualRecord
} from '@material-ui/icons';
import ArtDialog from '../ArtDialog' 
import Carousel, { consts } from 'react-elastic-carousel'
import { addCustomizedProduct, CustomizedProductType } from '../../actions'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { CustomizedProduct } from '../../reducers/customizationReducer';


const useStyles = makeStyles(theme => ({
  root: {
    //padding: '2% 0',
  },
  artistCard: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '-20px'
  },
  avatar: {
    width: 55,
    height: 55
  },
  artistName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#6F6C6B',
  },
  imagesContainer: {
    display: 'block',
    margin: '0 auto',
    width: '87%',
    [theme.breakpoints.up(1500)]: {
      width: '1200px',
    },
  },
  paginationButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  paginationButton: {
    padding: 0,
    margin: '0 4%'
  },
  arrowButton: {
    alignSelf: 'center'
  },
  image: {
    width: 230,
    height: 340,
    [theme.breakpoints.down(1280)]: {
      width: 170,
      height: 280,
    },
  }
}))

interface Art {
  path: string,
  smallPrice: string,
  mediumPrice: string,
  largePrice: string
}

interface ArtList {
  artist: {
    name: string,
    avatar: string
  },
  images: Art[]
};

interface ArtGridProp {
  artList: ArtList,
  step: number
}

const ArtGrid = (props: ArtGridProp) => {
  const { artList, step, ...rest } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()

  const [product, setProduct] = useState<CustomizedProductType>()

  useEffect(() => {
    const customizedProduct = JSON.parse(window.localStorage.getItem('customizedProduct'))
    
    if(customizedProduct){      
      setProduct(customizedProduct.customizedProduct.addCustomizedProduct)
    }else router.push('errors/404')    
  }, [])

  const addItem = (item: CustomizedProductType) => {
    dispatch(addCustomizedProduct(item))
  };

  const handleUpdateRedux = (e) => {
    e.preventDefault()

    addItem({
      ...product,
      customDetails: {
        ...product.customDetails,
        artist: artList.artist
      }  
    })
    router.push('/customizar/1')
  };
  
  const arrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? 
      (<SvgIcon color={isEdge ? "disabled" : "primary"} fontSize="large"><path fill="currentColor" d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M6,13H14L10.5,16.5L11.92,17.92L17.84,12L11.92,6.08L10.5,7.5L14,11H6V13Z" /></SvgIcon>):
      (<SvgIcon color={isEdge ? "disabled" : "primary"} fontSize="large"><path fill="currentColor" d="M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z" /></SvgIcon>) 

      return (
        <IconButton className={classes.arrowButton} onClick={onClick} disabled={isEdge}>
          {pointer}
        </IconButton>
    )
  };

  const paginationCircle = ({ pages, activePage, onClick }) => {
    return (
      <div className={classes.paginationButtonsContainer}>
        {pages.map(page => {
          const isActivePage = activePage === page
          const icon = isActivePage ? (<RadioButtonChecked fontSize="small"/>) : (<FiberManualRecord fontSize="small"/>)
          return (
            <IconButton className={classes.paginationButton} key={page} onClick={() => onClick(page)}>
              {icon}
            </IconButton>
          )
        })}
      </div>
    )
  };

  const ArtistCard = () => {
    switch(step){
      case 0: return (
        <div className={classes.artistCard}>
          <ButtonBase onClick={(e) => handleUpdateRedux(e)}><Avatar className={classes.avatar} alt={artList.artist.name} src={artList.artist.avatar}/></ButtonBase>
          <ButtonBase onClick={(e) => handleUpdateRedux(e)}><p className={classes.artistName}><b>{artList.artist.name}</b></p></ButtonBase>
        </div>
      );
      case 1: return (
        <div className={classes.artistCard}>
          <Avatar className={classes.avatar} alt={product.customDetails.artist.name} src={product.customDetails.artist.avatar}/>
          <p className={classes.artistName}>{product.customDetails.artist.name}</p>
        </div>              
      );
    };
  }  

  return (
    <div className={classes.root}>
      { product &&
        <div>
          <ArtistCard/> 
          <div className={classes.imagesContainer}>
            <Carousel isRTL itemsToShow={4} renderArrow={arrow} renderPagination={paginationCircle}>
              {artList.images.map((image, _id) => {
                switch(step){
                  case 0: return (<img key={_id} className={classes.image} src={image.path}/>);
                  case 1: return (<ArtDialog key={_id} image={image}/>);
                }
              })}
            </Carousel>
          </div>
        </div>
      }
    </div>
  )
}

export default ArtGrid
