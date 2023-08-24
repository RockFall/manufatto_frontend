import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
import { 
  ImageList,
  ImageListItem,
  Hidden,
} from '@mui/material'
import { ProductBuy } from './components'
import { CartItemType } from '../../../../../../slices/cartSlice'
import { ProductDetail } from '../../../../../../util/custom_types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageGrid: {
    width: '270px',
    height: '690px',
    [theme.breakpoints.up(1500)]: {
      height: theme.spacing(100),
    },
    [theme.breakpoints.between('md', 1200)]: {
      width: '300px',
      height: '610px'
    },
  },
  imageButton: {
    //width: '187px',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    cursor: 'pointer',
    '&:hover': { 
      textDecoration: 'none',
      //backgroundColor: '#f5f5f5',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '& .Mui-disabled': {
        backgroundColor: 'transparent',
      },
     },
    '&:active': { 
      backgroundColor: '#f5f5f5',
     },
  },
  mainImageContainer: {
    margin: '0 2.1%',
    height: theme.spacing(86.25),
    width: theme.spacing(86),
    [theme.breakpoints.between('md', 1200)]: {
      height: '610px',
    },
    [theme.breakpoints.up(1500)]: {
      height: theme.spacing(100),
      width: theme.spacing(91),
    },
    [theme.breakpoints.up(2100)]: {
      height: theme.spacing(115),
      width: theme.spacing(86),
      margin: '0 1.5% 0 3%',
    },
  },
  mainImage: {
    objectFit: 'cover',    
  }
}))


interface ProductDataProp {
  product: CartItemType
  addToCart: (item: CartItemType) => any
  setVariant: (variant: ProductDetail) => any
  setCount: (count: number) => any
}

const ProductData = (props: ProductDataProp) => {
  const { addToCart, setVariant, setCount, product, ...rest } = props;
  const [currentImage, setCurrentImage] = useState<string>('/product/moncler1.svg');
  const classes = useStyles();
  const staticImages = [
    {
      id: 0,
      path: '/product/moncler1.svg',
    },
    {
      id: 1,
      path: '/product/moncler2.svg',
    },
    {
      id: 2,
      path: '/product/moncler3.svg',
    },
    {
      id: 3,
      path: '/product/moncler4.svg',
    }
  ];

  const handleCurrentImageChange = (event, imgSrc: string) => {
    event.persist && event.persist()
    setCurrentImage(imgSrc)
  };

  return (
    <div className={classes.root}>
      {/* Seletor de imagem */}
      {/* Versão estática */}
      <ImageList rowHeight={210} className={classes.imageGrid} cols={1}> {/* TODO: changed cellHeight to rowHeight*/}
        {staticImages.map((image) => {
          return(
            <ImageListItem key={image.id} style={{width: '187px'}} className={classes.imageButton} component="button" onClick={event => handleCurrentImageChange(event, image.path)}> 
              <img src={image.path}/>
            </ImageListItem>
          )
        })}
      </ImageList>

      {/* Versão dinâmica */}
      {/*<Hidden smDown>
        <ImageList cellHeight={210} className={classes.imageGrid} cols={1}>
          {product.product.images && product.product.images.map((image) => {
            return(
              <ImageListItem key={image.id} style={{width: '187px'}} className={classes.imageButton} component="button" onClick={event => handleCurrentImageChange(event, image.path.originalWbp)}> 
                <img src={image.path.thumbnailWbp}/>
              </ImageListItem>
            )
          })}
        </ImageList>
      </Hidden>*/}

      {/* Imagem selecionada */}
      <div className={classes.mainImageContainer}>
        <img src={currentImage} className={classes.mainImage} width={'100%'} height={'100%'}/>
      </div>

      {/*Informações do produto para compra */}
      <ProductBuy image={currentImage} product={product} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
    </div>
  )
}

export default ProductData