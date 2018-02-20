// literally HTML head - all SEO stuff, etc.
import Head from 'next/head'

const initialProps = {
  title: 'Carwash USA Express',
  initialScale: '1.0'
}

const CustomHead = (props = initialProps) => {
  const { title, initialScale } = props
  return <Head>
    <title key='title'>{title}</title>
    <meta key='charSet' charset='utf-8' />
    <meta key='viewport' name='viewport' content={`inital-scale=${initialScale || initialProps.initialScale}, width=device-width, shrink-to-fit=no`} />
    <meta key='meta-title' name='title' content='Carwash USA Express' />
    <link rel='shortcut icon' href='/zero.ico' />
    <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
    {/* <script async src='https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X' /> */}
  </Head>
}

export default CustomHead
