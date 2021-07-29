import { ClockIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC } from 'react'
import { useDayjs } from '../hooks/useDayjs'
import { useText } from '../hooks/useText'
import { useUser } from '../hooks/useUser'
import { getBlockieImageUrl, replaceToAnchor, replaceToBr } from '../lib/utils'
import { Text, User } from '../models'

const Image = dynamic(() => import('next/image'))

type UserInfoType = {
  user?: User
}

const UserInfo: FC<UserInfoType> = ({ user, children }) => {
  return (
    <>
      {!!user ? (
        <Link href={`/users/${user.id}`}>
          <a className="flex items-center space-x-4">{children}</a>
        </Link>
      ) : (
        <div className="flex items-center space-x-4">{children}</div>
      )}
    </>
  )
}

type Props = {
  text: Text
  user?: User
}

const TextListItem: FC<Props> = ({ text, user }) => {
  const { data: replyingText } = useText(text.in_reply_to_text_id ?? '', {
    shouldRetryOnError: false,
  })
  const { data: userOfReplyingText } = useUser(replyingText?._user_id ?? '', {
    shouldRetryOnError: false,
  })
  const { data: replyingUser } = useUser(text.in_reply_to_user_id ?? '', {
    shouldRetryOnError: false,
  })
  const dayjs = useDayjs()

  return (
    <article
      className="border border-gray-200 p-4 rounded-xl space-y-4"
      key={text.id}
    >
      {replyingUser && (
        <div className="bg-gray-50 px-4 py-2 -mt-4 -mx-4 rounded-t-xl text-xs md:text-sm flex items-center space-x-2">
          <span className="inline-flex items-center space-x-2">
            {process.browser && (
              <Image
                src={getBlockieImageUrl(replyingUser.id)}
                width={20}
                height={20}
                alt={replyingUser?.name}
                className="w-5 h-5 rounded-full flex-shrink-0"
              />
            )}
            <span>{replyingUser?.name ?? '（未登録ユーザー）'}</span>
          </span>
          <span className="">への返信</span>
        </div>
      )}

      <UserInfo user={user}>
        {process.browser && (
          <Image
            src={getBlockieImageUrl(text._user_id)}
            width={40}
            height={40}
            alt={user?.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        )}
        <p className="grid flex-1 text-sm md:text-base">
          <span className="truncate">{user?.name ?? '（未登録ユーザー）'}</span>
          <small className="text-gray-400 truncate">{text._user_id}</small>
        </p>
      </UserInfo>

      <p
        className="break-all text-sm md:text-base"
        dangerouslySetInnerHTML={{
          __html: replaceToAnchor(replaceToBr(text.text), 'text-blue-500'),
        }}
      />

      <p className="text-xs text-gray-400 flex justify-end items-center space-x-2">
        <ClockIcon className="w-4 h-4" />
        <time>{dayjs(text._created_at).format('lll')}</time>
      </p>

      {replyingText && userOfReplyingText && (
        <TextListItem text={replyingText} user={userOfReplyingText} />
      )}
    </article>
  )
}

export default TextListItem
