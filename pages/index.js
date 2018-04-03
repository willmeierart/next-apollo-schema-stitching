import React from 'react'
import { graphql } from 'react-apollo'
import withData from '../lib/withData'
import { allPosts } from '../lib/queries'

const HomePage = props => {
  console.log('\x1b[36m%s\x1b[0m', 'INDEX.PROPS.DATA', props.data)
  return (
    <div>o</div>
  )
}

export default withData(
    graphql(allPosts)(HomePage)
)

// export default HomePage
