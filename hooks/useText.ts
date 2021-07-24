import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getTextsUrl } from '../lib/fetcher'
import { Text } from '../models'

export const useAllText = (
  options: SWRConfiguration = {}
): SWRResponse<Text[], Error> => {
  return useSWR(getTextsUrl(), options)
}
