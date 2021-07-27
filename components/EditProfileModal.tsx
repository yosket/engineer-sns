import { FC, useEffect, useState } from 'react'
import { mutate } from 'swr'
import { useProfile, USER_PROFILE_KEY } from '../hooks/useUser'
import { getUsersUrl, getUserUrl, postUserUrl } from '../lib/fetcher'
import Modal from './ui/Modal'

type Props = {
  shown: boolean
  hide: () => void
}

const EditProfileModal: FC<Props> = ({ shown, hide }) => {
  const profile = useProfile()
  const isRegistered = !!profile
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    if (!profile) {
      return
    }
    setName(profile.name)
    setDescription(profile.description)
  }, [profile])

  const post = async () => {
    try {
      const res = await fetch(postUserUrl(), {
        method: isRegistered ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
      const { id } = await res.json()
      localStorage.setItem(
        USER_PROFILE_KEY,
        JSON.stringify({ id, name, description })
      )
      await Promise.all([mutate(getUserUrl(id)), mutate(getUsersUrl())])
      hide()
      setName('')
      setDescription('')
    } catch (e) {
      alert('エラーが発生しました')
    }
  }

  return (
    <Modal
      shown={shown}
      hide={hide}
      title="プロフィール登録・編集"
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
          登録・編集
        </button>,
      ]}
    >
      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          autoFocus
          className="w-full appearance-none border border-gray-200 rounded-xl p-2"
          placeholder="名前を入力"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.trim())}
          className="w-full appearance-none h-40 border border-gray-200 rounded-xl p-2"
          placeholder="自己紹介文を入力"
        />
      </div>
    </Modal>
  )
}

export default EditProfileModal
