import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Link, Grid, Typography, Divider } from '@mui/material'
import { LoginTabs } from '../../../components'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 3%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    [theme.breakpoints.up(1800)]: {
      justifyContent: 'center',
    },
    alignContent: 'center',
    marginBottom: '60px'
  },
  leftSideContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up(1800)]: {
      marginRight: '220px'
    },
  },
  history: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,

    position: 'relative',
    padding: '0 6% 0 4%',
    margin: '2% 50% 0 0',
    [theme.breakpoints.down('md')]: {
      margin: '2.3% 20.7% 0 17%',
    },
  },
  divider: {
    margin: '2% 6% 4.2% 4%',
    [theme.breakpoints.down('md')]: {
      margin: '3% 20.7% 4.2%',
    },
  },
  arrowIcon: {
    fontSize: '8px',
    margin: '0px 8px',
  },
  prod: {
    fontSize: '12px',
    fontWeight: 600,
  },  
  link: {
    fontSize: '12px',
    color: '#6F6C6B',
    fontWeight: 400,
  },
  title: {
    fontSize: '70px',
    fontWeight: 900
  },
  text: {
    color: '#6F6C6B',
    fontSize: '20px',
    fontWeight: 400
  },
  cardContainer: {
    //margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',

    marginLeft: '20px'
  },
  brand: {
    fontWeight: 400,
    fontSize: '14px',
    color: '#999999',
  },
  name: {  
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    color: '#1D1D1F',
  },
  ref: {
    fontWeight: 600,
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#999999',
  },
  colorNSize: {
    marginTop: '2%',
    fontWeight: 400,
    fontSize: '12px',
    color: '#999999',
  },
  
}));

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

interface LoginProps{
  //artData: artList[],
 //product: any
}

interface CustomizedProduct {
  image: string,
  size: string,
  quantity: string,
  postal: string,
  color: string,
  shop: string,
  name: string,
  ref: string,
  artList?: ArtList
}



export default function Index(props: LoginProps) {
    const classes = useStyles()

    const [product, setProduct] = useState<CustomizedProduct>()

    useEffect(() => {
      const customizedProduct = JSON.parse(window.localStorage.getItem('customizedProduct'))
      
      if(customizedProduct){      
        setProduct(customizedProduct.customizedProduct.addCustomizedProduct.item)
      }    
    }, [])
    
    const ProductCard = () => {
      return (
        <div className={classes.cardContainer}>
          <img src={product.image} width={120} height={150} />
          <div className={classes.productInfo}>
            <div className={classes.brand}>{product.shop}</div>
            <div className={classes.name}>{product.name}</div>
            <div className={classes.ref}>REF: {product.ref}</div>
            <div className={classes.colorNSize}>Tamanho: {product.size} - Cor: {product.color}</div>
          </div>
        </div>
      )
    };

    return (
      product &&
      <div className={classes.root}>
        <div className={classes.history}>
            <Link href='#' className={classes.link}>
                {' '}
                Home{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Link href='#' className={classes.link}>
                {' '}
                Customização{' '}
            </Link>
            <ArrowForwardIosIcon className={classes.arrowIcon} />
            <Typography className={classes.prod}> Login </Typography>
        </div>

        <Divider className={classes.divider} />
        <div className={classes.container}>
          <div className={classes.leftSideContainer}>
            <Typography variant="h1" className={classes.title}>Customize</Typography>
            <h3 className={classes.text}>Para customizar faça seu login crie a sua conta</h3>
            <ProductCard/>
          </div>
          
          <LoginTabs/>
        </div>
      </div>
    )
};

