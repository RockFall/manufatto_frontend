import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Hidden } from '@mui/material'
import { addItemToCart, CartItemType} from '../../slices/cartSlice'
import { ProductDetails, ProductDetailsMobile } from './components'
import { ProductDetail } from '../../util/custom_types'
import { Product } from '../../generated/graphql'

interface ProductSingleProps {
  product: Product
}

const ProductSingle = (props: ProductSingleProps) => {
  const { product } = props
  console.log(product);
  
  const dispatch = useDispatch()
  const initialCartItem = {
    productDetail: product.variants[0],
    product: product,
    count: product.variants.nodes[0].inventoryQuantity == 0 ? 0 : 1,
  }
  const [cartItem, setCartItem] = useState<CartItemType>(initialCartItem)

  const addToCart = () => {
    if(cartItem.count >= 0){
      dispatch(addItemToCart(cartItem))
    }
  }

  const setVariant = (variant: ProductDetail) => {
    if (parseInt(variant.quantity, 10) == 0) return;
    setCartItem({... cartItem, productDetail: variant, count: (cartItem.count >= parseInt(variant.quantity)) ? parseInt(variant.quantity) : cartItem.count})
  }

  const setCount = (count: number) => {
    if(parseInt(cartItem.productDetail.quantity) >= 1){
      setCartItem({... cartItem, count: (count >= parseInt(cartItem.productDetail.quantity)) ? parseInt(cartItem.productDetail.quantity) : count})
    }
  }
  return (
    <div>
      <Hidden mdDown>
        <ProductDetails product={cartItem} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      </Hidden>

      <Hidden mdUp>
        <ProductDetailsMobile product={cartItem} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      </Hidden>
    </div>
  );
}

export default ProductSingle
