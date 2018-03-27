import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import withData from '../../lib/withData'
// import CustomLoader from '../components/layout/Loader'

const ConnectReduxApollo = (mapStateToProps, mapDispatchToProps, queries, ComposedComponent) => {
  const composedQueries = Object.keys(queries).map(query => {
    const q = graphql(query, { name: `${query}` })
    console.log(q)
    return q
  })
  console.log(composedQueries)

  return connect(mapStateToProps, mapDispatchToProps)(
    withData(
      compose(composedQueries)(ComposedComponent)
    )
  )
}

export default ConnectReduxApollo
