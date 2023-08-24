import { combineReducers } from 'redux'

/*
import cartReducer, { Cart } from './cartReducer'
import customizedProductReducer, { CustomizedProduct } from './customizationReducer'

export interface State {
  cart: Cart,
  customizedProduct: CustomizedProduct
}

const rootReducer = combineReducers<State>({
  cart: cartReducer,
  customizedProduct: customizedProductReducer 
})*/

import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
})

export default rootReducer