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
