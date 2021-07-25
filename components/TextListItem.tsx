import { ClockIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'
import { useDayjs } from '../hooks/useDayjs'
import { getBlockieImageUrl } from '../lib/utils'
import { Text, User } from '../models'

const Image = dynamic(() => import('next/image'))

type Props = {
  text: Text
  user?: User
}

const TextListItem: FC<Props> = ({ text, user }) => {
  const dayjs = useDayjs()

  return (
    <article
      className="border border-gray-200 p-4 rounded-xl space-y-4"
      key={text.id}
    >
      <Link href={`/users/${text._user_id}`}>
        <a className="flex items-center space-x-4">
          {process.browser && (
            <Image
              src={getBlockieImageUrl(text._user_id)}
              width={40}
              height={40}
              alt={user?.name}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
          )}
          <p className="grid flex-1">
            <span className="truncate">{user?.name ?? text._user_id}</span>
            <small className="text-gray-400 truncate">{text._user_id}</small>
          </p>
        </a>
      </Link>
      <p className="break-all">{text.text}</p>
      <p className="text-xs text-gray-400 flex justify-end items-center space-x-2">
        <ClockIcon className="w-4 h-4" />
        <time>{dayjs(text._created_at).format('lll')}</time>
      </p>
    </article>
  )
}

export default TextListItem
