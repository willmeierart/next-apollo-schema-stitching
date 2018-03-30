import Company from './company'
import Testimonials from './testimonials'
import News from './news'
import Careers from './careers'
import FAQ from './faq'
import Contact from './contact'

const TemplateSwitcher = ({
  template,
  children
}) => {
  const componentSwitcher = () => {
    switch (template) {
      case 'company':
        return (
          <Company>
            { children }
          </Company>
        )
      case 'testimonials':
        return (
          <Testimonials>
            { children }
          </Testimonials>
        )
      case 'news':
        return (
          <News>
            { children }
          </News>
        )
      case 'careers':
        return (
          <Careers>
            { children }
          </Careers>
        )
      case 'faq':
        return (
          <FAQ>
            { children }
          </FAQ>
        )
      case 'contact':
        return (
          <Contact>
            { children }
          </Contact>
        )
      default :
        return (
          <Company>
            { children }
          </Company>
        )
    }
  }
  return componentSwitcher()
}

export default TemplateSwitcher
