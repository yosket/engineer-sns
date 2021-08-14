import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import AppContainer from '../components/AppContainer'
import AppHead from '../components/AppHead'
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
      <AppHead
        title="SOFEAP - SNS only for engineers and programmers"
        description="『エンジニア・プログラマにしか使えないSNSを作ってみた話』のウェブクライアントです"
        imageUrl={`${process.env.CLIENT_ORIGIN}/ogp.png`}
      >
        <link rel="icon" type="svg+xml" href="/logo.svg" key="favicon" />
      </AppHead>

      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </>
  )
}
export default MyApp
