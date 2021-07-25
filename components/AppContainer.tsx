import { FC } from 'react'
import AppHeader from './AppHeader'

const AppContainer: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 relative min-h-screen">
      <AppHeader className="sticky top-0 w-full z-10" />
      <main className="max-w-screen-sm mx-auto bg-white">{children}</main>
    </div>
  )
}

export default AppContainer
