import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { getUsersUrl, getUserUrl } from '../lib/fetcher'
import { User } from '../models'
import { useLocalStorage } from './useLocalStorage'

export const STORAGE_KEY = 'sofeap:profile'

export const useAllUser = (
  options: SWRConfiguration = {}
): SWRResponse<User[], Error> => {
  return useSWR(getUsersUrl(), { ...options, revalidateOnMount: false })
}

export const useUser = (
  id: string,
  options: SWRConfiguration = {}
): SWRResponse<User, Error> => {
  const { data: users } = useAllUser()
  return useSWR(
    id ? id : null,
    (id: string) => {
      return Promise.resolve(users?.find((u) => u.id === id))
    },
    options
  )
}

export const useMe = (
  options: SWRConfiguration = {}
): SWRResponse<User, Error> => {
  const { get, set } = useLocalStorage(STORAGE_KEY)
  return useSWR(
    () => {
      const storage = get()
      if (!storage.id) {
        return null
      }
      return getUserUrl(storage.id)
    },
    {
      ...options,
      onSuccess: (me) => {
        const storage = get()
        set({ ...storage, id: me.id })
      },
    }
  )
}

export const useIpData = (
  options: SWRConfiguration = {}
): SWRResponse<{ ip: string }, Error> => {
  const { get, set } = useLocalStorage(STORAGE_KEY)
  return useSWR(
    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_INFO_TOKEN}`,
    {
      ...options,
      revalidateOnFocus: false,
      onSuccess: (ipData) => {
        let storage = get()
        if (storage?.ip && storage?.ip !== ipData.ip) {
          console.info('IPアドレスが変わりました')
          storage = {}
        }
        set({ ...storage, ip: ipData.ip })
      },
    }
  )
}
