import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { Observable } from 'apollo-link'
import { graphql, print } from 'graphql'
// import store from 'store'
// import localSchema from './localSchema'
// import { createApolloFetch } from 'apollo-fetch'

if (!process.browser) {
  global.fetch = fetch
}

export default async function schemaMerger (endpoints) {
  const AllLinks = endpoints.map(endpoint => {
    return new HttpLink({
      uri: endpoint,
      fetch
    })
    // return createApolloFetch({ uri: endpoint })
  })

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

  // console.log(mergedSchema)

  const mergedLink = operation => {
    return new Observable(observer => {
      const { query, variables, operationName } = operation
      graphql(mergedSchema, print(query), {}, {}, variables, operationName)
        .then(result => {
          observer.next(result)
          observer.complete()
        })
        .catch(e => observer.error(e))
    })
  }

  return mergedLink
}
