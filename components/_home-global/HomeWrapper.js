import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserLocation } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

class HomeWrapper extends Component {
  constructor (props) {
    super(props)
    binder(this, [])
  }

  componentDidMount () {
    const { userLocation, onGetUserLocation } = this.props
    if (userLocation !== 'denied') {
      onGetUserLocation(window.location.pathname)
    }
  }

  render () {
    return (
      <div>
        <h1>HOME</h1>
        <style jsx>{``}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { location: { userLocation } } = state
  return {
    userLocation
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onGetUserLocation: path => dispatch(getUserLocation(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper)
