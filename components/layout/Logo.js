const Logo = () => (
  <div className='logo-wrapper'>
    <img src='/CWUE_logo.png' alt='Carwash USA express logo' />
    <h1 className='logo'>LOGO</h1>
    <style jsx>{`
      .logo-wrapper {
        margin: 0.5em;
        border: 2px solid black;
        border-radius: 5px;
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h1 {
        padding: 0;
        margin: 0;
      }
    `}</style>
  </div>
)

export default Logo
