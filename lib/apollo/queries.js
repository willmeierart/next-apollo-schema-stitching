import gql from 'graphql-tag'

// HOMEPAGE / GENERAL:
export const allPosts = gql`
  query {
    allPosts {
      authors {
        name
        bibliography
      }
      title
      content
    }
  }
`
