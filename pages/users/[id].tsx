import { ReplyIcon } from '@heroicons/react/outline'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import BackButton from '../../components/BackButton'
import PostModal from '../../components/PostModal'
import TextListItem from '../../components/TextListItem'
import { useTextsByUserId } from '../../hooks/useText'
import { useUser } from '../../hooks/useUser'
import { fetcher, getUsersUrl, getUserUrl } from '../../lib/fetcher'
import {
  getBlockieImageUrl,
  replaceToAnchor,
  replaceToBr,
} from '../../lib/utils'
import { Text, User } from '../../models'

const Image = dynamic(() => import('next/image'))

export const getStaticPaths: GetStaticPaths = async () => {
  const users: User[] = await fetcher(getUsersUrl())
  const paths = users
    .filter((u) => !!u.name)
    .map((u) => ({
      params: { id: u.id },
    }))
  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const user: User = await fetcher(getUserUrl(params?.id as string))
    return { props: { user }, revalidate: 1 }
  } catch (e) {
    return { notFound: true }
  }
}

const UserPage: NextPage = ({
  user: userInitialData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { data: user } = useUser(router.query.id as string, {
    initialData: userInitialData,
  })
  const { data: texts } = useTextsByUserId(user?.id ?? '')
  const [isReplyModalShown, setIsReplyModalShown] = useState<boolean>(false)

  if (!user) {
    return <></>
  }

  return (
    <>
      <div>
        <div className="overflow-hidden h-40">
          <div className="relative h-full">
            {process.browser && (
              <Image
                src={getBlockieImageUrl(user.id)}
                layout="fill"
                objectFit="cover"
                alt={user.name}
                className="filter blur-lg"
              />
            )}
            <div className="max-w-screen-sm mx-auto relative text-white">
              <BackButton
                href="/"
                className="absolute left-0 top-0 m-4 md:mx-8"
                iconClassName="w-6 h-6"
              >
                <span>トップへ戻る</span>
              </BackButton>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="max-w-screen-sm mx-auto p-4 md:p-8 relative space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center -mt-14 md:-mt-20">
                {process.browser && (
                  <div className="rounded-full border-4 border-white overflow-hidden w-20 md:w-32 h-20 md:h-32">
                    <Image
                      src={getBlockieImageUrl(user.id)}
                      width={160}
                      height={160}
                      alt={user.name}
                    />
                  </div>
                )}
              </div>
              <h1 className="font-bold text-3xl">{user.name}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: replaceToAnchor(
                    replaceToBr(user.description),
                    'text-blue-500'
                  ),
                }}
              />
            </div>
            <div>
              <button
                className="border border-blue-500 py-2 px-4 rounded-xl text-blue-500"
                onClick={() => setIsReplyModalShown(true)}
              >
                <span className="flex items-center space-x-2">
                  <ReplyIcon className="w-4 h-4" />
                  <span>このユーザーに返信する</span>
                </span>
              </button>
            </div>
            <div className="space-y-4 md:space-y-8">
              {texts?.map((t: Text, i: number) => (
                <TextListItem key={i} text={t} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PostModal
        shown={isReplyModalShown}
        hide={() => setIsReplyModalShown(false)}
        toUser={user}
      />
    </>
  )
}

export default UserPage
