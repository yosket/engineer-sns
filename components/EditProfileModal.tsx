import classNames from 'classnames'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { useProfile } from '../hooks/useUser'
import { getUsersUrl, getUserUrl, postUserUrl } from '../lib/fetcher'
import Modal from './ui/Modal'

type FormData = {
  name: string
  description: string
}

type Props = {
  shown: boolean
  hide: () => void
}

const EditProfileModal: FC<Props> = ({ shown, hide }) => {
  const profile = useProfile()
  const isRegistered = !!profile

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' })

  useEffect(() => {
    setValue('name', profile.name)
    setValue('description', profile.description)
  }, [setValue, profile.name, profile.description])

  const onSubmit = async ({ name, description }: FormData) => {
    try {
      await fetch(postUserUrl(), {
        method: isRegistered ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      })
      await Promise.all([mutate(getUserUrl(profile.id)), mutate(getUsersUrl())])
      hide()
    } catch (e) {
      alert('エラーが発生しました')
    }
  }

  return (
    <Modal shown={shown} hide={hide} title="プロフィール登録・編集">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="w-full appearance-none border border-gray-200 rounded-xl p-2 align-top"
          placeholder="名前を入力"
          {...register('name', { required: true, maxLength: 30 })}
        />
        <textarea
          className="w-full appearance-none h-40 border border-gray-200 rounded-xl p-2 align-top"
          placeholder="自己紹介文を入力"
          {...register('description', { required: true, maxLength: 300 })}
        />
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex-1 p-2 text-gray-400 rounded-xl"
            onClick={hide}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className={classNames(
              'flex-1 text-white rounded-xl p-2',
              !isDirty || !isValid ? 'bg-gray-200' : 'bg-gradient-primary'
            )}
            disabled={!isDirty || !isValid}
          >
            登録・編集
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditProfileModal
