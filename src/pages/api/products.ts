import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ProductsCatalogDocument } from '../../generated/graphql'

const { API_URL } = process.env

const httpLink = createHttpLink({
  uri: API_URL,
})

const cache = new InMemoryCache().restore({})

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: httpLink,
  cache,
})

export default async (req, res) => {
  const { before, after, filters } = req.query
  const { shops, colors, materials, categories, size } = filters
  

  const { data, error } = await client.query({
    query: ProductsCatalogDocument,
    variables: {
       filter: {
         materials,
         shop: shops,
         colorGroups: colors,
         categoriesNames: categories,
         sizes: size,
      },
      pagination: {
        includeTotalCount: true,
        limit: 10,
        before,
        after,
      },
    },
  })

  res.statusCode = (error && 500) || 200
  return res.json({ data, error })
}
