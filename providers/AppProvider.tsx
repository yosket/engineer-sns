import { createContext, FC, useEffect, useReducer } from 'react'
import { useIpData, useUser } from '../hooks/useUser'
import { Profile } from '../models'

const STORAGE_KEY = 'sofeap:profile'

type StorageItem = {
  id: string
  ip: string
}

type State = {
  profile: Profile
}

export const ACTIONS = {
  SET: 'SET',
}

type Action = { type: typeof ACTIONS.SET; payload: Profile }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET:
      const { id, ip, name, description } = action.payload
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ id, ip } as StorageItem)
      )
      return { profile: { id, ip, name, description } }
    default:
      return state
  }
}

const initialState = { profile: { id: '', ip: '', name: '', description: '' } }

type ContextTypes = {
  state: State
  dispatch: (value: Action) => void
}

export const AppContext = createContext<ContextTypes>({
  state: initialState,
  dispatch: () => {},
})

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data: me } = useUser(state?.profile.id ?? '')
  const { data: ipData } = useIpData()

  useEffect(() => {
    if (me && ipData) {
      const { id, name, description } = me
      const { ip } = ipData
      dispatch({ type: ACTIONS.SET, payload: { id, ip, name, description } })
      return
    }

    const profileString = localStorage.getItem(STORAGE_KEY)
    if (profileString) {
      const profile = JSON.parse(profileString) as StorageItem
      dispatch({ type: ACTIONS.SET, payload: profile })
    }
  }, [me, ipData])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
