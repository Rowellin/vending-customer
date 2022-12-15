import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  'videoHomeLn': null,
  'videoHomePt': null,
};

export const videoHomeSlice = createSlice({
  name: 'videoHome',
  initialState,
  reducers: {
    setUri: (state, action) => {
      if (action.payload.type == 'ln_video') {
        return {
          ...state,
          videoHomeLn: action.payload.value
        }
      } else if (action.payload.type == 'pt_video') {
        return {
          ...state,
          videoHomePt: action.payload.value
        }
      } else {
        return initialState;
      }
    }
  }
})

export const { setUri } = videoHomeSlice.actions

export default videoHomeSlice.reducer