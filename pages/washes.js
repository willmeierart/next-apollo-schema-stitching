import AppProvider from '../lib/redux/AppProvider'

const Washes = ({ url }) => (
  <AppProvider title='Washes'>
    <div>{ JSON.stringify(url) }</div>
    <style jsx>{``}</style>
  </AppProvider>
)

export default Washes
