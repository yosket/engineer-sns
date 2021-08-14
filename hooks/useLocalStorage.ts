import { useCallback } from 'react'

export const useLocalStorage = (storageKey: string) => {
  const get = useCallback(() => {
    if (!process.browser) {
      return null
    }
    const str = localStorage.getItem(storageKey)
    if (!str) {
      return null
    }
    try {
      return JSON.parse(str)
    } catch (e) {
      return null
    }
  }, [storageKey])

  const set = useCallback(
    (data): void => {
      if (!process.browser) {
        return
      }
      localStorage.setItem(storageKey, JSON.stringify(data))
    },
    [storageKey]
  )

  return { get, set }
}
