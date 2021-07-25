import { FC } from 'react'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

const AppContainer: FC = ({ children }) => {
  return (
    <div className="bg-white relative min-h-screen">
      <AppHeader className="sticky top-0 w-full z-10" />
      <main className="bg-white">{children}</main>
      <AppFooter />
    </div>
  )
}

export default AppContainer
