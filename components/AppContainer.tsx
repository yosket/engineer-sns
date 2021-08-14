import { FC } from 'react'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

const AppContainer: FC = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 relative min-h-screen flex flex-col">
      <AppHeader className="sticky top-0 w-full z-10" />
      <main className="bg-gray-50 dark:bg-gray-800 flex-1">{children}</main>
      <AppFooter className="bg-gray-50 dark:bg-gray-800" />
    </div>
  )
}

export default AppContainer
