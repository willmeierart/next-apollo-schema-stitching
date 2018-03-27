import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import AboutWrapper from '../components/_about/AboutWrapper'
import withData from '../lib/withData'

class About extends Component {
  render () {
    return (
      <AppProvider title='About'>
        <AboutWrapper url={this.props.url} />
        <style jsx>{``}</style>
      </AppProvider>
    )
  }
}

export default withData(About)
