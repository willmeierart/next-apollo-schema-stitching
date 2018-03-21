import Link from 'next/link'

const Logo = () => (
  <Link href='/'><a>
    <div className='logo-wrapper'>
      <img src='/static/images/CWUE_logo.png' alt='logo' />
      <style jsx>{`
        .logo-wrapper {
          margin: 0.5em;
          border-radius: 5px;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          position:relative;
        }
        img {
          height: 100%;
        }
        h1 {
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  </a></Link>
)

export default Logo
