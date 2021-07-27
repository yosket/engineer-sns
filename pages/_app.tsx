import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import AppContainer from '../components/AppContainer'
import AppProvider from '../providers/AppProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const setFillHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    window.addEventListener('resize', setFillHeight)
    setFillHeight()
    return () => window.removeEventListener('resize', setFillHeight)
  }, [])

  return (
    <>
      <Head>
        <title key="title">Engineer SNS</title>
        <link rel="icon" type="image/png" href="/favicon.png" key="favicon" />
      </Head>

      <AppProvider>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </AppProvider>
    </>
  )
}
export default MyApp
