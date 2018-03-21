import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TopSubMenu from '../layout/TopSubMenu'
import { binder } from '../../lib/_utils'

class AboutWrapper extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount () {

  }
  render () {
    const { url } = this.props
    return (
      <div className='outer-wrapper'>
        <TopSubMenu url={url} />
        <style jsx>{``}</style>
      </div>
    )
  }
}

AboutWrapper.propTypes = {

}

export default AboutWrapper
