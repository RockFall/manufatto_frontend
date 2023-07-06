import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Hidden } from '@material-ui/core'
import { addCartItem, CartItemType} from '../../actions'
import { ProductDetails, ProductDetailsMobile } from './components'
//import { Product, ProductDetail } from '../../generated/graphql'
import { Product } from '../../generated/graphql'

interface ProductSingleProps {
  product: any//Product
}

const ProductSingle = (props: ProductSingleProps) => {
  const { product } = props
  console.log(product);
  
  const dispatch = useDispatch()
  const initialCartItem = {
    productDetail: product.variants[0],
    product: product,
    count: product.variants[0].stock == 0 ? 0 : 1,
  }
  const [cartItem, setCartItem] = useState<CartItemType>(initialCartItem)

  const addToCart = () => {
    if(cartItem.count >= 0){
      dispatch(addCartItem(cartItem))
    }
  }

  const setVariant = (variant: ProductDetail) => {
    if (variant.stock == 0) return;
    setCartItem({... cartItem, productDetail: variant, count: (cartItem.count >= variant.stock) ? variant.stock : cartItem.count})
  }

  const setCount = (count: number) => {
    if(cartItem.productDetail.stock >= 1){
      setCartItem({... cartItem, count: (count >= cartItem.productDetail.stock) ? cartItem.productDetail.stock : count})
    }
  }
  return (
    <div>
      <Hidden smDown>
        <ProductDetails product={cartItem} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      </Hidden>

      <Hidden mdUp>
        <ProductDetailsMobile product={cartItem} addToCart={addToCart} setVariant={setVariant} setCount={setCount}/>
      </Hidden>
    </div>
  )
}

export default ProductSingle
