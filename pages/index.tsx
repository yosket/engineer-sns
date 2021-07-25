import { ClockIcon } from '@heroicons/react/outline'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { useDayjs } from '../hooks/useDayjs'
import { useAllText } from '../hooks/useText'
import { useAllUser } from '../hooks/useUser'
import { fetcher, getTextsUrl, getUsersUrl } from '../lib/fetcher'
import { getBlockieImageUrl } from '../lib/utils'
import { Text, User } from '../models'

export const getStaticProps: GetStaticProps = async () => {
  const texts: Text[] = await fetcher(getTextsUrl())
  const users: User[] = await fetcher(getUsersUrl())
  return { props: { texts, users }, revalidate: 1 }
}

const HomePage: NextPage = ({
  texts: textsInitialData,
  users: usersInitialData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: allText } = useAllText({ initialData: textsInitialData })
  const { data: users } = useAllUser({ initialData: usersInitialData })
  const dayjs = useDayjs()

  const getUser = (id: string): User | undefined => {
    return users?.find((u) => u.id === id)
  }

  return (
    <div className="space-y-4 md:space-y-8 p-4 md:p-8">
      {allText?.map((t: Text) => (
        <article
          className="border border-gray-200 p-4 rounded-xl space-y-4"
          key={t.id}
        >
          <div className="flex items-center space-x-4">
            {process.browser && (
              <Image
                src={getBlockieImageUrl(t._user_id)}
                width={40}
                height={40}
                alt={getUser(t._user_id)?.name}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
            )}
            <p className="grid flex-1">
              <span className="truncate">
                {getUser(t._user_id)?.name ?? t._user_id}
              </span>
              <small className="text-gray-400 truncate">{t._user_id}</small>
            </p>
          </div>
          <p className="break-all">{t.text}</p>
          <p className="text-xs text-gray-400 flex justify-end items-center space-x-2">
            <ClockIcon className="w-4 h-4" />
            <time>{dayjs(t._created_at).format('lll')}</time>
          </p>
        </article>
      ))}
    </div>
  )
}

export default HomePage
