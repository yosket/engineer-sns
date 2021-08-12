import { ClockIcon, HeartIcon, ReplyIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { FC, useState } from 'react'
import { useDayjs } from '../hooks/useDayjs'
import { useLike, useText } from '../hooks/useText'
import { useUser } from '../hooks/useUser'
import { getLikeUrl } from '../lib/fetcher'
import {
  getBlockieImageUrl,
  replaceToAnchor,
  replaceToBr,
  sanitize,
} from '../lib/utils'
import { Text, User } from '../models'
import PostModal from './PostModal'

const Image = dynamic(() => import('next/image'))

type ReplyingProps = {
  text?: Text
  user: User
}

const Replying: FC<ReplyingProps> = ({ text, user }) => {
  return (
    <div className="bg-gray-50 px-4 py-2 -mt-4 -mx-4 rounded-t-xl text-xs text-gray-500 md:text-sm space-y-2">
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center space-x-2">
          {process.browser && (
            <Image
              src={getBlockieImageUrl(user?.id ?? '')}
              width={20}
              height={20}
              alt={user?.name}
              className="w-5 h-5 rounded-full flex-shrink-0"
            />
          )}
          <span>{user?.name ?? '（未登録ユーザー）'}</span>
        </span>
        <span>への返信</span>
      </div>
      {text && (
        <p
          className="break-all"
          dangerouslySetInnerHTML={{
            __html: replaceToAnchor(
              replaceToBr(sanitize(text.text)),
              'text-blue-500'
            ),
          }}
        />
      )}
    </div>
  )
}

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
  const { data: like, mutate: mutateLike } = useLike(text.id ?? '')
  const [isReplyModalShown, setIsReplyModalShown] = useState<boolean>(false)
  const dayjs = useDayjs()

  const sendLike = async () => {
    try {
      await fetch(getLikeUrl(text.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'LOVE',
        },
        body: JSON.stringify({ like_count: (like?.like_count ?? 0) + 1 }),
      })
      await mutateLike()
    } catch (e) {
      alert('エラーが発生しました')
    }
  }

  return (
    <>
      <article
        className="border border-gray-200 p-4 rounded-xl space-y-4"
        key={text.id}
      >
        {replyingText && userOfReplyingText ? (
          <Replying text={replyingText} user={userOfReplyingText} />
        ) : (
          replyingUser && <Replying user={replyingUser} />
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
            <span className="truncate">
              {user?.name ?? '（未登録ユーザー）'}
            </span>
            <small className="text-gray-400 truncate">{text._user_id}</small>
          </p>
        </UserInfo>
        <p
          className="break-all text-sm md:text-base"
          dangerouslySetInnerHTML={{
            __html: replaceToAnchor(
              replaceToBr(sanitize(text.text)),
              'text-blue-500'
            ),
          }}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs space-x-4">
            <button
              className="text-gray-400"
              onClick={() => setIsReplyModalShown(true)}
            >
              <span className="flex items-center space-x-1">
                <ReplyIcon className="w-4 h-4" />
                <span>返信</span>
              </span>
            </button>
            <button className="text-gray-400" onClick={sendLike}>
              <span className="flex items-center space-x-1">
                <HeartIcon className="w-4 h-4" />
                <span>{like?.like_count ?? 0}</span>
              </span>
            </button>
          </div>
          <p className="text-xs text-gray-400 flex justify-end items-center space-x-2">
            <ClockIcon className="w-4 h-4" />
            <time>{dayjs(text._created_at).format('lll')}</time>
          </p>
        </div>
      </article>

      <PostModal
        shown={isReplyModalShown}
        hide={() => setIsReplyModalShown(false)}
        toText={text}
      />
    </>
  )
}

export default TextListItem
