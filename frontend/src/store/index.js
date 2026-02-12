import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../slices/modalSlice'
import { messagesApi } from '../slices/messagesSlice'
import channelsReducer, { channelsApi } from '../slices/channelsSlice'

export default configureStore({
  reducer: {
    channels: channelsReducer,
    modal: modalReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat([messagesApi.middleware, channelsApi.middleware]),
})
