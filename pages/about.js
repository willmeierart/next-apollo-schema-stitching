import AppProvider from '../lib/redux/AppProvider'

const About = ({ url }) => (
  <AppProvider url={url} title='About'>
    <div>{JSON.stringify(url)}</div>
    <style jsx>{``}</style>
  </AppProvider>
)

export default About
