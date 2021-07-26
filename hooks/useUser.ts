import { useEffect, useState } from 'react'
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

export const USER_PROFILE_KEY = 'engineer-sns:profile'

export const useProfile = (): { name: string; description: string } | null => {
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    const string = localStorage.getItem(USER_PROFILE_KEY)
    if (!string) {
      return
    }
    const profile = JSON.parse(string)
    setProfile(profile)
  }, [])
  return profile
}
