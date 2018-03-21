import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class CustomDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
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
