import useSWR, {
  SWRConfiguration,
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
  SWRResponse,
  useSWRInfinite,
} from 'swr'
import {
  getLikesUrl,
  getTextsUrl,
  getTextUrl,
  getUserTextsUrl,
} from '../lib/fetcher'
import { Text } from '../models'
import { Like } from '../models/Like'

export const useAllText = (
  options: SWRConfiguration = {}
): SWRResponse<Text[], Error> => {
  return useSWR(getTextsUrl(), options)
}

export const useText = (
  textId: string,
  options: SWRConfiguration = {}
): SWRResponse<Text, Error> => {
  return useSWR(textId ? getTextUrl(textId) : null, options)
}

export const useTexts = (
  limit: number = 20,
  options: SWRInfiniteConfiguration = {}
): SWRInfiniteResponse<Text[], Error> => {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null
    return getTextsUrl(pageIndex * limit, limit)
  }, options)
}

export const useTextsByUserId = (
  userId: string,
  options: SWRConfiguration = {}
): SWRResponse<Text[], Error> => {
  return useSWR(userId ? getUserTextsUrl(userId) : null, options)
}

export const useLikes = (
  options: SWRConfiguration = {}
): SWRResponse<Like[], Error> => {
  return useSWR(getLikesUrl(), options)
}

export const useLike = (
  textId: string,
  options: SWRConfiguration = {}
): SWRResponse<Like, Error> => {
  const res = useLikes(options)
  const like = res.data?.find((l) => l.id === textId)
  return { ...res, data: like } as SWRResponse<Like, Error>
}
