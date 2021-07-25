import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getUsersUrl, getUserUrl } from '../lib/fetcher'
import { User } from '../models'

export const useAllUser = (
  options: SWRConfiguration = {}
): SWRResponse<User[], Error> => {
  return useSWR(getUsersUrl(), options)
}

export const useUser = (
  id: string,
  options: SWRConfiguration = {}
): SWRResponse<User, Error> => {
  return useSWR(getUserUrl(id), options)
}
