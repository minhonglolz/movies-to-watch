import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type FirebaseMovie, type Movie } from '../types/Discoverd/Movies'

export interface WatchListState {
  watchList: FirebaseMovie[] | null
  watchListIdSet: Set<Movie['id']> | null
}

const initialState: WatchListState = {
  watchList: null,
  watchListIdSet: new Set()
}

export const watchList = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWatchList: (state, action: PayloadAction<WatchListState['watchList']>) => {
      state.watchList = action.payload
      state.watchListIdSet = action.payload?.reduce<Set<Movie['id']>>((acc, prev) => {
        return acc.add(prev.id)
      }, new Set()) ?? new Set()
    },
    clearWatchList: (state) => {
      state.watchList = initialState.watchList
      state.watchListIdSet = initialState.watchListIdSet
    }
  }
})

export const { setWatchList, clearWatchList } = watchList.actions

export default watchList.reducer
