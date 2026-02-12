import { useState, useMemo, useCallback } from 'react'
import { UiContext } from '../context'

import Chat from '../components/Chat'

const UiProvider = ({ children }) => {
  const [focusedInputRef, setFocusedInputRef] = useState('')

  const saveInputRef = useCallback(el => setFocusedInputRef(el), [])
  const setFocus = useCallback(() => {
    if (focusedInputRef) {
      focusedInputRef.focus()
    }
  }, [focusedInputRef])

  const refContext = useMemo(() => ({ saveInputRef, setFocus }), [saveInputRef, setFocus])

  return (
    <UiContext.Provider value={refContext}>
      {children}
    </UiContext.Provider>
  )
}

const ChatPage = () => (
  <UiProvider>
    <Chat />
  </UiProvider>
)

export default ChatPage
