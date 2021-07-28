import useSWR, {
  SWRConfiguration,
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
  SWRResponse,
  useSWRInfinite,
} from 'swr'
import { getTextsUrl, getUserTextsUrl } from '../lib/fetcher'
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

export const useTextsByUserId = (
  userId: string,
  options: SWRInfiniteConfiguration = {}
): SWRResponse<Text[], Error> => {
  return useSWR(userId ? getUserTextsUrl(userId) : null, options)
}
