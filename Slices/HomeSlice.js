import { createSlice } from '@reduxjs/toolkit'

export const videoHomeSlice = createSlice({
  name: 'videoHome',
  initialState: null,
  reducers: {
    setUri: (state, action) => {
      return action.payload
    }
  }
})

export const { setUri } = videoHomeSlice.actions

export default videoHomeSlice.reducer