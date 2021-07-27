import { ChipIcon, UserCircleIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useProfile } from '../hooks/useUser'
import { getBlockieImageUrl } from '../lib/utils'

type Props = {
  className?: string
}

const AppHeader: FC<Props> = ({ className }) => {
  const profile = useProfile()

  return (
    <header
      className={cn(
        'bg-white shadow py-2 px-4 md:px-8 flex items-center',
        className
      )}
    >
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
      <Link href="/account">
        <a className="text-gray-400 ml-auto">
          {profile.id && process.browser ? (
            <div style={{ marginBottom: '-7px' }}>
              <Image
                src={getBlockieImageUrl(profile.id)}
                width={40}
                height={40}
                alt={profile.id}
                className="w-8 h-8 rounded-full"
              />
            </div>
          ) : (
            <UserCircleIcon className="w-8 h-8" />
          )}
        </a>
      </Link>
    </header>
  )
}

export default AppHeader
