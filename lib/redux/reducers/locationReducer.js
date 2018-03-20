import {
  GET_USER_LOCATION,
  SET_MAP_ZOOM,
  SET_MAP_MARKERS,
  SET_MAP_CENTER,
  SET_ACTIVE_LOCATION
} from '../actions/types'

const initialState = {
  userLocation: null,
  mapMarkers: [],
  mapZoom: 8,
  mapCenter: 'denver',
  activeLocation: null
}

export default function locationReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }
  switch (action.type) {
    case GET_USER_LOCATION:
      return defaultAction('userLocation')
    case SET_MAP_CENTER:
      return defaultAction('mapCenter')
    case SET_MAP_ZOOM:
      return defaultAction('mapZoom')
    case SET_MAP_MARKERS: {
      const newMapMarkers = [ ...state.mapMarkers ]
      const newState = { ...state }
      newMapMarkers.concat(action.payload)
      newState.mapMarkers = newMapMarkers
      return newState
    }
    case SET_ACTIVE_LOCATION:
      return defaultAction('activeLocation')
    default:
      return state
  }
}
