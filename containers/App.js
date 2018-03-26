// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
// import 'normalize.css'
import { connect } from 'react-redux'
import { setLocPageState } from '../lib/redux/actions'
// import Head from '../components/Head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// import globalStyles from '../../styles/index.scss'

class App extends Component {
  render () {
    const { title, children, pageState } = this.props
    return (
      <div className='App'>
        {/* <Head title={title} /> */}
        <div>
          <Header pageState={pageState} />
          <main>{ children }</main>
          <Footer pageState={pageState} />
        </div>
        <style jsx global>{`
          body {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
            font-family: sans-serif;
          }
          main {
            min-height: 80vh;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          ul, li {
            list-style: none;
            padding-left: 0;
            margin-left: 0;
            --webkit-padding-before: 0;
          }
        `}</style>
        {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}
      </div>
    )
  }
} 

function mapStateToProps (state) {
  return {
    pageState: state.location.pageState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetLocPageState: pageState => dispatch(setLocPageState(pageState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App
