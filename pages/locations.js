import AppProvider from '../lib/redux/AppProvider'
import LocationsWrapper from '../components/_locations/LocationsWrapper'
import { binder } from '../lib/_utils'

const Locations = () => (
  <AppProvider title='Location'>
    <LocationsWrapper />
  </AppProvider>
)
export default Locations
