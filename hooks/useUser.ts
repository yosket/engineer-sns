import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getUsersUrl, getUserUrl } from '../lib/fetcher'
import { User } from '../models'

export const STORAGE_KEY = 'sofeap:profile'

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

export const useMe = (
  options: SWRConfiguration = {}
): SWRResponse<User, Error> => {
  return useSWR(
    () => {
      if (!process.browser) {
        return null
      }
      const str = localStorage.getItem(STORAGE_KEY)
      const storage = JSON.parse(str ?? '{}')
      if (!storage.id) {
        return null
      }
      return getUserUrl(storage.id)
    },
    {
      ...options,
      onSuccess: (me) => {
        const str = localStorage.getItem(STORAGE_KEY)
        const storage = JSON.parse(str ?? '{}')
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...storage, id: me.id })
        )
      },
    }
  )
}

export const useIpData = (
  options: SWRConfiguration = {}
): SWRResponse<{ ip: string }, Error> => {
  return useSWR(
    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_INFO_TOKEN}`,
    {
      ...options,
      revalidateOnFocus: false,
      onSuccess: (ipData) => {
        const str = localStorage.getItem(STORAGE_KEY)
        let storage = JSON.parse(str ?? '{}')
        if (storage?.ip !== ipData.ip) {
          alert('IPアドレスが変わりました')
          storage = {}
        }
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...storage, ip: ipData.ip })
        )
      },
    }
  )
}
