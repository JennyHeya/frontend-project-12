import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import socket from '../api/socket'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded
          socket.on('newMessage', (message) => {
            updateCachedData((draft) => {
              draft.push(message)
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
    sendMessage: builder.mutation({
      query: message => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi
