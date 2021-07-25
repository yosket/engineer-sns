import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import TextListItem from '../components/TextListItem'
import { useAllText } from '../hooks/useText'
import { useAllUser } from '../hooks/useUser'
import { fetcher, getTextsUrl, getUsersUrl } from '../lib/fetcher'
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

  const getUser = (id: string): User | undefined => {
    return users?.find((u) => u.id === id)
  }

  return (
    <div className="space-y-4 md:space-y-8 p-4 md:p-8 max-w-screen-sm mx-auto">
      {allText?.map((t: Text) => (
        <TextListItem key={t.id} text={t} user={getUser(t._user_id)} />
      ))}
    </div>
  )
}

export default HomePage
