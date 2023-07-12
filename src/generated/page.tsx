import * as Types from './graphql'

import * as Operations from './graphql'
import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client'
import * as Apollo from '@apollo/client'
import type React from 'react'
import { getApolloClient } from '../withApollo'
export async function getServerPageHomeDetails(
  options: Omit<Apollo.QueryOptions<Types.HomePageDetailsQueryVariables>, 'query'>,
  ctx?: any,
) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.HomePageDetailsQuery>({ ...options, query: Operations.HomePageDetailsDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useHomeDetails = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.HomePageDetailsQuery, Types.HomePageDetailsQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.HomePageDetailsDocument, options)
}
export type PageHomeDetailsComp = React.FC<{ data?: Types.HomePageDetailsQuery; error?: Apollo.ApolloError }>
export const withPageHomeDetails =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.HomePageDetailsQuery, Types.HomePageDetailsQueryVariables>) =>
  (WrappedComponent: PageHomeDetailsComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.HomePageDetailsDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrHomeDetails = {
  getServerPage: getServerPageHomeDetails,
  withPage: withPageHomeDetails,
  usePage: useHomeDetails,
}
export async function getServerPageProductsCatalog(
  options: Omit<Apollo.QueryOptions<Types.ProductsCatalogQueryVariables>, 'query'>,
  ctx?: any,
) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.ProductsCatalogQuery>({ ...options, query: Operations.ProductsCatalogDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useProductsCatalog = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductsCatalogQuery, Types.ProductsCatalogQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.ProductsCatalogDocument, options)
}
export type PageProductsCatalogComp = React.FC<{ data?: Types.ProductsCatalogQuery; error?: Apollo.ApolloError }>
export const withPageProductsCatalog =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductsCatalogQuery, Types.ProductsCatalogQueryVariables>) =>
  (WrappedComponent: PageProductsCatalogComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.ProductsCatalogDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrProductsCatalog = {
  getServerPage: getServerPageProductsCatalog,
  withPage: withPageProductsCatalog,
  usePage: useProductsCatalog,
}
export async function getServerPageProductByHandle(
  options: Omit<Apollo.QueryOptions<Types.ProductByHandleQueryVariables>, 'query'>,
  ctx?: any,
) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.ProductByHandleQuery>({ ...options, query: Operations.ProductByHandleDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useProductByHandle = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductByHandleQuery, Types.ProductByHandleQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.ProductByHandleDocument, options)
}
export type PageProductByHandleComp = React.FC<{ data?: Types.ProductByHandleQuery; error?: Apollo.ApolloError }>
export const withPageProductByHandle =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductByHandleQuery, Types.ProductByHandleQueryVariables>) =>
  (WrappedComponent: PageProductByHandleComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.ProductByHandleDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrProductByHandle = {
  getServerPage: getServerPageProductByHandle,
  withPage: withPageProductByHandle,
  usePage: useProductByHandle,
}
export async function getServerPageProductById(options: Omit<Apollo.QueryOptions<Types.ProductByIdQueryVariables>, 'query'>, ctx?: any) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.ProductByIdQuery>({ ...options, query: Operations.ProductByIdDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useProductById = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductByIdQuery, Types.ProductByIdQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.ProductByIdDocument, options)
}
export type PageProductByIdComp = React.FC<{ data?: Types.ProductByIdQuery; error?: Apollo.ApolloError }>
export const withPageProductById =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ProductByIdQuery, Types.ProductByIdQueryVariables>) =>
  (WrappedComponent: PageProductByIdComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.ProductByIdDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrProductById = {
  getServerPage: getServerPageProductById,
  withPage: withPageProductById,
  usePage: useProductById,
}
export async function getServerPageShopDetails(options: Omit<Apollo.QueryOptions<Types.ShopDetailsQueryVariables>, 'query'>, ctx?: any) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.ShopDetailsQuery>({ ...options, query: Operations.ShopDetailsDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useShopDetails = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ShopDetailsQuery, Types.ShopDetailsQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.ShopDetailsDocument, options)
}
export type PageShopDetailsComp = React.FC<{ data?: Types.ShopDetailsQuery; error?: Apollo.ApolloError }>
export const withPageShopDetails =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ShopDetailsQuery, Types.ShopDetailsQueryVariables>) =>
  (WrappedComponent: PageShopDetailsComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.ShopDetailsDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrShopDetails = {
  getServerPage: getServerPageShopDetails,
  withPage: withPageShopDetails,
  usePage: useShopDetails,
}
export async function getServerPageShopsList(options: Omit<Apollo.QueryOptions<Types.ShopsListQueryVariables>, 'query'>, ctx?: any) {
  const apolloClient = getApolloClient(ctx)

  const data = await apolloClient.query<Types.ShopsListQuery>({ ...options, query: Operations.ShopsListDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  }
}
export const useShopsList = (
  optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ShopsListQuery, Types.ShopsListQueryVariables>,
) => {
  const router = useRouter()
  const options = optionsFunc ? optionsFunc(router) : {}
  return useQuery(Operations.ShopsListDocument, options)
}
export type PageShopsListComp = React.FC<{ data?: Types.ShopsListQuery; error?: Apollo.ApolloError }>
export const withPageShopsList =
  (optionsFunc?: (router: NextRouter) => QueryHookOptions<Types.ShopsListQuery, Types.ShopsListQueryVariables>) =>
  (WrappedComponent: PageShopsListComp): NextPage =>
  (props) => {
    const router = useRouter()
    const options = optionsFunc ? optionsFunc(router) : {}
    const { data, error } = useQuery(Operations.ShopsListDocument, options)
    return <WrappedComponent {...props} data={data} error={error} />
  }
export const ssrShopsList = {
  getServerPage: getServerPageShopsList,
  withPage: withPageShopsList,
  usePage: useShopsList,
}
