import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
// import fetch from 'node-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RetryLink } from 'apollo-link-retry'
// import { HttpLink } from 'apollo-link-http'
import { SchemaLink } from 'apollo-link-schema'
import schemaMerger from './schemaMerger'

let apolloClient = null

// if (!process.browser) {
//   global.fetch = fetch
// }

function createClient (initialState) {
  // const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
  // const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

  // const PrimaryLink = new HttpLink({
  //   uri: PRIMARY_API,
  //   fetch
  // })

  // const ALL_ENDPOINTS = [PRIMARY_API, SECONDARY_API]
  // const AllLinks = ALL_ENDPOINTS.map(endpoint => {
  //   return new HttpLink({
  //     uri: endpoint,
  //     fetch
  //   })
  // })
  return schemaMerger().then(schema => {
    // const SCHEMA_LINK = new SchemaLink({ schemaMerger })
    const SCHEMA_LINK = new SchemaLink({ schema })
    const RETRY_LINK = new RetryLink()

    console.log('\x1b[34m%s\x1b[0m', 'INITAPOLLO.MERGEDSCHEMA', schema)

    return new ApolloClient({
      connectToDevTools: process.browser,
      ssrMode: !process.browser,
      // link: schemaMerger,
      link: ApolloLink.from([RETRY_LINK, SCHEMA_LINK]),
      cache: new InMemoryCache().restore(initialState || {})
      // link: PrimaryLink,
      // cache: new InMemoryCache().restore(initialState || {})
    })
  })
}

export default function initApollo (initialState) {
  if (!process.browser) {
    return createClient(initialState)
  }
  if (!apolloClient) {
    apolloClient = createClient(initialState)
  }
  // console.log('\x1b[37m%s\x1b[0m', 'INITAPOLLO.APOLLOCLIENT', apolloClient)
  return apolloClient
}
