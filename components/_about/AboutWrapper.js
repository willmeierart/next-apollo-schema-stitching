import React, { Component } from 'react'
import ExecutionEnvironment from 'exenv'
import PropTypes from 'prop-types'
import TopSubMenu from '../layout/TopSubMenu'
import TemplateSwitcher from './TemplateSwitcher'
import { binder } from '../../lib/_utils'

class AboutWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      template: 'company' // company || testimonials || news || careers || faq || contact
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
    const { title } = this.props.url.query
    this.setState({ template: title })
  }

  render () {
    const { url } = this.props
    const { template } = this.state
    return (
      <div className='outer-wrapper'>
        <TemplateSwitcher template={template} />
        <style jsx>{``}</style>
      </div>
    )
  }
}

AboutWrapper.propTypes = {

}

export default AboutWrapper
