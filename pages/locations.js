import App from '../components/App'
import GoogleMap from '../components/_locations/GoogleMap'
import SearchBar from '../components/_locations/SearchBar'

const Locations = () => (
  <App title='Location'>
    <h1>Location</h1>
    <GoogleMap />
    <SearchBar />
    <style jsx>{``}</style>
  </App>
)

export default Locations
