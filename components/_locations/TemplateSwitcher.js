import TemplateInitial from './TemplateInitial'
import TemplateResults from './TemplateResults'
import TemplateDetail from './TemplateDetail'

const TemplateSwitcher = ({ template, children, onGetUserLocation, userLocation }) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'initial':
        return <TemplateInitial onGetUserLocation={onGetUserLocation} userLocation={userLocation} >{ children }</TemplateInitial>
      case 'results':
        return <TemplateResults>{ children }</TemplateResults>
      case 'detail':
        return <TemplateDetail>{ children }</TemplateDetail>
      default :
        return <TemplateInitial onGetUserLocation={onGetUserLocation} userLocation={userLocation} >{ children }</TemplateInitial>
    }
  }
  return (
    <div>
      { componentSwitcher() }
    </div>
  )
}

export default TemplateSwitcher
