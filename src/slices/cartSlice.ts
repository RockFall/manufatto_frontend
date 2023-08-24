import { Product } from '../generated/graphql'
import { ProductDetail } from '../util/custom_types'
//import { CurrentAdminUser } from '../generated/graphql'
import Utils from '../util/custom_formatter'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productDetail: ProductDetail;
    product: Product;
    count: number;
    customDetails?: any;
}

interface ShopCart {
  shopName: string
  cartItems: CartItem[]
}
interface Cart {
  shopItems: ShopCart[]
}

export type CartItemType = CartItem
export type CartShopType = ShopCart
export type CartType = Cart

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      // logic to add an item to the cart here
      const addCartItem = action.payload
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
    },
    removeItemFromCart: (state, action: PayloadAction<{ index: number, shopName: string }>) => {
      // logic to remove an item from the cart here
      const { index, shopName } = action.payload
      const removeShopIndex = findShop(state, shopName)
      let removeShopItems = state.shopItems
      if( removeShopIndex >= 0 ){
        if(removeShopItems[removeShopIndex].cartItems.length > 1){
          removeShopItems[removeShopIndex].cartItems.splice(index, 1)
        } else {
          removeShopItems.splice(removeShopIndex, 1)
        }
      }
      const removedCart = {...state, shopItems: removeShopItems}
      localStorage.setItem('cart', JSON.stringify(removedCart))
      return removedCart

    },
    updateCartItem: (state, action: PayloadAction<{ cartItem: CartItem, index: number }>) => {
      // logic to update a cart item here
      const { cartItem: updatedCartItem, index: editIndex } = action.payload
      const editShopIndex = findShop(state, Utils.handleFromVendor(updatedCartItem.product.vendor))
      let editShopItems = state.shopItems
      if( editShopIndex => 0 ){
        editShopItems[editShopIndex].cartItems[editIndex] = updatedCartItem
      }      
      const updatedCart = { ...state, shopItems: editShopItems }

      console.dir({ updatedCart, updatedCartItem })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return updatedCart
    },
    checkoutCart: (state) => {
      // logic to handle cart checkout here
      localStorage.setItem('cart', '{}')
      return initialState
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateCartItem, checkoutCart } = cartSlice.actions;
export default cartSlice.reducer;