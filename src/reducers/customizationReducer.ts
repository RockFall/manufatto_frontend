import { CustomizedProductTypes, CustomizedProductType} from '../actions/customizationActions'
//import { CurrentAdminUser } from '../generated/graphql'

export interface CustomizedProduct {
  customizedProduct: CustomizedProductType
}

const initialState: CustomizedProduct = {
    customizedProduct: null
}

export function customizationReducer(state = initialState, action: CustomizedProductTypes): CustomizedProduct {  
  switch (action.type) {
    case "CUSTOMIZED_PRODUCT_ADD":
      const { customizedProduct: addCustomizedProduct } = action
      const addedCustomizedProduct = { ...state, customizedProduct: {...state?.customizedProduct, addCustomizedProduct}}

      console.dir({ addedCustomizedProduct, addCustomizedProduct })
      localStorage.setItem('customizedProduct', JSON.stringify(addedCustomizedProduct))
      return addedCustomizedProduct

    default:
      return state
  }
}

export default customizationReducer
