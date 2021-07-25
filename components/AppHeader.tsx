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
        <a
          className="inline-flex items-center space-x-2 align-top bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text"
          style={{ WebkitTextFillColor: 'transparent' }}
        >
          <ChipIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
          <span
            className="text-2xl font-bold"
            style={{
              letterSpacing: '-1px',
            }}
          >
            Engineer SNS
          </span>
        </a>
      </Link>
    </header>
  )
}

export default AppHeader
