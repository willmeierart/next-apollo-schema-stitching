import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import HomeWrapper from '../components/_home-global/HomeWrapper'
import withData from '../lib/withData'

class HomePage extends Component {
  render () {
    return (
      <AppProvider title='Home'>
        <div>
          <HomeWrapper />
        </div>
        <style jsx>{`
        `}</style>
      </AppProvider>
    )
  }
}

export default withData(HomePage)
