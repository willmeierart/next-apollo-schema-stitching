import { Link } from 'next-url-prettifier'
import { Router, routes } from '../../server/routes'

const TopSubMenu = ({ url }) => {
  console.log(url)
  const route = routes.find(route => {
    console.log(route)
    const matchVal = url.pathname.match(/[a-z]/g).join('')
    console.log(matchVal)
    return route.page === matchVal
  })
  console.log(route)
  return (
    <div className='submenu-outer'>
      <ul>
        { route.children.map(child => (
          <li key={child.title}>
            <Link prefetch route={Router.linkPage(route.page, { title: child.title })}>
              <span>{ child.title }</span>
            </Link>
          </li>
        )) }
      </ul>
      <style jsx>{`
        .submenu-outer {
          width: 80vw;
          left: 10vw;
          position: relative;
        }
        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        li {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default TopSubMenu
