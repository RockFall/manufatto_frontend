import React, { useState } from 'react';
import { makeStyles } from '@mui/styles'
import { 
  ImageList,
  ImageListItem,
  Hidden,
} from '@mui/material'
import { ProductBuy } from './components'
import { CartItemType } from '../../../../../../slices/cartSlice'
import { ProductDetail, ImageType } from '../../../../../../util/custom_types'

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
  const [currentImage, setCurrentImage] = useState<string>((product.product.images.edges[0].node as any).originalWbp);
  const classes = useStyles();

  const handleCurrentImageChange = (event, imgSrc: string) => {
    event.persist && event.persist()
    setCurrentImage(imgSrc)
  };

  return (
    <div className={classes.root}>
      {/* Seletor de imagem */}
      {/* Versão estática */}
      {/*<ImageList rowHeight={210} className={classes.imageGrid} cols={1}> {
        // TODO: changed cellHeight to rowHeight
      }
        {staticImages.map((image) => {
          return(
            <ImageListItem key={image.id} style={{width: '187px'}} className={classes.imageButton} component="button" onClick={event => handleCurrentImageChange(event, image.path)}> 
              <img src={image.path}/>
            </ImageListItem>
          )
        })}
      </ImageList>*/}

      {/* Versão dinâmica */}
      <Hidden smDown>
        <ImageList rowHeight={210} className={classes.imageGrid} cols={1}>
          {product.product.images && product.product.images.edges.map((node) => {
            return(
              <ImageListItem key={node.node.id} style={{width: '187px'}} className={classes.imageButton} component="button" onClick={event => handleCurrentImageChange(event, (node.node as any).originalWbp)}> 
                <img src={(node.node as any).originalWbp}/>
              </ImageListItem>
            )
          })}
        </ImageList>
      </Hidden>

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