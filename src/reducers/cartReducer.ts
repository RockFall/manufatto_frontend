//import { Product, ProductMaterial, ProductSize } from '../generated/graphql'
import * as actionTypes from '../actions'
import { CartActionTypes, CartItemType } from '../actions/cartActions'
//import { CurrentAdminUser } from '../generated/graphql'
import Utils from '../util/custom_formatter'

interface shopCart {
  shopName: string
  cartItems: CartItemType[]
}
export interface Cart {
  shopItems: shopCart[]
}

const initialState: Cart = {
  shopItems: []
}

const findShop = (state, shopName) => {
  let index = -1
  state?.shopItems.map((shop, i)=> {
    if(shop.shopName === shopName){
      index = i
    }
  })
  return index
}

export function cartReducer(state = initialState, action: CartActionTypes): Cart {  
  switch (action.type) {
    case actionTypes.CART_ITEM_ADD:
      const { cartItem: addCartItem } = action
      const shopSlug = Utils.handleFromVendor(addCartItem.product.vendor)
      const shopIndex = findShop(state, shopSlug)
      let newShopItems = state.shopItems
      if( shopIndex <= -1 ){
        newShopItems =  [...state?.shopItems, {shopName: shopSlug , cartItems: [addCartItem]}]
      }else {
        newShopItems[shopIndex] = {...newShopItems[shopIndex], cartItems: [...newShopItems[shopIndex].cartItems, addCartItem]}
      }
      const addedCart = {...state, shopItems: newShopItems}

      console.dir({ addedCart, addCartItem })
      localStorage.setItem('cart', JSON.stringify(addedCart))
      return addedCart

    case actionTypes.CART_ITEM_REMOVE:
      const { index, shopName } = action
      const removeShopIndex = findShop(state, shopName)
      let removeShopItems = state.shopItems
      if( shopIndex => 0 ){
        if(removeShopItems[shopIndex].cartItems.length > 1){
          removeShopItems[shopIndex].cartItems.splice(index, 1)
        } else {
          removeShopItems.splice(shopIndex, 1)
        }
      }
      const removedCart = {...state, shopItems: removeShopItems}
      localStorage.setItem('cart', JSON.stringify(removedCart))
      return removedCart

    case actionTypes.CART_ITEM_UPDATE:
      const { cartItem: updatedCartItem, index: editIndex } = action
      const editShopIndex = findShop(state, Utils.handleFromVendor(updatedCartItem.product.vendor))
      let editShopItems = state.shopItems
      if( editShopIndex => 0 ){
        editShopItems[editShopIndex].cartItems[editIndex] = updatedCartItem
      }      
      const updatedCart = { ...state, shopItems: editShopItems }

      console.dir({ updatedCart, updatedCartItem })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart

    case actionTypes.CART_CHECKOUT:
      localStorage.setItem('cart', '{}')
      return initialState
      

    default:
      return state
  }
}

export default cartReducer
