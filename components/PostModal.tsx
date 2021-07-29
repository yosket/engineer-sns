import classNames from 'classnames'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import Modal from '../components/ui/Modal'
import { getTextsUrl, postTextsUrl } from '../lib/fetcher'
import { User } from '../models'

type FormData = {
  text: string
  in_reply_to_user_id?: string
}

type Props = {
  shown: boolean
  hide: () => void
  toUser?: User
}

const PostModal: FC<Props> = ({ shown, hide, toUser }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' })

  if (toUser) {
    setValue('in_reply_to_user_id', toUser.id)
  }

  const title = toUser ? `${toUser.name} への返信` : '投稿'

  const onSubmit = async (data: FormData) => {
    try {
      await fetch(postTextsUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'HelloWorld',
        },
        body: JSON.stringify(data),
      })
      await mutate(getTextsUrl())
      hide()
    } catch (e) {
      alert('エラーが発生しました')
    }
  }

  return (
    <Modal shown={shown} hide={hide} title={title}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="w-full appearance-none h-40 border border-gray-200 rounded-xl p-2 align-top"
          placeholder="投稿する文章を入力"
          {...register('text', {
            required: true,
            minLength: 1,
            maxLength: 280,
          })}
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
            投稿
          </button>
        </div>
        {!!toUser && (
          <input
            type="hidden"
            {...register('in_reply_to_user_id')}
            className="hidden"
          />
        )}
      </form>
    </Modal>
  )
}

export default PostModal
