import gql from 'graphql-tag'

// HOMEPAGE / GENERAL:
export const HomePage = gql`
  query homePage {
    allHomepages(first: 1) {
      headerImage {
        url
      }
      aboutBlurb
      specials {
        description
      }
      testimonials {
        name
        blurb
      }
      fastPassInfo {
        description
        calloutImage {
          url
        }
      }
    }
  }
`
export const brandInfo = gql`
  query brandInfo {
    allBrandInfoes(first: 1) {
      brandName
      companyLogo {
        url
      }
      domainName
      contactInfo {
        phone
        email
        address
      }
      giftCardPrices
    }
  }
`
export const brandInfoMinimal = gql`
  query brandInfoMinimal {
    allBrandInfoes(first: 1) {
      brandName
      companyLogo {
        url
      }
      domainName
    }
  }
`
export const otherSites = gql`
  query otherSites {
    allOtherSites {
      graphCMSEndpoint
    }
  }
`

// LOCATION PAGE:
// initial query (all endpoints):
// export const allLocations = gql`
//   query allLocations {
//     allLocations {
//       id
//       coordinates
//       sEOLocationCategories {
//         filterType
//         name
//       }
//     }
//   }
// `
// second query (all relevant endpoints) -- NEEDS TO ACCEPT SPECIFIC ID TO QUERY BY
// export const allLocationDetails = gql`
//   query allLocationDetails($id: [ID!]) {
//     allLocations(filter: { id_in: $id }) {
//       addressStreet
//       addressCity
//       addressState
//       addressZip
//       coordinates
//       images {
//         url
//       }
//       description
//       phone
//       specials {
//         description
//       }
//       washes {
//         washType
//         priceSingle
//         priceMultiple
//         washFeatures {
//           name
//           description
//           icon {
//             url
//           }
//         }
//       }
//       sEOLocationCategories {
//         filterType
//         name
//       }
//       giftCards
//       onlineOrderingAvailable
//       fastPass
//     }
//   }
// `
export const allLocations = gql`
  query allLocations {
    allLocations {
      addressStreet
      addressCity
      addressState
      addressZip
      coordinates
      images {
        url
      }
      description
      phone
      specials {
        description
      }
      washes {
        washType
        priceSingle
        priceMultiple
        washFeatures {
          name
          description
          icon {
            url
          }
        }
      }
      sEOLocationCategories {
        filterType
        name
      }
      giftCards
      onlineOrderingAvailable
      fastPass
    }
  }
`

// ABOUT PAGE
export const aboutPage = gql`
  query aboutPage {
    allAboutPages(first: 1) {
      company
      fAQs {
        question
        answer
      }
      blogPosts {
        date
        title
        image {
          url
        }
        body
      }
      testimonials {
        name
        blurb
      }
      feedback
      fundraising
      mailingList
      generalInquiries
      careers
    }
  }
`
