import { FC } from 'react'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

const AppContainer: FC = ({ children }) => {
  return (
    <div className="bg-white relative min-h-screen flex flex-col">
      <AppHeader className="sticky top-0 w-full z-10" />
      <main className="bg-white flex-1">{children}</main>
      <AppFooter />
    </div>
  )
}

export default AppContainer
