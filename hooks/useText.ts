import useSWR, { SWRResponse } from 'swr'
import { Text } from '../models/Text'

export const useAllText = (): SWRResponse<Text[], Error> => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/text/all?$orderby=_created_at desc&$limit=20`
  )
}
