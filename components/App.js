import React, { Component } from 'react'

export default class App extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='App'>
        <div>
          <main>{ this.props.children }</main>
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
            margin-top: 120px;
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
      </div>
    )
  }
}
