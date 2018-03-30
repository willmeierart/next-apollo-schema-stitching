import PropTypes from 'prop-types'

const Company = props => {
  return (
    <div className='outer-container'>
      <div className='inner-container'></div>
      <style jsx>{`
        .outer-container {}
        .inner-container {}
      `}</style>
    </div>
  )
}

Company.propTypes = {}

export default Company
