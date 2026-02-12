import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice } from '@reduxjs/toolkit'

import socket from '../api/socket'

const defaultChannelId = '1'
const initialState = {
  activeChannelId: defaultChannelId,
}

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('userId'))
      if (token) {
        headers.set('Authorization', `Bearer ${token.token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded
          socket.on('newChannel', (channel) => {
            updateCachedData((draft) => {
              draft.push(channel)
            })
          })
          socket.on('removeChannel', (channel) => {
            updateCachedData(draft => draft.filter(item => item.id !== channel.id))
          })
          socket.on('renameChannel', (channel) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(({ id }) => id === channel.id)
              draft[index].name = channel.name
            })
          })
        }
        catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
        if (socket) socket.close()
      },
    }),
    addChannel: builder.mutation({
      query: message => ({
        url: 'channels',
        method: 'POST',
        body: message,
      }),
    }),
    removeChannel: builder.mutation({
      query: message => ({
        url: `channels/${message.id}`,
        method: 'DELETE',
        body: message,
      }),
    }),
    renameChannel: builder.mutation({
      query: message => ({
        url: `channels/${message.id}`,
        method: 'PATCH',
        body: message,
      }),
    }),
  }),
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeActiveChannel: (state, action) => {
      if (!action.payload) {
        state.activeChannelId = defaultChannelId
      }
      else {
        state.activeChannelId = action.payload
      }
    },
  },
})

export const { changeActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer

export const {
  useGetChannelsQuery, useAddChannelMutation, useRemoveChannelMutation, useRenameChannelMutation,
} = channelsApi
