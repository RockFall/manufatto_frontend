import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { ProductData, DetailsTabs } from './components'
import { CartItemType } from '../../../../slices/cartSlice'
//import { ProductDetail } from '../../../../generated/graphql'
import { ProductDetail } from '../../../../util/custom_types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '4%',
  },
  mainImage: {
    objectFit: 'fill',
    margin: '10px 28px 28px'
  },
}))

interface ProductDetailsMobileProp {
  product: CartItemType
  addToCart: (item: CartItemType) => any
  setVariant: (variant: ProductDetail) => any
  setCount: (count: number) => any
}

const ProductDetailsMobile = (props: ProductDetailsMobileProp) => {
  const { setCount, addToCart, setVariant, product, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/*<ImageGrid product={product}/>*/}
      <img src={(product.product.images.edges[0].node as any).originalWbp} className={classes.mainImage} width={'100%'} height={'100%'} />
      <ProductData product={product} image={(product.product.images.edges[0].node as any).originalWbp} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      <DetailsTabs product={product.product} />
    </div>
  )
}

export default ProductDetailsMobile
