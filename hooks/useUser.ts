import useSWR, { SWRResponse } from 'swr'
import { User } from '../models'

export const useAllUser = (): SWRResponse<User[], Error> => {
  return useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/user/all`)
}
