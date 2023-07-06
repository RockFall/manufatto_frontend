import { Product, ProductDetail } from '../generated/graphql'
export const CUSTOMIZED_PRODUCT_ADD = 'CUSTOMIZED_PRODUCT_ADD'

interface Art {
  path: string,
  smallPrice: string,
  mediumPrice: string,
  largePrice: string
}

interface ArtList {
  artist: {
    name: string,
    avatar: string
  },
  images: Art[]
};

interface CustomizedProduct {
  productDetail: ProductDetail,
  product: Product,  
  count: number
  customDetails?: any
}

interface CustomizedProductAddAction {
  type: typeof CUSTOMIZED_PRODUCT_ADD,
  customizedProduct: CustomizedProduct
}

export type CustomizedProductTypes = CustomizedProductAddAction
export type CustomizedProductType = CustomizedProduct


export const addCustomizedProduct = (customizedProduct: CustomizedProduct) => (dispatch: Function) =>
  dispatch({
    type: CUSTOMIZED_PRODUCT_ADD,
    customizedProduct: customizedProduct
  })