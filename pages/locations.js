import AppProvider from '../lib/redux/AppProvider'
import LocationsWrapper from '../components/_locations/LocationsWrapper'

const Locations = ({ url }) => (
  <AppProvider title='Location'>
    <LocationsWrapper url={url} />
  </AppProvider>
)
export default Locations
