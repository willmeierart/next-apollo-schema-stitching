import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Router from 'next/router'
import withData from '../../lib/withData'
import { allLocations } from '../../lib/queries'
import {
  getUserLocation,
  setMapZoom,
  setMapMarkers,
  setMapCenter,
  setActiveLocation,
  setLocPageState,
  setActiveResultsList
} from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

export default function LocationsDataManager (ComposedComponent) {
  class WrappedComponent extends Component {
    constructor (props) {
      super(props)
      binder(this, ['pageStateMegaFunc', 'setPageStateViaUrl', 'setPageStateGeoLoc', 'setTemplate'])
    }
    componentDidMount () {
      console.log(this.props)
      this.pageStateMegaFunc()
    }

    componentDidUpdate (prevProps) {
      if (
        (this.props.userLocation !== prevProps.userLocation &&
        typeof this.props.userLocation === 'object') ||
        this.props.activeLocation !== prevProps.activeLocation
      ) {
        this.pageStateMegaFunc() // only fire if on base route
      }
    }

    componentWillUnmount () {
      Router.onRouteChangeComplete = url => { this.props.onSetActiveLocation(null) }
    }

    pageStateMegaFunc () {
      // collate all logic into single func
      this.setPageStateGeoLoc()
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

    render () {
      return <ComposedComponent {...this.props} setTemplate={this.setTemplate} />
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(
    withData(
      compose(
        graphql(allLocations, { name: 'allLocations' })
      )(WrappedComponent)
    )
  )
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
