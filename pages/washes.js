import AppProvider from '../lib/redux/AppProvider'
import TopSubMenu from '../components/layout/TopSubMenu'
import withData from '../lib/withData'

const Washes = ({ url }) => (
  <AppProvider title='Washes'>
    <TopSubMenu url={url} />
    <style jsx>{``}</style>
  </AppProvider>
)

export default withData(Washes)
