import TemplateInitial from './TemplateInitial'
import TemplateResults from './TemplateResults'
import TemplateDetail from './TemplateDetail'

const TemplateSwitcher = ({ template, children }) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'initial':
        return <TemplateInitial>{ children }</TemplateInitial>
      case 'results':
        return <TemplateResults>{ children }</TemplateResults>
      case 'detail':
        return <TemplateDetail>{ children }</TemplateDetail>
      default :
        return <TemplateInitial>{ children }</TemplateInitial>
    }
  }
  return (
    <div>
      { componentSwitcher() }
    </div>
  )
}

export default TemplateSwitcher
