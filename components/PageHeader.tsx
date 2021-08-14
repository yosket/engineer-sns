import { FC } from 'react'
import BackButton from './BackButton'

type Props = {
  backTo?: string
  backButtonText?: string
}

const PageHeader: FC<Props> = ({ children, backTo, backButtonText }) => (
  <div className="bg-white dark:bg-gray-700">
    <div className="max-w-screen-sm mx-auto relative">
      <h1 className="text-lg p-2 md:p-4 font-bold text-center text-gray-600 dark:text-gray-200">
        {children}
      </h1>
      {backTo && (
        <BackButton
          href={backTo}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 md:mx-8 text-gray-600 dark:text-gray-200"
          iconClassName="w-4 md:w-6 h-4 md:h-6 text-gray-600 dark:text-gray-200"
        >
          {backButtonText}
        </BackButton>
      )}
    </div>
  </div>
)

export default PageHeader
