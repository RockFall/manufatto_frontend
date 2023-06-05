import React from 'react'
import { NextPage } from 'next'
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const { API_URL } = process.env

export const withApollo = (Comp: NextPage) => (props: any) => {
  const client = getApolloClient(null, props.apolloState)

  if (!client) return <Comp />
  return (
    <ApolloProvider client={client}>
      <Comp />
    </ApolloProvider>
  )
}

export const getApolloClient = (_ctx?: any, initialState?: NormalizedCacheObject) => {
  const httpLink = createHttpLink({
    uri: 'https://manufatto-test.myshopify.com/admin/api/2023-04/graphql.json',
    headers: {
      'X-Shopify-Access-Token':
        process.env.SHOPIFY_API_ACCESS_TOKEN,
      'Accept' : 'application/graphql'
    },
    fetch,
  })
  const cache = new InMemoryCache().restore(initialState || {})
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache,
  })
}
