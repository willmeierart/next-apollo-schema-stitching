import { ApolloClient } from 'apollo-client'
import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { Observable, ApolloLink } from 'apollo-link'
import { graphql, print } from 'graphql'
// import store from 'store'
// import localSchema from './localSchema'
import { createApolloFetch } from 'apollo-fetch'
// const schema = require('./schemas/index.gql')

let apolloClient = null
// store.set('queryLog', JSON.stringify([]))

if (!process.browser) {
  global.fetch = fetch
}

const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

const ALL_ENDPOINTS = [PRIMARY_API, SECONDARY_API]

async function createClient (initialState) {
  const AllLinks = ALL_ENDPOINTS.map(endpoint => {
    return new HttpLink({
      uri: endpoint,
      fetch
    })
    // return createApolloFetch({ uri: endpoint })
  })

  // const addToQueryLogLink = (operation, forward) => {
  //   const { operationName } = operation
  //   const { queryLog } = store
  //   const queryLogArray = JSON.parse(queryLog)
  //   queryLogArray.push({ name: operationName })
  //   store.queryLog = JSON.stringify(queryLogArray)
  //   return forward(operation).map(result => {
  //     console.table(store.queryLog)
  //     return result
  //   })
  // }

  const allSchemas = []

  for (let link of AllLinks) {
    // console.log(link)
    try {
      allSchemas.push(
        makeRemoteExecutableSchema({
          schema: await introspectSchema(link),
          link
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  // const createRemoteSchema = async uri => {
  //   const fetcher = createApolloFetch({ uri })
  //   const RES = makeRemoteExecutableSchema({
  //     schema: await introspectSchema(fetcher), fetcher
  //   })
  //   console.log(RES)
  //   return RES
  // }


  // for (let ep of ALL_ENDPOINTS) {
  //   try {
  //     const asyncSchema = await createRemoteSchema(ep)
  //     console.log(asyncSchema)
  //     allSchemas.push(asyncSchema)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const mergedSchema = mergeSchemas({
    schemas: allSchemas
    // onTypeConflict: (left, right) => right
  })

  console.log('\x1b[36m%s\x1b[0m', Object.keys(mergedSchema))

  const mergedLink = operation => {
    console.log('\x1b[35m%s\x1b[0m', Object.keys(operation))
    return new Observable(observer => {
      console.log('\x1b[35m%s\x1b[0m', Object.keys(observer))
      const { query, variables, operationName } = operation
      graphql(mergedSchema, print(query), {}, {}, variables, operationName)
        .then(result => {
          console.log('adoifjadoijfsd')
          console.log('\x1b[36m%s\x1b[0m', JSON.parse(result))
          observer.next(result)
          observer.complete(result)
        })
        .catch(e => observer.error(e))
    })
  }

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([mergedLink]),
    cache: new InMemoryCache().restore(initialState || {})
    // link: new HttpLink(PrimaryLink),
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
  console.log('\x1b[37m%s\x1b[0m', apolloClient)
  return apolloClient
}
