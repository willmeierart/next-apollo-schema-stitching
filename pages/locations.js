import React, { Component } from 'react'
import App from '../components/App'
import TemplateSwitcher from '../components/_locations/TemplateSwitcher'
import GoogleMap from '../components/_locations/GoogleMap'
import SearchBar from '../components/_locations/SearchBar'

class Locations extends Component {
  constructor (props) {
    super(props)
    this.state = {
      template: 'initial'
    }
  }
  render () {
    return (
      <App title='Location'>
        <h1>Location</h1>
        <TemplateSwitcher template={this.state.template} />
        <GoogleMap />
        <SearchBar />
        <style jsx>{``}</style>
      </App>
    )
  }
}

export default Locations
