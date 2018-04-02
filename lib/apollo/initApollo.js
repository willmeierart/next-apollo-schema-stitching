import { ApolloClient } from 'apollo-client'
import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'
import { Observable, ApolloLink } from 'apollo-link'
import { graphql, print } from 'graphql'
import store from 'store'
import localSchema from './localSchema'

let apolloClient = null
store.set('queryLog', JSON.stringify([]))

if (!process.browser) {
  global.fetch = fetch
}

const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

const ALL_ENDPOINTS = [PRIMARY_API, SECONDARY_API]

async function createClient (initialState) {
  const PrimaryLink = {
    uri: PRIMARY_API,
    opts: {
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }
  }

  const AllLinks = ALL_ENDPOINTS.map(endpoint => {
    return new HttpLink({
      uri: endpoint,
      opts: { credentials: 'same-origin' }
    })
  })

  const addToQueryLogLink = (operation, forward) => {
    const { operationName } = operation
    const { queryLog } = store
    const queryLogArray = JSON.parse(queryLog)
    queryLogArray.push({ name: operationName })
    store.queryLog = JSON.stringify(queryLogArray)
    return forward(operation).map(result => {
      console.table(store.queryLog)
      return result
    })
  }

  const schema = await introspectSchema(PrimaryLink).then(res => res)
  console.log(schema)
  // const primarySchema = makeRemoteExecutableSchema({ schema, PrimaryLink })
  const allSchemas = AllLinks.map(link =>
    makeRemoteExecutableSchema(schema, link)
  )
  const mergedSchema = mergeSchemas({ schemas: [localSchema, ...allSchemas] })

  const mergedLink = operation => {
    return new Observable(observer => {
      const { query, variables, operationName } = operation
      graphql(mergedSchema, print(query), {}, {}, variables, operationName)
        .then(result => {
          observer.next(result)
          observer.complete(result)
        })
        .catch(e => observer.error(e))
    })
  }

  console.log(mergedLink)

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([addToQueryLogLink, mergedLink]),
    cache: new InMemoryCache()
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createClient(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createClient(initialState)
  }
  console.log(apolloClient)
  return apolloClient
}
