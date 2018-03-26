import React, { Component } from 'react'
import ResultModule from './ResultModule'
import { binder } from '../../lib/_utils'
import locData from '../../lib/_data/locData'

// copied directly from TemplateResults for now

export default class TemplateRegion extends Component {
  constructor (props) {
    super(props)
    binder(this, ['renderResults', 'pickLocation'])
  }

  pickLocation (location) { this.props.onSetActiveLocation(location) }

  renderResults () {
    const results = locData
    return results.map((location, i) => (
      <div key={`result-${i}`}>
        <ResultModule pickLocation={this.pickLocation} location={location} />
        { i !== results.length - 1 && <hr /> }
      </div>
    ))
  }

  render () {
    const { children } = this.props
    const Title = children[0]
    const SearchBar = children[1]
    const Map = children[2]
    return (
      <section className='template-wrapper'>
        <div className='title-wrapper'>{ Title }</div>
        <section className='content-wrapper'>
          <div className='col col-left'>
            <h2 className='locations-near content'>
              Locations Near [search]
              <hr />
            </h2>
            <div className='results-container content'>{ this.renderResults() }</div>
          </div>
          <div className='col col-right'>
            <div className='search-wrapper content'>{ SearchBar }</div>
            <div className='map-wrapper content'>{ Map }</div>
          </div>
        </section>
        <style jsx>{`
          section {
            width: 100%;
            box-sizing: border-box;
            position: relative;
          }
          .template-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2vw;
          }
          .content-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .col {
            width: 48%;
            display: flex;
            flex-direction: column;
          }
          .col-left {
            align-items: flex-start;
          }
          .col-right {
            align-items: center;
          }
          .locations-near {
            margin: 0;
          }
          .content {
            width: 100%;
          }
          .map-wrapper {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </section>
    )
  }
}
