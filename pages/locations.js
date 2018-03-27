// import { graphql, compose } from 'react-apollo'
// import CustomLoader from '../components/layout/Loader'
// import withData from '../lib/withData'
// import { allLocationDetails } from '../lib/queries'
import { checkAllQueriesError } from '../lib/_utils'
import AppProvider from '../lib/redux/AppProvider'
import LocationsWrapper from '../components/_locations/LocationsWrapper'

const Locations = ({ url, data }) => {
  // const { loading, allLocations } = data
  const queries = ['allLocationDetails']
  checkAllQueriesError(queries)

  console.log(data)

  return (
    <AppProvider title='Location'>
      <LocationsWrapper url={url} />
    </AppProvider>
  )
}
// export default withData(
//   graphql(allLocationDetails)(Locations)
// )
export default Locations
