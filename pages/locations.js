import AppProvider from '../lib/redux/AppProvider'
import LocationsWrapper from '../components/_locations/LocationsWrapper'

const Locations = () => (
  <AppProvider title='Location'>
    <LocationsWrapper />
  </AppProvider>
)
export default Locations
