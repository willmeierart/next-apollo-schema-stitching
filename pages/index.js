// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import { allFadeColors, allPaintings } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
import React, { Component } from 'react'
// import { connect } from 'react-redux'
import AppProvider from '../lib/redux/AppProvider'
// import AppProvider from '../lib/redux/AppProvider'
// import { AzLogo01 } from '../components/assets/ZeroLogos'
import HomeWrapper from '../components/_home-global/HomeWrapper'
import withData from '../lib/withData'

// include boilerplate for global loader dependent on graphql req's:
class HomePage extends Component {
  render () {
    return (
      <AppProvider title='Home'>
        {/* <AppProvider title="Home"> */}
          <div>
            {/* {allThings1.loading || allThings2.loading ? (
            <div className='loader-wrapper'>
              <Loader type='line-spin-fade-loader' active />
            </div>
          ) : ( */}
            {/* )} */}
            <HomeWrapper />
          </div>
          <style jsx>{`
             {
              /* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */
            }`}</style>
        {/* </AppProvider> */}
      </AppProvider>
    )
  }
}

export default withData(HomePage)
