import type { AppProps } from 'next/app'
import AppContainer from '../components/AppContainer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  )
}
export default MyApp
