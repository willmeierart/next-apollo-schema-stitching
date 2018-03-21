import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { getUserLocation, setMapZoom, setMapMarkers, setMapCenter, setActiveLocation } from '../../lib/redux/actions'
import TemplateSwitcher from './TemplateSwitcher'
import GoogleMap from './GoogleMap'
import SearchBar from './SearchBar'
import { binder } from '../../lib/_utils'

class LocationsWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { template: 'initial' } // [initial, results, detail]
    binder(this, ['setTemplate', 'setCenter', 'setMarkers', 'setPageState'])
  }

  componentDidMount () {
    this.setPageState()
    console.log(this.props.url);
  }

  componentWillUnmount () {
    Router.onRouteChangeComplete = url => { this.props.onSetActiveLocation(null) }
  }

  setPageState () {
    if (this.props.userLocation !== null || this.props.userLocation !== 'denied') {
      if (this.props.activeLocation) {
        this.setState({ template: 'detail' })
      } else {
        this.setState({ template: 'results' })
      }
    }
    console.log(this.state.template)
  }

  componentDidUpdate (prevProps) {
    if (
      (this.props.userLocation !== prevProps.userLocation &&
      typeof this.props.userLocation === 'object') ||
      this.props.activeLocation !== prevProps.activeLocation
    ) {
      this.setPageState()
    }
  }

  setTemplate (template) {
    if (template === 'initial' || template === 'results' || template === 'detail') {
      this.setState({ template })
    } else {
      if (this.state.template === 'initial') {
        this.setState({ template: 'detail' })
      } else {
        this.setState({ template: 'results' })
      }
      console.warn('not a valid template state... \n ...attempting default switch')
    }
  }

  setCenter (center) { 
    this.setState({ center })
    this.props.onSetMapCenter(center)
  }
  setMarkers (markers) {
    console.log(markers);
    this.setState({ markers })
    this.props.onSetMapMarkers(markers)
  }

  render () {
    const { mapCenter, mapZoom, mapMarkers, onGetUserLocation, userLocation, onSetActiveLocation, activeLocation } = this.props
    const { template } = this.state
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
        <TemplateSwitcher template={template} 
          onGetUserLocation={onGetUserLocation} 
          onSetActiveLocation={onSetActiveLocation} 
          userLocation={userLocation}
          activeLocation={activeLocation} >
          <h1>LOCATIONS</h1>
          <SearchBar setCenter={this.setCenter} setMarkers={this.setMarkers} setTemplate={this.setTemplate} />
          <GoogleMap center={mapCenter} zoom={mapZoom} markers={mapMarkers} dims={getMapDims(template)} setTemplate={this.setTemplate} />
        </TemplateSwitcher>
        <style jsx>{``}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { location: { userLocation, mapCenter, mapZoom, mapMarkers, activeLocation } } = state
  return {
    userLocation,
    mapCenter,
    mapZoom,
    mapMarkers,
    activeLocation
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUserLocation: path => dispatch(getUserLocation(path)),
    onSetMapCenter: center => dispatch(setMapCenter(center)),
    onSetMapZoom: zoom => dispatch(setMapZoom(zoom)),
    onSetMapMarkers: markers => dispatch(setMapMarkers(markers)),
    onSetActiveLocation: location => dispatch(setActiveLocation(location))    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsWrapper)
