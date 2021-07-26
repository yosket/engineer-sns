export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const getTextsUrl = (offset: number = 0, limit: number = 20) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/text/all?$orderby=_created_at desc&$skip=${offset}&$limit=${limit}`

export const postTextsUrl = () => `${process.env.NEXT_PUBLIC_BASE_URL}/text`

export const getUsersUrl = () => `${process.env.NEXT_PUBLIC_BASE_URL}/user/all`

export const getUserUrl = (id: string) =>
  `${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`
