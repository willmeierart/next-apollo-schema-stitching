import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withData from '../lib/withData'
import { allPosts } from '../lib/queries'

class HomePage extends Component {
  static async getInitialProps () {
    console.log(this.props)
  }
  render () {
    console.log('\x1b[36m%s\x1b[0m', 'INDEX.PROPS.DATA', this.props.data)
    return (
      <div>o</div>
    )
  }
}

export default withData(
  graphql(allPosts)(HomePage)
)

// export default HomePage
