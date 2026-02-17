import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../store/slices/modalSlice'
import { messagesApi } from '../store/slices/messagesSlice'
import channelsReducer, { channelsApi } from '../store/slices/channelsSlice'

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
