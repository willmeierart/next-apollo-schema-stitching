import Document, { Head, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    return await Document.getInitialProps(ctx)
  }
  render () {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script key='google-map' type='text/javascript' async defer
            src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDx1N1vkCcwJt-BFELA_OyOMCBg9WAHlJs&libraries=places' />
        </body>
      </html>
    )
  }
}
