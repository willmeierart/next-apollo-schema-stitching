// main wrapper component - layout, universal styles, etc.
import React, { Component } from 'react'
// import 'normalize.css'
import { connect } from 'react-redux'
import Head from './Head'
import Header from './layout/Header'
import Footer from './layout/Footer'

// import globalStyles from '../../styles/index.scss'

class App extends Component {

  render () {
    const { title, children } = this.props
    return (
      <div className='App'>
        <Head title={title} />
        <div>
          <Header />
          <main>{ children }</main>
          <Footer />
        </div>
        <style jsx global>{`
          body {
            width: 100%;
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

// const mapStateToProps = async state => {
//   return null
// }

// const mapDispatchToProps = async dispatch => {
//   return null
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App
