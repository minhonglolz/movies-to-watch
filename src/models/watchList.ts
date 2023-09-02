import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type FirebaseMovie, type Movie } from '../types/Discoverd/Movies'

export interface WatchListState {
  watchList: FirebaseMovie[] | null
  watchListIdMap: Map<Movie['id'], FirebaseMovie> | null

}

const initialState: WatchListState = {
  watchList: null,
  watchListIdMap: new Map()
}

export const watchList = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setWatchList: (state, action: PayloadAction<WatchListState['watchList']>) => {
      state.watchList = action.payload?.sort((a, b) => a.sort - b.sort) ?? null

      state.watchListIdMap = action.payload?.reduce<Map<Movie['id'], FirebaseMovie>>((acc, prev) => {
        return acc.set(prev.id, prev)
      }, new Map()) ?? new Map()
    },
    clearWatchList: (state) => {
      state.watchList = initialState.watchList
      state.watchListIdMap = initialState.watchListIdMap
    },
    setMovieSort: (state, action: PayloadAction<{ id: FirebaseMovie['id'], sort: FirebaseMovie['sort'] }>) => {
      const draft = state.watchList?.find(({ id }) => id === action.payload.id)
      if (!draft) return
      draft.sort = action.payload.sort
    }
  }
})

export const { setWatchList, clearWatchList, setMovieSort } = watchList.actions

export default watchList.reducer
