import { ChipIcon, UserCircleIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useMe } from '../hooks/useUser'
import { getBlockieImageUrl } from '../lib/utils'

type Props = {
  className?: string
}

const AppHeader: FC<Props> = ({ className }) => {
  const { data: profile } = useMe()

  return (
    <header
      className={cn(
        'bg-white dark:bg-gray-800 shadow pt-2 pb-2.5 px-4 md:px-8 flex items-center',
        className
      )}
    >
      <Link href="/">
        <a className="inline-block align-top">
          <div className="flex items-center space-x-2 md:space-x-4">
            <ChipIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <span className="leading-none">
              <span
                className="inline-block text-xl font-bold bg-gradient-primary bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                SOFEAP
              </span>
              <small
                className="block bg-gradient-primary bg-clip-text"
                style={{ fontSize: '8px', WebkitTextFillColor: 'transparent' }}
              >
                SNS only for engineers and programmers
              </small>
            </span>
          </div>
        </a>
      </Link>
      <Link href="/account">
        <a className="text-gray-400 ml-auto">
          {profile?.id && process.browser ? (
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
      <span
        className="absolute bottom-0 left-0 bg-gradient-primary w-full h-0.5"
        aria-hidden
      />
    </header>
  )
}

export default AppHeader
