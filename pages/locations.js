import AppProvider from '../lib/redux/AppProvider'
import LocationsWrapper from '../components/_locations/LocationsWrapper'
import withData from '../lib/withData'

const Locations = ({ url }) => {
  return (
    <AppProvider title='Location'>
      <LocationsWrapper url={url} />
    </AppProvider>
  )
}

export default withData(Locations)
