import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import AppContainer from '../components/AppContainer'
import { useIpData, useMe } from '../hooks/useUser'
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

  useIpData()
  useMe()

  return (
    <>
      <Head>
        <title key="title">
          SOFEAP - SNS only for engineers and programmers
        </title>
        <link rel="icon" type="svg+xml" href="/logo.svg" key="favicon" />
      </Head>

      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </>
  )
}
export default MyApp
