import useSWR, {
  SWRConfiguration,
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
  SWRResponse,
  useSWRInfinite,
} from 'swr'
import { getTextsUrl } from '../lib/fetcher'
import { Text } from '../models'

export const useAllText = (
  options: SWRConfiguration = {}
): SWRResponse<Text[], Error> => {
  return useSWR(getTextsUrl(), options)
}

export const useTexts = (
  limit: number,
  options: SWRInfiniteConfiguration = {}
): SWRInfiniteResponse<Text[], Error> => {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null
    return getTextsUrl(pageIndex * limit, limit)
  }, options)
}
