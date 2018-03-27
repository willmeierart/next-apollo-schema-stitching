import Link from 'next/link'
import TopMenu from './TopMenu'
import Logo from './Logo'

const Header = props => (
  <div className='header'>
    <Logo />
    {/* <div className='title'>CARWASH USA EXPRESS</div> */}
    <TopMenu {...props} />
    <style jsx>{`
      .header {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    `}</style>
  </div>
)

export default Header
