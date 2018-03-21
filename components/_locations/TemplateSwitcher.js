import TemplateInitial from './TemplateInitial'
import TemplateResults from './TemplateResults'
import TemplateDetail from './TemplateDetail'

const TemplateSwitcher = ({ template, children, onGetUserLocation, userLocation, onSetActiveLocation, activeLocation }) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'initial':
        return <TemplateInitial onGetUserLocation={onGetUserLocation} userLocation={userLocation} >{ children }</TemplateInitial>
      case 'results':
        return <TemplateResults onSetActiveLocation={onSetActiveLocation} >{ children }</TemplateResults>
      case 'detail':
        return <TemplateDetail onSetActiveLocation={onSetActiveLocation} activeLocation={activeLocation} >{ children }</TemplateDetail>
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
