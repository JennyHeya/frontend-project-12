import { useContext } from 'react'

import { AuthContext, UiContext } from '../context'

const useAuth = () => useContext(AuthContext)
const useUiContext = () => useContext(UiContext)

export { useAuth, useUiContext }
