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
  },
}))

interface ProductDetailsProp {
  product: CartItemType
  addToCart: (item: CartItemType) => any
  setVariant: (variant: ProductDetail) => any
  setCount: (count: number) => any
}

const ProductDetails = (props: ProductDetailsProp) => {
  const { setCount, addToCart, setVariant, product, ...rest } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ProductData product={product} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      <DetailsTabs product={product?.product} />
    </div>
  )
}

export default ProductDetails
