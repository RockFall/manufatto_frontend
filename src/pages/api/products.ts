import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ProductsCatalogDocument } from '../../generated/graphql'


const { ADMIN_API_URL } = process.env

const httpLink = createHttpLink({
  uri: ADMIN_API_URL,
  headers: {
    'X-Shopify-Access-Token':
      process.env.SHOPIFY_API_ACCESS_TOKEN,
    'Accept' : 'application/graphql'
  },
  fetch,
})

const cache = new InMemoryCache().restore({})

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: httpLink,
  cache,
})

export default async (req, res) => {
  const { cursor, filters } = req.query

  console.log('queryString', filters)

  const { data, error } = await client.query({
    query: ProductsCatalogDocument,
    variables: {
       filter: filters,
      cursor: cursor,
    },
  })

  res.statusCode = (error && 500) || 200
  return res.json({ data, error })
}
