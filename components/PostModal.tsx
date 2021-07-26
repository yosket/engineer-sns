import { FC, useState } from 'react'
import { mutate } from 'swr'
import Modal from '../components/ui/Modal'
import { getTextsUrl, postTextsUrl } from '../lib/fetcher'

type Props = {
  shown: boolean
  hide: () => void
}

const PostModal: FC<Props> = ({ shown, hide }) => {
  const [postText, setPostText] = useState<string>('')

  const post = async () => {
    try {
      await fetch(postTextsUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'HelloWorld',
        },
        body: JSON.stringify({ text: postText }),
      })
      await mutate(getTextsUrl())
      hide()
      setPostText('')
    } catch (e) {
      alert('エラーが発生しました')
    }
  }

  return (
    <Modal
      shown={shown}
      hide={hide}
      title="投稿"
      footerButtons={[
        <button
          key="cancel"
          className="flex-1 p-2 text-gray-400 rounded-xl"
          onClick={hide}
        >
          キャンセル
        </button>,
        <button
          key="post"
          className="flex-1 bg-gradient-primary text-white rounded-xl p-2"
          onClick={post}
        >
          投稿
        </button>,
      ]}
    >
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value.trim())}
        autoFocus
        className="w-full appearance-none h-40 border border-gray-200 rounded-xl p-2"
        placeholder="投稿する文章を入力"
      />
    </Modal>
  )
}

export default PostModal
