import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getUsersUrl } from '../lib/fetcher'
import { User } from '../models'

export const useAllUser = (
  options: SWRConfiguration = {}
): SWRResponse<User[], Error> => {
  return useSWR(getUsersUrl(), options)
}
