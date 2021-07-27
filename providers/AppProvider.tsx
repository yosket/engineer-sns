import { createContext, FC, useEffect, useReducer } from 'react'
import { USER_PROFILE_KEY } from '../hooks/useUser'
import { Profile } from '../models'

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
      const { id, name, description } = action.payload
      return { profile: { id, name, description } }
    default:
      return state
  }
}

const initialState = { profile: { id: '', name: '', description: '' } }

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

  useEffect(() => {
    const profileString = localStorage.getItem(USER_PROFILE_KEY)
    if (profileString) {
      const profile = JSON.parse(profileString)
      dispatch({ type: ACTIONS.SET, payload: profile })
    }
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
