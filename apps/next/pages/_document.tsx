import React from 'react'
import { AppRegistry } from 'react-native'

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const styles = [getStyleElement()]

    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps, styles: React.Children.toArray(styles) }
  }

  render() {
    return (
      <Html lang="ar" dir="rtl">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
