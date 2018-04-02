import React, { Component } from 'react'
// import ExecutionEnvironment from 'exenv'
import PropTypes from 'prop-types'
import WashesTable from './WashesTable'
import WashFastPassCallout from './WashFastPassCallout'
import { binder } from '../../lib/_utils'

class AboutWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'exterior-washes' // exterior-washes || full-service || express-detail || fleet-accounts || specials
    }
    binder(this, ['setPageStateViaUrl'])
  }
  componentDidMount () {
    this.setPageStateViaUrl()
  }

  componentDidUpdate (newProps) {
    if (newProps.url !== this.props.url) {
      this.setPageStateViaUrl()
    }
  }

  setPageStateViaUrl () {
    const { query: { title }, asPath, pathname } = this.props.url
    const splitPath = asPath.split(`${pathname}/`)
    const backupTitle = splitPath[splitPath.length - 1]
    this.setState({ template: title || backupTitle })
  }

  render () {
    const { type } = this.state
    const menuHeaderText = () => {
      switch (type) {
        case 'exterior-washes':
          return 'EXTERIOR CAR WASH MENU'
        case 'full-service':
          return 'FULL SERVICE CAR WASH MENU'
        case 'express-detail':
          return 'EXPRESS DETAIL CAR WASH MENU'
        case 'fleet-accounts':
          return 'FLEET ACCOUNTS MENU'
        case 'specials':
          return 'SPECIALS MENU'
        default:
          return ''
      }
    }
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <div className='top-block'>
            <div className='col-2 col-left'>
              <h1>{ type.toUpperCase().replace('-', ' ') }</h1>
              <div className='type-description'>Raw denim swag stumptown pabst. Affogato whatever schlitz tattooed coloring book, vexillologist meggings paleo skateboard roof party chicharrones flannel mumblecore organic. Dreamcatcher plaid tattooed, twee flannel craft beer beard yr listicle synth deep v cornhole pabst. Single-origin coffee umami ethical iPhone microdosing brunch, gochujang williamsburg 90's aesthetic pinterest yuccie kogi. Twee ethical cliche distillery.</div>
            </div>
            <div className='col-2 col-right'>
              <WashFastPassCallout />
            </div>
          </div>
          <div className='menu-divider'>
            <span className='line' />
            <h2> { menuHeaderText() } </h2>
            <span className='line' />
          </div>
          <div className='table-wrapper'>
            <WashesTable type={type} />
          </div>
        </div>
        {/* <TemplateSwitcher template={template} /> */}
        <style jsx>{`
          .inner-wrapper {
            margin: 2vw;
          }
          .top-block {
            width: 100%;
            position: relative;
            display: flex;
            align-items: flex-end;
          }
          .col-2 {
            width: 50%;
            padding: 2vw;
          }
          .menu-divider {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .line {
            width: 20%;
            border-top: 1px solid black;
          }
        `}</style>
      </div>
    )
  }
}

AboutWrapper.propTypes = {

}

export default AboutWrapper
