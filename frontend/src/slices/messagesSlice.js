import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    sendingStatus: 'idle', // idle | pending | success | failed
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setSendingStatus: (state, action) => {
      state.sendingStatus = action.payload
    },
  },
})

export const { setMessages, addMessage, setSendingStatus } = messagesSlice.actions
export default messagesSlice.reducer

