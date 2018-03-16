import gql from 'graphql-tag'

export const allSamples = gql`
  query allSamples {
    allSamples {
      sample
    }
  }
`

export const locationIDs = gql`
  query locationIDs {
    allLocations {
      id
      address

    }
  }
`

