import AppProvider from '../lib/redux/AppProvider'
import withData from '../lib/withData'

const FastPass = () => (
  <AppProvider title='FastPass'>
    <div>FastPass</div>
    <style jsx>{``}</style>
  </AppProvider>
)

export default withData(FastPass)
