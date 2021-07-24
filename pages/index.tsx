import { NextPage } from 'next'
import { useAllText } from '../hooks/useText'
import { Text } from '../models/Text'

const HomePage: NextPage = () => {
  const { data: allText } = useAllText()

  return (
    <div className="space-y-4 p-4">
      {allText?.map((t: Text) => (
        <article className="border border-gray-200 p-4 rounded" key={t.id}>
          <p>{t.id}</p>
          <p>{t.text}</p>
          <p>{t._created_at}</p>
          <p>{t._updated_at}</p>
          <p>{t._user_id}</p>
        </article>
      ))}
    </div>
  )
}

export default HomePage
