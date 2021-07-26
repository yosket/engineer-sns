import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { useState } from 'react'
import PostButton from '../components/PostButton'
import PostModal from '../components/PostModal'
import TextList from '../components/TextList'
import { fetcher, getUsersUrl } from '../lib/fetcher'
import { User } from '../models'

export const getStaticProps: GetStaticProps = async () => {
  const users: User[] = await fetcher(getUsersUrl())
  return { props: { users }, revalidate: 1 }
}

const HomePage: NextPage = ({
  users: usersInitialData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isPostModalShown, setIsPostModalShown] = useState<boolean>(false)

  return (
    <div className="p-4 md:p-8 max-w-screen-sm mx-auto">
      <TextList usersInitialData={usersInitialData} />

      <PostButton
        onClick={() => setIsPostModalShown(true)}
        className="fixed bottom-0 right-0 m-4 md:m-8"
      />

      <PostModal
        shown={isPostModalShown}
        hide={() => setIsPostModalShown(false)}
      />
    </div>
  )
}

export default HomePage
