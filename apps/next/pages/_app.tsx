import 'raf/polyfill'
import 'setimmediate'
import 'app/locales'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React, { useEffect } from 'react'

import '../global.css'
import { AppProps } from 'next/app'
import { useAppStore } from 'app/storage/store'

function MyApp({ Component, pageProps }: AppProps) {
  const { language } = useAppStore();

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <>
      <Head>
        <title>Promptless - AI Prompt Generator</title>
        <meta
          name="description"
          content="Smart Professional Prompt System."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
