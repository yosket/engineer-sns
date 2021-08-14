import classNames from 'classnames'
import { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../components/ui/Modal'
import { useTexts } from '../hooks/useText'
import { postTextsUrl } from '../lib/fetcher'
import { Text, User } from '../models'

type FormData = {
  text: string
  in_reply_to_user_id?: string
  in_reply_to_text_id?: string
}

type Props = {
  shown: boolean
  hide: () => void
  toUser?: User
  toText?: Text
}

const PostModal: FC<Props> = ({ shown, hide, toUser, toText }) => {
  const { mutate: mutateTexts } = useTexts()
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
    setValue,
  } = useForm<FormData>({ mode: 'onChange' })

  if (toUser) {
    setValue('in_reply_to_user_id', toUser.id)
  }

  if (toText) {
    setValue('in_reply_to_text_id', toText.id)
  }

  const title = useMemo(() => {
    if (toUser) {
      return `${toUser.name} への返信`
    }
    if (toText) {
      return '返信'
    }
    return '投稿'
  }, [toText, toUser])

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
      await mutateTexts()
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
              !isDirty || !isValid || isSubmitting
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-gradient-primary'
            )}
            disabled={!isDirty || !isValid || isSubmitting}
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
        {!!toText && (
          <input
            type="hidden"
            {...register('in_reply_to_text_id')}
            className="hidden"
          />
        )}
      </form>
    </Modal>
  )
}

export default PostModal
