import { configureStore } from '@reduxjs/toolkit'
import watchList from './models/watchList'

export const store = configureStore({
  reducer: {
    watchList
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
