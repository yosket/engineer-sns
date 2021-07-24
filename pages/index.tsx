import { NextPage } from 'next'
import { useDayjs } from '../hooks/useDayjs'
import { useAllText } from '../hooks/useText'
import { Text } from '../models/Text'

const HomePage: NextPage = () => {
  const { data: allText } = useAllText()
  const dayjs = useDayjs()

  return (
    <div className="space-y-4 p-4">
      {allText?.map((t: Text) => (
        <article
          className="border border-gray-200 p-4 rounded space-y-4"
          key={t.id}
        >
          <p>{t.id}</p>
          <p>{t._user_id}</p>
          <p>{t.text}</p>
          <div className="flex justify-end space-x-4 text-xs text-gray-400">
            <p className="space-x-2">
              <span>投稿</span>
              <time>{dayjs(t._created_at).format('lll')}</time>
            </p>
            <p className="space-x-2">
              <span>最終更新</span>
              <time>{dayjs(t._updated_at).format('lll')}</time>
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default HomePage
