import { configureStore } from '@reduxjs/toolkit'
import videoHomeReducer from './Slices/HomeSlice'

export default configureStore({
  reducer: {
    videoHome: videoHomeReducer
  }
})