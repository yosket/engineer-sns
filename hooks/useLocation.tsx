import { useEffect, useState } from 'react'

export const useLocationOrigin = () => {
  const [origin, setOrigin] = useState<string>('')
  useEffect(() => setOrigin(window.location.origin), [])
  return origin
}
