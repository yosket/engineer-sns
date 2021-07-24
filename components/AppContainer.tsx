import { FC } from 'react'

const AppContainer: FC = ({ children }) => {
  return (
    <div className="bg-gray-100">
      <main className="max-w-screen-sm mx-auto bg-white">{children}</main>
    </div>
  )
}

export default AppContainer
