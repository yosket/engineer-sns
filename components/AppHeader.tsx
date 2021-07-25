import { ChipIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  className?: string
}

const AppHeader: FC<Props> = ({ className }) => {
  return (
    <header className={cn('bg-white shadow py-2 px-4', className)}>
      <Link href="/">
        <a className="flex items-center space-x-2">
          <ChipIcon className="w-6 h-6 md:w-10 md:h-10" />
          <span className="text-2xl">Engineer SNS</span>
        </a>
      </Link>
    </header>
  )
}

export default AppHeader
