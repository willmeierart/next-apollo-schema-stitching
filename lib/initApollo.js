import { ApolloClient } from 'apollo-client'
import fetch from 'node-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import schemaMerger from './schemaMerger'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

const ALL_ENDPOINTS = [PRIMARY_API, SECONDARY_API]

async function createClient (initialState) {
  const PrimaryLink = new HttpLink({
    uri: PRIMARY_API,
    fetch
  })

  const mergedLink = await schemaMerger(ALL_ENDPOINTS)

  console.log('\x1b[34m%s\x1b[0m', 'INITAPOLLO.MERGEDLINK', mergedLink())

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: mergedLink(),
    cache: new InMemoryCache().restore(initialState || {})
    // link: PrimaryLink,
    // cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  if (!process.browser) {
    return createClient(initialState)
  }
  if (!apolloClient) {
    apolloClient = createClient(initialState)
  }
  console.log('\x1b[37m%s\x1b[0m', 'INITAPOLLO.APOLLOCLIENT', apolloClient)
  return apolloClient
}
