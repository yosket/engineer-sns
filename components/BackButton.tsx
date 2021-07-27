import { ArrowLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  href?: string
  className?: string
  iconClassName?: string
}

const BackButton: FC<Props> = ({ href = '/', className, iconClassName }) => {
  return (
    <Link href={href}>
      <a className={className}>
        <ArrowLeftIcon className={iconClassName} />
      </a>
    </Link>
  )
}

export default BackButton
