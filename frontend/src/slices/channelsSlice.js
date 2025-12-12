import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // дальше будут removeChannel, renameChannel — но пока не нужны
  },
});

export const { setChannels, setCurrentChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer
