import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
// import fetch from 'node-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { RetryLink } from 'apollo-link-retry'
// import { HttpLink } from 'apollo-link-http'
import { SchemaLink } from 'apollo-link-schema'
import schemaMerger from './schemaMerger'
// import schemaWeaver from './schemaWeaver'

let apolloClient = null

function createClient (initialState) {
  // const PrimaryLink = new HttpLink({
  //   uri: 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
  //   fetch
  // })

  // return schemaMerger.then(schema => {

  const asyncSchemaLink = schemaMerger.then(schema => new SchemaLink({ schema }))

  const SCHEMA_LINK = new SchemaLink({ schemaMerger })
  // const RETRY_LINK = new RetryLink()

  console.log('\x1b[34m%s\x1b[0m', 'INITAPOLLO.MERGEDSCHEMA', schemaMerger)

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    // link: SCHEMA_LINK,
    // link: PrimaryLink,
    link: SCHEMA_LINK,
    cache: new InMemoryCache().restore(initialState || {})
  })
  // })
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
