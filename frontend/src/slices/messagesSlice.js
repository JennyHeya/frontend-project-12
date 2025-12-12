import { createSlice } from '@reduxjs/toolkit';
import { addChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addChannel, (state, action) => {
      // можно добавить приветственное сообщение, но не обязательно
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer
