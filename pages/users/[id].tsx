import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import { useUser } from '../../hooks/useUser'
import { fetcher, getUsersUrl, getUserUrl } from '../../lib/fetcher'
import { getBlockieImageUrl } from '../../lib/utils'
import { User } from '../../models'

const Image = dynamic(() => import('next/image'))

export const getStaticPaths: GetStaticPaths = async () => {
  const users: User[] = await fetcher(getUsersUrl())
  const paths = users
    .filter((u) => !!u.name)
    .map((u) => ({
      params: { id: u.id },
    }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const users: User = await fetcher(getUserUrl(params?.id as string))
  return { props: { users }, revalidate: 1 }
}

const HomePage: NextPage = ({
  user: userInitialData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { data: user } = useUser(router.query.id as string, {
    initialData: userInitialData,
  })

  if (!user) {
    return <></>
  }

  return (
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
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto">
        <div className="bg-white p-4 relative space-y-4">
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
          <p>{user.description}</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
