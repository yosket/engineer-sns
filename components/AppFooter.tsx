import cn from 'classnames'
import { FC } from 'react'

type Props = {
  className?: string
}

const AppFooter: FC<Props> = ({ className }) => {
  return (
    <footer className={cn('py-2 px-4 text-center', className)}>
      <small className="text-gray-300 space-x-2">
        <span>&copy; 2021</span>
        <a
          href="http://twitter.com/yosket87"
          target="_blank"
          rel="noopener noreferrer"
        >
          @yosket87
        </a>
      </small>
    </footer>
  )
}

export default AppFooter
