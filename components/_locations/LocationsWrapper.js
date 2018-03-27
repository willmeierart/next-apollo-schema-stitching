import React, { Component } from 'react'
import TemplateSwitcher from './TemplateSwitcher'
import GoogleMap from './GoogleMap'
import SearchBar from './SearchBar'
import LocationsDataManager from './LocationsDataManager'
import { binder } from '../../lib/_utils'

import locData from '../../lib/_data/locData'

class LocationsWrapper extends Component {
  constructor (props) {
    super(props)
    binder(this, ['setCenter', 'setMarkers', 'setActiveResults'])
    this.fakeData = true
  }
  componentDidMount () { this.setActiveResults() }

  shouldComponentUpdate (newProps) {
    if (this.props !== newProps) {
      console.log(this.props)
      return true
    }
  }

  setCenter (center) { this.props.onSetMapCenter(center) }
  setMarkers (markers) { this.props.onSetMapMarkers(markers) } // leave in case middleware logic needed

  setActiveResults (results) {
    const { onSetActiveResultsList } = this.props
    if (this.fakeData) {
      onSetActiveResultsList(locData)
    } else if (results) {
      onSetActiveResultsList(results)
    } else {
      onSetActiveResultsList([])
    }
  }

  render () {
    const { mapCenter, mapZoom, mapMarkers, onGetUserLocation, userLocation, onSetActiveLocation, activeResults, activeLocation, pageState } = this.props
    const getMapDims = template => {
      const large = { width: '96vw', height: '40vw' }
      const small = { width: '40vw', height: '40vw' }
      switch (template) {
        case 'initial' :
          return large
        case ('results' || 'detail') :
          return small
        default:
          return small
      }
    }
    return (
      <div>
        <TemplateSwitcher template={pageState}
          onGetUserLocation={onGetUserLocation}
          onSetActiveLocation={onSetActiveLocation}
          setActiveResults={this.setActiveResults}
          activeResults={activeResults}
          userLocation={userLocation}
          activeLocation={activeLocation} >
          <h1>LOCATIONS</h1>
          <SearchBar setCenter={this.setCenter} setMarkers={this.setMarkers} setTemplate={this.props.setTemplate} />
          <GoogleMap center={mapCenter} zoom={mapZoom} markers={mapMarkers} dims={getMapDims(pageState)} setTemplate={this.props.setTemplate} />
        </TemplateSwitcher>
        <style jsx>{``}</style>
      </div>
    )
  }
}

export default LocationsDataManager(LocationsWrapper)

