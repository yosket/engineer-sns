import { PencilIcon, PlusIcon } from '@heroicons/react/outline'
import cn from 'classnames'
import { FC } from 'react'

type Props = {
  onClick: () => void
  className?: string
}

const PostButton: FC<Props> = ({ onClick, className }) => {
  return (
    <button
      className={cn(
        className,
        'w-12 md:w-20 h-12 md:h-20 p-2.5 md:p-4 rounded-full bg-gradient-primary text-white shadow'
      )}
      onClick={onClick}
    >
      <PencilIcon className="w-full h-full -mt-1.5 md:-mt-2 -ml-1 md:-ml-1.5" />
      <PlusIcon className="w-4 md:w-8 h-4 md:h-8 absolute right-0 bottom-0 mr-2.5 md:mr-3 mb-2.5 md:mb-3" />
    </button>
  )
}

export default PostButton
