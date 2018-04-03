import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema
} from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { Observable } from 'apollo-link'
import { graphql, print } from 'graphql'
// import { createApolloFetch } from 'apollo-fetch'

if (!process.browser) {
  global.fetch = fetch
}

async function makeMergedSchema (endpoints) {
  const PRIMARY_API = 'https://api.graphcms.com/simple/v1/cjfipt3m23x9i0190pgetwf8c'
  const SECONDARY_API = 'https://api.graphcms.com/simple/v1/cjfipwwve7vl901427mf2vkog'

  const ALL_ENDPOINTS = [PRIMARY_API, SECONDARY_API]
  const ALL_LINKS = ALL_ENDPOINTS.map(endpoint => {
    return new HttpLink({
      uri: endpoint,
      fetch
    })
    // return createApolloFetch({ uri: endpoint })
  })

  const allSchemas = []

  for (let link of ALL_LINKS) {
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

  const mergedSchema = mergeSchemas({
    schemas: allSchemas
  })

  // const mergedLink = operation => {
  //   return new Observable(observer => {
  //     const { query, variables, operationName } = operation
  //     graphql(mergedSchema, print(query), {}, {}, variables, operationName)
  //       .then(result => {
  //         observer.next(result)
  //         observer.complete(result)
  //       })
  //       .catch(e => observer.error(e))
  //   })
  // }

  // console.log('\x1b[36m%s\x1b[0m', 'MERGEDLINK', mergedSchema)

  return mergedSchema
}

const schemaMerger = makeMergedSchema
export default schemaMerger
