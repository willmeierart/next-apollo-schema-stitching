import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import AboutWrapper from '../components/_about/AboutWrapper'

export default class About extends Component {
  render () {
    return (
      <AppProvider title='About'>
        <AboutWrapper url={this.props.url} />
        <style jsx>{``}</style>
      </AppProvider>
    )
  }
}
