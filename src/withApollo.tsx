import React from 'react'
import { NextPage } from 'next'
import { ApolloClient, NormalizedCacheObject, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const { ADMIN_API_URL, STOREFRONT_API_URL, SHOPIFY_API_ACCESS_TOKEN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env

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
  const isServerSide = typeof window === 'undefined';
  
  isServerSide ? console.log("On Server side") : console.log("On Client side")

  const httpLink = createHttpLink({
    uri: isServerSide? ADMIN_API_URL : STOREFRONT_API_URL,
    headers: isServerSide
    ? {
      'X-Shopify-Access-Token':
      SHOPIFY_API_ACCESS_TOKEN,
      'Accept' : 'application/graphql'
    }
    : {
      'X-Shopify-Storefront-Access-Token':
      SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Accept' : 'application/graphql'
    },
    fetch,
  })
  const cache = new InMemoryCache().restore(initialState || {})
  return new ApolloClient({
    ssrMode: isServerSide,
    link: httpLink,
    cache,
  })
}
