export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getTextsUrl = () =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/text/all?$orderby=_created_at desc&$limit=20`

export const getUsersUrl = () => `${process.env.NEXT_PUBLIC_BASE_URL}/user/all`