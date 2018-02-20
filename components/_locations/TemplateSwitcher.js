import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TemplateInitial from './TemplateInitial'
import TemplateResults from './TemplateResults'
import TemplateDetail from './TemplateDetail'

const TemplateSwitcher = ({ template }) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'initial':
        return <TemplateInitial />
      case 'results':
        return <TemplateResults />
      case 'detail':
        return <TemplateDetail />
      default :
        return <TemplateInitial />
    }
  }
  return (
    <div>
      { componentSwitcher() }
    </div>
  )
}

TemplateSwitcher.propTypes = {

}

export default TemplateSwitcher
