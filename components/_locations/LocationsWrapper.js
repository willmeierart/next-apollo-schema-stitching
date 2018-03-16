import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserLocation, setMapZoom, setMapMarkers, setMapCenter } from '../../lib/redux/actions'
import TemplateSwitcher from './TemplateSwitcher'
import GoogleMap from './GoogleMap'
import SearchBar from './SearchBar'
import { binder } from '../../lib/_utils'

class LocationsWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = { template: 'initial' } // [initial, results, detail]
    binder(this, ['setTemplate', 'setCenter', 'setMarkers'])
  }
  componentDidMount () {
    this.props.onGetUserLocation()
  }

  setTemplate (template) {
    if (template === 'initial' || template === 'results' || template === 'detail') {
      this.setState({ template })
    }
  }

  setCenter (center) { 
    this.setState({ center })
    this.props.onsetMapCenter(center)
  }
  setMarkers (markers) {
    console.log(markers);
    this.setState({ markers })
    this.props.onsetMapMarkers(markers)
  }

  render () {
    const { mapCenter, mapZoom, mapMarkers } = this.props
    const { template } = this.state
    const getMapDims = template => {
      const large = { width: '96vw', height: '40vw' }
      const small =  { width: '40vw', height: '40vw' }
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
        <TemplateSwitcher template={template}>
          <h1>Location</h1>
          <SearchBar setCenter={this.setCenter} setMarkers={this.setMarkers} />
          <GoogleMap center={mapCenter} zoom={mapZoom} markers={mapMarkers} dims={getMapDims(template)} />
        </TemplateSwitcher>
        <style jsx>{``}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { location: { userLocation, mapCenter, mapZoom, mapMarkers } } = state
  return {
    userLocation,
    mapCenter,
    mapZoom,
    mapMarkers
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUserLocation: () => dispatch(getUserLocation()),
    onsetMapCenter: center => dispatch(setMapCenter(center)),
    onsetMapZoom: zoom => dispatch(setMapZoom(zoom)),
    onsetMapMarkers: markers => dispatch(setMapMarkers(markers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsWrapper)
