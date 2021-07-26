import { ChipIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  className?: string
}

const AppHeader: FC<Props> = ({ className }) => {
  return (
    <header className={cn('bg-white shadow py-2 px-4 md:px-8', className)}>
      <Link href="/">
        <a className="inline-block align-top">
          <div className="flex items-center space-x-2">
            <ChipIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
            <span
              className="text-2xl font-bold bg-gradient-primary bg-clip-text"
              style={{
                letterSpacing: '-1px',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Engineer SNS
            </span>
          </div>
        </a>
      </Link>
    </header>
  )
}

export default AppHeader
