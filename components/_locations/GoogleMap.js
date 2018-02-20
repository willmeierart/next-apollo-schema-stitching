import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { binder } from '../../lib/_utils'

export default class GoogleMap extends Component {
  constructor (props) {
    super(props)
    this.allMarkers = []
    this.state = {
      center: null,
      markers: this.props.markers || [],
      zoom: this.props.zoom || 8
    }
    binder(this, ['setCenter', 'setMarker', 'setMarkers'])
  //   this.setCenter = this.setCenter.bind(this)
  //   this.setMarker = this.setMarker.bind(this)
  //   this.setMarkers = this.setMarkers.bind(this)
  }

  componentWillMount () { this.setCenter() }

  componentDidMount () {
    const mapNode = ReactDOM.findDOMNode(this.mapDOM)
    this.map = new window.google.maps.Map(mapNode), {
      zoom: this.state.zoom,
      center: this.state.center
    }
    if (this.props.onIdle)
      window.google.maps.event.addListener(this.map, 'idle', () => 
        this.props.onIdle(this.map, this.allMarkers)
      )
    this.setMarkers()
    // console.log(this.map.setZoom(), this.map.getZoom(), this.map.panTo());
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({
        markers: this.props.markers || [],
        zoom: this.props.zoom || 8,
        center: this.props.center
      })
    }
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      if (this.map.getZoom() !== this.state.zoom){
        this.map.setZoom(this.state.zoom)
      }
      if (JSON.stringify(prevState.center) !== JSON.stringify(this.state.center)){
        this.map.panTo(this.state.center)
      }
      if (JSON.stringify(this.state.markers) !== JSON.stringify(prevState.markers)){
        this.setMarkers()
      }
    }
  }

  setCenter () {
    if (this.props.center) {
      if (typeof this.props.center === 'string') {
        this.getCoordsFromAddress(this.props.center)
          .then(coords => {
            this.setState({ center: coords })
          })
      } else {
        this.setState({ center: this.props.center })
      }
    } else {
      this.setState({ center: {lat: 39.740287, lng: -104.971806} })
    }
  }

  setMarkers () {
    this.state.markers.forEach((marker, i) => {
      if (typeof marker.position === 'string') {
        this.getCoordsFromAddress(marker.position)
          .then(coords => {
            marker.position = coords
            this.setMarker(marker)
          })
      } else if (typeof marker.position === 'object') {
        this.setMarker(marker)
      }
    })
  }

  setMarker (marker) {
    const m = new window.google.maps.Marker({
      position: marker.position,
      animation: marker.animation === 'drop'
        ? window.google.maps.Animation.DROP
        : marker.animation === 'bounce'
          ? window.google.maps.Animation.BOUNCE : null,
      title: marker.title,
      label: marker.label,
      map: this.map,
      icon: marker.icon
    })
    window.google.maps.event.addListener(m, 'click', marker.onClick) // this is an important action
    this.allMarkers.push(m) // needs to somehow clear here
  }

  getCoordsFromAddress (adr) {
    const API_KEY = 'AIzaSyDx1N1vkCcwJt-BFELA_OyOMCBg9WAHlJs'
    return axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=${API_KEY}`)
      .then(res => {
        console.log(res.data.results[0].geometry.location);
        return res.data.results[0].geometry.location
      })
      .catch(err => console.error(err))
  }

  render () {
    return (
      <div className='map-container'>
        <div id='map' style={{ width: '100%', height: '100%' }} ref={map => { this.mapDOM = map }}></div>
      </div>
    )
  }
}
