import NextRouter from 'next/router'
import { Router } from './routes'

const ImperativeRouter = {
  push: (path, query, shallow) =>
    NextRouter.push(
      {
        pathname: `/${path}`,
        query: query
      },
      Router.linkPage(path, query).as,
      { shallow }
    )
}

export default ImperativeRouter
