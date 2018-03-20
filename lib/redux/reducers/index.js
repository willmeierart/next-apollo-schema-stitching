import { combineReducers } from 'redux'
import envReducer from './envReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
  env: envReducer,
  location: locationReducer
})

export default rootReducer
