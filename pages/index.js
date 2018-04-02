import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import App from '../components/App'
import withData from '../lib/apollo/withData'
import { allPosts } from '../lib/apollo/queries'

class HomePage extends Component {
  render () {
    console.log(this.props)    
    return (
      <App url={this.props.url} title='Home'>
        <div>

        </div>
        <style jsx>{`
        `}</style>
      </App>
    )
  }
}

export default withData(
  compose(
    graphql(allPosts, { name: 'allPosts' })
  )(HomePage)
)

// export default HomePage
