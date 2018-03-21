import AppProvider from '../lib/redux/AppProvider'
import TopSubMenu from '../components/layout/TopSubMenu'

const Washes = ({ url }) => (
  <AppProvider title='Washes'>
    <TopSubMenu url={url} />
    <style jsx>{``}</style>
  </AppProvider>
)

export default Washes
