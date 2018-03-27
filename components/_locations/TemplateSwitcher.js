import TemplateInitial from './TemplateInitial'
import TemplateResults from './TemplateResults'
import TemplateRegion from './TemplateRegion'
import TemplateDetail from './TemplateDetail'

const TemplateSwitcher = ({
  template,
  children,
  onGetUserLocation,
  userLocation,
  onSetActiveLocation,
  activeLocation,
  activeResults,
  setActiveResults
}) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'initial':
        return (
          <TemplateInitial
            onGetUserLocation={onGetUserLocation}
            userLocation={userLocation} >
            { children }
          </TemplateInitial>
        )
      case 'results':
        return (
          <TemplateResults
            activeResults={activeResults}
            setActiveResults={setActiveResults} 
            onSetActiveLocation={onSetActiveLocation}>
            { children }
          </TemplateResults>
        )
      case 'region':
        return (
          <TemplateRegion>{ children }</TemplateRegion>
        )
      case 'detail':
        return (
          <TemplateDetail
            onSetActiveLocation={onSetActiveLocation}
            activeLocation={activeLocation} >
            { children }
          </TemplateDetail>
        )
      default :
        return (
          <TemplateInitial
            onGetUserLocation={onGetUserLocation}
            userLocation={userLocation} >
            { children }
          </TemplateInitial>
        )
    }
  }
  return componentSwitcher()
}

export default TemplateSwitcher
