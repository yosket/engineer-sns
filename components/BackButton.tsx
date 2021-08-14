import { ArrowLeftIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

type Props = {
  href?: string
  className?: string
  iconClassName?: string
  children?: ReactNode
}

const BackButton: FC<Props> = ({
  href = '/',
  className,
  iconClassName,
  children,
}) => {
  return (
    <Link href={href}>
      <a
        className={classNames(className, 'flex items-center space-x-2 text-sm')}
      >
        <ArrowLeftIcon className={iconClassName} />
        <span>{children}</span>
      </a>
    </Link>
  )
}

export default BackButton
