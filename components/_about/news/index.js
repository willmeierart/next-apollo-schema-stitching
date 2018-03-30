import PropTypes from 'prop-types'

const News = props => {
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

News.propTypes = {}

export default News
