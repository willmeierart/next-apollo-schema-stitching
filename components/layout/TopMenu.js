import { Link } from 'next-url-prettifier'
import { Router, routes } from '../../server/routes'

const TopMenu = ({ pageState }) => {
  const renderList = () => (
    <ul>
      {
        routes.map(route => {
          switch (route.title) {
            case ('Car Washes') :
              return (
                <li key={route.title}>
                  <Link prefetch route={Router.linkPage(route.page, { title: route.title })}>
                    <span className='standard'>{ route.title }</span>
                  </Link>
                </li>
              )
            case ('Fast Pass - Unlimited') :
              return (
                <li key={route.title}>
                  <Link prefetch route={Router.linkPage(route.page, { title: route.title })}>
                    <span className='standard'>{ route.title }</span>
                  </Link>
                </li>
              )
            case ('About') :
              return (
                <li key={route.title}>
                  <Link prefetch route={Router.linkPage(route.page, { title: route.title })}>
                    <span className='standard'>{ route.title }</span>
                  </Link>
                </li>
              )
            case 'Locations' :
              return (
                <li key={route.title}>
                  <Link prefetch route={Router.linkPage(route.page, { state: pageState })}>
                    <span className='locations'>FIND A LOCATION</span>
                  </Link>
                </li>
              )
            case 'My Account' :
              return (
                <li key={route.title}>
                  <a href=''><span className='account'>{ route.title }</span></a>
                </li>
              )
            default :
              return (
                <li key={route.title} />
              )
          }
        })
      }
      <style jsx>{`
        ul {
          display: flex;
          font-size: .75em;
          margin-left: 3em;
        }
        li {
          margin-right: 5em;
          white-space: nowrap;
          cursor: pointer;
        }
        .account {
          position: absolute;
          top: 5px;
          right: 5px;
          color: grey;
        }
        .locations {
          background-color: lightgrey;
          border: 1px solid black;
          border-radius: 5px;
          padding: .5em;
        }
      `}</style>
    </ul>
  )

  return (
    <div className='top-menu'>
      <div className='list-wrapper'>
        <ul>{ renderList() }</ul>
      </div>
      <style jsx>{`
        .top-menu {
          width: 100%;
        }
        .list-wrapper{
          width: 80%;
        }
      `}</style>
    </div>
  )
}

export default TopMenu
