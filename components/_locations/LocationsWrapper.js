import React, { Component } from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { getUserLocation, setMapZoom, setMapMarkers, setMapCenter, setActiveLocation, setLocPageState, setActiveResultsList } from '../../lib/redux/actions'
import TemplateSwitcher from './TemplateSwitcher'
import GoogleMap from './GoogleMap'
import SearchBar from './SearchBar'
import { binder } from '../../lib/_utils'
import locData from '../../lib/_data/locData'

class LocationsWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { template: 'initial', fakeData: 'true' } // [initial, results, region, detail]
    binder(this, ['setTemplate', 'setCenter', 'setMarkers', 'setPageStateGeoLoc', 'setPageStateViaUrl', 'setActiveResults', 'setPageStateMegaFunc'])
  }

  componentDidMount () {
    this.setPageStateGeoLoc()
    this.setActiveResults()
    console.log(this.props.url)
    // console.log(this.props)
  }

  componentWillUnmount () {
    Router.onRouteChangeComplete = url => { this.props.onSetActiveLocation(null) }
  }

  componentDidUpdate (prevProps) {
    if (
      (this.props.userLocation !== prevProps.userLocation &&
      typeof this.props.userLocation === 'object') ||
      this.props.activeLocation !== prevProps.activeLocation
    ) {
      this.setPageStateGeoLoc()
    }
  }

  setActiveResults (results) {
    const { onSetActiveResultsList } = this.props
    if (this.state.fakeData) {
      onSetActiveResultsList(locData)
    } else if (results) {
      onSetActiveResultsList(results)
    } else {
      onSetActiveResultsList([])
    }
  }

  setPageStateMegaFunc () {
    // 1. based on url
    // 2. based on geolocation
  }

  setPageStateViaUrl () {
    const { url } = this.props
    const { pathname, asPath, query } = url
    const { state, spec } = query

    this.setTemplate(state)

    if (state === 'detail') {
      // if (spec !== '') {
      this.props.onSetActiveLocation(spec)
      // } else {
      //   this.setTemplate('results')
      // }
    }
  }

  setPageStateGeoLoc () {
    const { userLocation, activeLocation, onSetLocPageState } = this.props
    if (userLocation !== null || userLocation !== 'denied') {
      if (activeLocation) {
        onSetLocPageState('detail') // this.setState({ template: 'detail' })
      } else {
        onSetLocPageState('results') // this.setState({ template: 'results' })
      }
    }
    // console.log(this.props.pageState)
  }

 

  setTemplate (template) {
    const { onSetLocPageState, pageState, url: { pathname } } = this.props
    if (template === 'initial' || template === 'results' || template === 'detail' || template === 'region') {
      onSetLocPageState(template) // this.setState({ template })
    } else {
      if (pathname.indexOf('region') !== -1) {
        onSetLocPageState('region') // this.setState({ template: 'region' })
      } else if (pathname.indexOf('detail') !== -1) {
        onSetLocPageState('detail')
      } else {
        if (pageState === 'initial') {
          onSetLocPageState('detail') // this.setState({ template: 'detail' })
        } else {
          console.warn('not a valid template state... \n ...attempting default switch')
          onSetLocPageState('results') // this.setState({ template: 'results' })
        }
      }
    }
    console.log(this.props.url)
  }

  setCenter (center) { 
    this.setState({ center })
    this.props.onSetMapCenter(center)
  }
  setMarkers (markers) {
    this.setState({ markers })
    this.props.onSetMapMarkers(markers)
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
          <SearchBar setCenter={this.setCenter} setMarkers={this.setMarkers} setTemplate={this.setTemplate} />
          <GoogleMap center={mapCenter} zoom={mapZoom} markers={mapMarkers} dims={getMapDims(pageState)} setTemplate={this.setTemplate} />
        </TemplateSwitcher>
        <style jsx>{``}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { location: { userLocation, mapCenter, mapZoom, mapMarkers, activeLocation, pageState, activeResults } } = state
  return {
    userLocation,
    mapCenter,
    mapZoom,
    mapMarkers,
    activeLocation,
    pageState,
    activeResults
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUserLocation: path => dispatch(getUserLocation(path)),
    onSetMapCenter: center => dispatch(setMapCenter(center)),
    onSetMapZoom: zoom => dispatch(setMapZoom(zoom)),
    onSetMapMarkers: markers => dispatch(setMapMarkers(markers)),
    onSetActiveLocation: location => dispatch(setActiveLocation(location)),
    onSetLocPageState: pageState => dispatch(setLocPageState(pageState)),
    onSetActiveResultsList: list => dispatch(setActiveResultsList(list))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsWrapper)
