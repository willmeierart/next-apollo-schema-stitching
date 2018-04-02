import React from 'react'
// import { graphql, compose } from 'react-apollo'
import App from '../components/App'
// import withData from '../lib/apollo/withData'
// import { allPosts } from '../lib/apollo/queries'

const HomePage = ({ url, children }) => (
  <App url={url}>
    <div>{children}</div>
  </App>
)

// export default withData(
//   compose(
//     graphql(allPosts, { name: 'allPosts' })
//   )(HomePage)
// )

export default HomePage
