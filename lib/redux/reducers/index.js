import { combineReducers } from 'redux'
import functionalReducer from './functionalReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
  env: envReducer,
  location: locationReducer
})

export default rootReducer
