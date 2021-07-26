import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import TextListItem from '../components/TextListItem'
import { useTexts } from '../hooks/useText'
import { useAllUser } from '../hooks/useUser'
import { fetcher, getUsersUrl } from '../lib/fetcher'
import { Text, User } from '../models'

const LIMIT = 20

export const getStaticProps: GetStaticProps = async () => {
  const users: User[] = await fetcher(getUsersUrl())
  return { props: { users }, revalidate: 1 }
}

const HomePage: NextPage = ({
  users: usersInitialData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    data: textsData,
    error,
    size,
    setSize,
    isValidating,
  } = useTexts(LIMIT)
  const { data: users } = useAllUser({ initialData: usersInitialData })

  const texts = textsData ? ([] as Text[]).concat(...textsData) : ([] as Text[])
  const isLoadingInitialData = !textsData && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && textsData && typeof textsData[size - 1] === 'undefined')
  const isEmpty = textsData?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (textsData && textsData[textsData.length - 1]?.length < LIMIT)
  const isRefreshing = isValidating && textsData && textsData.length === size

  const loadMore = useCallback(async () => {
    if (isLoadingMore || isRefreshing) {
      return
    }
    await setSize(size + 1)
  }, [isLoadingMore, isRefreshing, size, setSize])

  const getUser = (id: string): User | undefined => {
    return users?.find((u) => u.id === id)
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-sm mx-auto">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={!isReachingEnd}
        loader={
          <div key={0} className="py-12 text-center">
            Loading ...
          </div>
        }
        className="space-y-4 md:space-y-8"
      >
        {texts?.map((t: Text) => (
          <TextListItem key={t.id} text={t} user={getUser(t._user_id)} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default HomePage
