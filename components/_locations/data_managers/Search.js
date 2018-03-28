import React, { Component } from 'react'
import ImperativeRouter from '../../../server/ImperativeRouter'
import { geocodeByAddress, getLatLng } from '../_locationUtils'
import { binder } from '../../../lib/_utils'

export default function SearchManager (ComposedComponent) {
  class WrappedComponent extends Component {
    constructor (props) {
      super(props)
      this.state = { nearbyResults: [] }
      binder(this, ['handleSelection', 'findResultsInRadius', 'makeMarker', 'getRelevantCoords', 'distanceServiceCallback'])
      const mile = 1610
      this.radius = 5 * mile
    }

    componentDidMount () {
      const init = () => {
        if (typeof window !== 'undefined' || !window.google.maps.places) {
          if (!window.google) {
            console.log('no google')
            setTimeout(init, 500)
          } else {
            this.distanceService = new window.google.maps.DistanceMatrixService()
            this.autocompleteService = new window.google.maps.places.AutocompleteService()
            this.autocompleteOK = window.google.maps.places.PlacesServiceStatus.OK
          }
        } else {
          setTimeout(init, 500)
        }
      }
      init()
      console.log(this.props)
    }

    makeMarker (latLng, place) {
      return latLng && place ? {
        position: latLng,
        title: place.formatted_address || place.name,
        animation: 'drop',
        onClick: () => { console.log('clicked') }
      } : {}
    }

    findResultsInRadius (place, locations) {
      const isRegion = types => types.reduce((bool, type) => {
        if ((type === 'locality' ||
          type === 'administrative_area_level_1') &&
          type === 'political') {
          bool = true
        }
        return bool
      }, false)
      console.log(isRegion(place.types))

      // const isInRadius = locationCoords => {
      //   const coordSet = this.getRelevantCoords(place, locationCoords)
      //   // const distanceCheckedCoords = coordSet.reduce((bool, coords) => {
      //   this.distanceService.getDistanceMatrix({
      //     origins: locationCoords,
      //     destinations: coordSet,
      //     // unitSystem: window.google.maps.UnitSystem.IMPERIAL,
      //     travelMode: window.google.maps.TravelMode.DRIVING
      //   }, this.distanceServiceCallback)
      //   // }, false)
      // }

      const locationCoords = locations.map(location => location.coords)
      console.log(locationCoords)

      const nearbyLocations = this.getRelevantCoords(place, locationCoords)
      console.log(nearbyLocations)
    }

    doDistanceService (coords1, coords2) {
      this.distanceService.getDistanceMatrix({
        origins: coords1,
        destinations: coords2,
        // unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        travelMode: window.google.maps.TravelMode.DRIVING
      }, this.distanceServiceCallback)
    }

    distanceServiceCallback (response, status) {

      if (status === 'OK') {
        console.log(response)
        const origins = response.originAddresses
        // const destinations = response.destinationAddresses
        origins.forEach((origin, i) => {
          console.log(origin)
          const results = response.rows[i].elements
          results.forEach((result, j) => {
            console.log(result)
            const distanceVal = result.distance.value
            if (distanceVal <= this.radius) {
              const location = this.props.activeResults[j]
              const newResults = [...this.state.nearbyResults]
              console.log(newResults, location)
              if (newResults.indexOf(location) === -1) {
                const makeMarkers = true
                this.geocode(origin, makeMarkers)

                newResults.push(location)
              }         
              this.setState({ nearbyResults: newResults })
            }
            console.log(this.state.nearbyResults)
          })
        })
      }
    }

    getRelevantCoords (place, locationCoords) {
      if (place.geometry.bounds) {
        const { b, f } = place.geometry.bounds
        return [
          { lat: f.b, lng: b.b },
          { lat: f.f, lng: b.f }
        ]
      } else {
        const asyncLatLng = async () => {
          let LAT_LNG = []
          await getLatLng(place).then(latLng => {
            console.log(latLng)
            LAT_LNG = [latLng]
          })
          this.doDistanceService(LAT_LNG, locationCoords)
          // return LAT_LNG
        }
        return asyncLatLng()
      }
    }

    handleSelection (address, placeId, handleInput) {
      // called right above ^
      this.props.onSelect
        ? this.props.onSelect(address, placeId) // this doesn't exist, as far as I know...
        : handleInput(address)

      this.geocode(address)
    }

    geocode (address, makeMarkers) {
      geocodeByAddress(address).then(res => {
        // console.log(res)
        if (res.length > 0 && typeof res !== 'string') {
          const markers = []
          res.forEach(place =>
            getLatLng(place).then(latLng => {
              console.log('USE BOUNDS OF PLACE FOR MILEAGE COMPARISION && PLACE.TYPES === "LOCALITY / POLITICAL ?" FOR DETECTING STATE?', place)
              console.log(place.types)

              const marker = this.makeMarker(latLng, place)
              markers.push(marker)

              this.props.setCenter(latLng)
            }).then(() => {
              if (makeMarkers) {
                this.props.setMarkers(markers)
              }

              this.findResultsInRadius(place, this.props.activeResults)

              this.routeToResults(place)
            }).then(() => {
              console.log(this.props.url)
            })
          )
        } else {
          this.props.setMarkers([])
        }
      }).catch(err => { console.log(err) })
    }

    routeToResults (place) {
      const spec = place.formatted_address
        .toLowerCase()
        .replace(/(,)/g, '')
        .replace(/( )/g, '-')
      const query = { state: 'results', spec }

      ImperativeRouter.push('locations', query, false)
    }

    render () {
      return (
        <ComposedComponent {...this.props}
          handleSelection={this.handleSelection}
          autocompleteService={this.autocompleteService}
          autocompleteOK={this.autocompleteOK}
          distanceService={this.distanceService}
        />
      )
    }
  }
  return WrappedComponent
}
