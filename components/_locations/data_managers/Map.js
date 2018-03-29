import React, { Component } from 'react'
// import NextRouter from 'next/router'
// import { geocodeByAddress, getLatLng } from '../_locationUtils'
import { binder } from '../../../lib/_utils'

export default function MapManager (ComposedComponent) {
  class WrappedComponent extends Component {
    // constructor (props) {
    //   super(props)
    // }
    componentDidMount () {}
    render () {
      const InitialMapStyles = [
        {
          'stylers': [
            { 'color': '#ffffff' }
          ]
        },
        {
        //   'featureType': 'water',
        //   'elementType': 'geometry',
        //   'stylers': [
        //     { 'visibility': 'off' }
        //   ]
        // }, {
        //   'featureType': 'landscape',
        //   'stylers': [
        //     { 'visibility': 'off' }
        //   ]
        // }, {
          'featureType': 'road',
          'stylers': [
            { 'visibility': 'off' }
          ]
        }, {
          'featureType': 'poi',
          'stylers': [
            { 'visibility': 'off' }
          ]
        }, {
          'featureType': 'administrative',
          'stylers': [
            { 'visibility': 'off' }
          ]
        }, {
          'elementType': 'labels',
          'stylers': [
            { 'visibility': 'off' }
          ]
        }
      ]
      return (
        <ComposedComponent InitialMapStyles={InitialMapStyles} {...this.props} />
      )
    }
  }
  return WrappedComponent
}
