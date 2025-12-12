import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload.channels
      state.currentChannelId = action.payload.currentChannelId
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload)
    },
     removeChannel: (state, action) => {
      const channelId = action.payload
      // РЈРґР°Р»СЏРµРј РєР°РЅР°Р» РёР· РјР°СЃСЃРёРІР°
      state.channels = state.channels.filter(channel => channel.id !== channelId)
      
      if (state.currentChannelId === channelId) {
        state.currentChannelId = state.channels[0]?.id || 1
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload
      const channel = state.channels.find(ch => ch.id === id)
      if (channel) {
        channel.name = name
      }
    },
  },
})

export const { 
  setChannels, 
  setCurrentChannel, 
  addChannel, 
  removeChannel,
  renameChannel
} = channelsSlice.actions

export default channelsSlice.reducer

