import useSWR, { SWRResponse } from 'swr'
import { Text } from '../models/Text'

const BASE_URL = 'https://versatileapi.herokuapp.com/api'

export const useAllText = (): SWRResponse<Text[], Error> => {
  return useSWR(`${BASE_URL}/text/all?$orderby=_created_at desc&$limit=20`)
}
