import { useContext } from 'react'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getUsersUrl, getUserUrl } from '../lib/fetcher'
import { Profile, User } from '../models'
import { AppContext } from '../providers/AppProvider'

export const useAllUser = (
  options: SWRConfiguration = {}
): SWRResponse<User[], Error> => {
  return useSWR(getUsersUrl(), options)
}

export const useUser = (
  id: string,
  options: SWRConfiguration = {}
): SWRResponse<User, Error> => {
  return useSWR(id ? getUserUrl(id) : null, options)
}

export const USER_PROFILE_KEY = 'engineer-sns:profile'

export const useProfile = (): Profile => {
  const { state } = useContext(AppContext)
  const { profile } = state
  return profile
}
