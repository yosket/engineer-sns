import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { useLocationOrigin } from '../hooks/useLocation'

type Props = {
  children?: ReactNode
  title?: string
  description?: string
  imageUrl?: string
  article?: boolean
  smallImage?: boolean
}

const AppHead: FC<Props> = ({
  children,
  title,
  description,
  imageUrl,
  article,
  smallImage,
}) => {
  const locationOrigin = useLocationOrigin()

  return (
    <Head>
      {title && <title key="title">{title}</title>}

      {description && (
        <meta name="description" content={description} key="description" />
      )}

      <meta
        property="og:type"
        content={article ? 'article' : 'website'}
        key="og:type"
      />

      {title && <meta property="og:title" content={title} key="og:title" />}

      {description && (
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
      )}

      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="og:image" />
      )}

      <meta property="og:url" content={locationOrigin} key="og:url" />

      {title && (
        <meta property="og:site_name" content={title} key="og:site_name" />
      )}

      <meta
        name="twitter:card"
        content={smallImage ? 'summary' : 'summary_large_image'}
        key="twitter:card"
      />

      {title && <meta name="twitter:site" content={title} key="twitter:site" />}

      {children}
    </Head>
  )
}

export default AppHead
