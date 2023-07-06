import React from 'react'
import { NextPage } from 'next'
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const { API_URL, SHOPIFY_API_ACCESS_TOKEN } = process.env

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
    uri: API_URL,
    headers: {
      'X-Shopify-Access-Token':
      SHOPIFY_API_ACCESS_TOKEN,
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
