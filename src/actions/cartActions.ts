import { Product, ProductDetail, ProductMaterial, ProductSize } from '../generated/graphql'
export const CART_ITEM_ADD = 'CART_ITEM_ADD'
export const CART_ITEM_REMOVE = 'CART_ITEM_REMOVE'
export const CART_ITEM_UPDATE = 'CART_ITEM_UPDATE'
export const CART_CHECKOUT = 'CART_CHECKOUT'

interface CartItem {
  productDetail: ProductDetail
  product: Product
  count: number
  customDetails?: any
}

interface CartShopItem {
  shopName: string
  cartItems: CartItem[]
}

interface CartAddAction {
  type: typeof CART_ITEM_ADD,
  cartItem: CartItem
}
interface CartRemoveAction {
  type: typeof CART_ITEM_REMOVE,
  index: number,
  shopName: string
}
interface CartUpdateAction {
  type: typeof CART_ITEM_UPDATE,
  index: number
  cartItem: CartItem
}
interface CartCheckoutAction {
  type: typeof CART_CHECKOUT,
}


export type CartActionTypes = CartAddAction | CartRemoveAction | CartUpdateAction | CartCheckoutAction
export type CartItemType = CartItem
export type CartShopType = CartShopItem

export const addCartItem = (cartItem: CartItem) => (dispatch: Function) =>
  dispatch({
    type: CART_ITEM_ADD,
    cartItem: cartItem
  })

export const removeCartItem = (index: number, shopName: string) => (dispatch: Function) =>
  dispatch({
    type: CART_ITEM_REMOVE,
    index: index,
    shopName: shopName
  })

export const updateCartItem = (cartItem: CartItem, index: Number) => (dispatch: Function) =>
  dispatch({
    type: CART_ITEM_UPDATE,
    index: index,
    cartItem: cartItem
  })

export const checkoutCart = () => (dispatch: Function) =>
  dispatch({
    type: CART_CHECKOUT,
  })