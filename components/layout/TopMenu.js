import Link from 'next/link'
import routes from '../../server/routes'

const TopMenu = () => {
  const renderList = () => (
    <ul>
      {
        routes.map(route => {
          switch (route.title) {
            case ('Car Washes' || 'Fast Pass - Unlimited' || 'About') :
              return (
                <li key={route.route}><Link href={route.route}><span className='standard'><a>{ route.title }</a></span></Link></li>
              )
            case 'Locations' :
              return (
                <li key={route.route}><Link href={route.route}><span className='locations'><a>FIND A LOCATION</a></span></Link></li>
              )
            case 'My Account' :
              return (
                <li key={route.route}><Link href={route.route}><span className='account'><a>{ route.title }</a></span></Link></li>
              )
            default :
              return (
                <li key={route.route}><Link href={route.route}><span className='standard'><a>{ route.title }</a></span></Link></li>
              )
          }
        })
      }
      <style jsx>{`
        ul {
          display: flex;
          {/* justify-content: space-between; */}
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
