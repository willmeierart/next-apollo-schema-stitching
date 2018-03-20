import React, { Component } from 'react'
import { binder } from '../../lib/_utils'
import locData from '../../lib/_data/carwashUSAexpressAddresses'

export default class TemplateResults extends Component {
  constructor (props) {
    super(props)
    binder(this, ['renderResults'])
  }

  renderResults () {
    const results = locData
    return results.map((location, i) => {
      console.log(location)      
      const { address } = location
      const addrSplitta = address.indexOf(',')
      const addr1 = address.substring(0, addrSplitta)
      const addr2 = address.substring(addrSplitta + 2, address.length)
      return (
        <div className='result-outer'>
          <div className='result-inner'>
            <h3>{ location.name }</h3>
            <div className='details-container'>
              <div className='col col-left'>
                <div className='small-grey-1 addr-1'>{ addr1 }</div>
                <div className='small-grey-1 addr-2'>{ addr2 }</div>
                <div className='phone'>{ location.phone }</div>
                <div className='small-grey-2 details'>{ location.details }</div>
              </div>
              <div className='col col-right'>
                <div className='hours'>HOURS</div>
                <div>{ location.hours.map(hrs => (
                  <div className='mapped-hrs'>
                    <div className='small-grey-2'>{ hrs.day }</div>
                    <div className='small-grey-2'>{ hrs.time }</div>
                  </div>
                )) }</div>
                <div className='visit-btn'>VISIT LOCATION PAGE</div>
              </div>
            </div>
          </div>
          { i !== results.length - 1 && <hr /> }
          <style jsx>{`
            .result-inner {
              margin: 1em 0;
            }
            h3 {
              margin: 0;
              margin-bottom: .25em;
            }
            .details-container {
              display: flex;
              justify-content: space-between;
              position: relative;
              line-height: 1.25em;
            }
            .col1 {
              width: 69%;
            }
            .col2 {
              width: 39%;
            }
            .col {
              width: 49%;
            }
            .small-grey-1, .small-grey-2 {
              font-size: .75em;
              color: grey;
            }
            .small-grey-2 {
              font-size: .5em;
              line-height: 2em;
            }
            .hours {
              font-size: .7em;
            }
            .phone, .visit-btn {
              font-size: .85em;
            }
            .visit-btn {
              background-color: lightgrey;
              border: 2px solid grey;
              border-radius: 2px;
              text-align: center;
              font-size: .5em;
            }
            .mapped-hrs {
              display: flex;
              justify-content: space-between;
            }
          `}</style>
        </div>
      )
    })
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
