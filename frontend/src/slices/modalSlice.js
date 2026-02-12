import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  show: false,
  id: null,
  type: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.show = true
      state.id = action.payload.id
      state.type = action.payload.type
    },
    setClose: (state) => {
      state.show = false
      state.id = null
      state.type = null
    },
  },
})

export const { setOpen, setClose } = modalSlice.actions
export default modalSlice.reducer
