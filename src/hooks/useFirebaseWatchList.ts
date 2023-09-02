import { get, onValue, update } from 'firebase/database'
import { useCallback, useEffect } from 'react'
import { type WatchListState, setWatchList } from '../models/watchList'
import { useFirebase } from './useFirebase'
import { useDispatch } from 'react-redux'
import { type FirebaseMovie } from '../types/Discoverd/Movies'
import { getDecimalPlaces } from '../utils/number'

export function useFirebaseWatchList () {
  const { watchListRef, userRef } = useFirebase()
  const dispatch = useDispatch()

  const resetWatchListSort = useCallback(async () => {
    try {
      const snapshot = await get(watchListRef)
      const moveList: FirebaseMovie[] = Object.values(snapshot.val())
      const resetWatchList = moveList
        .sort((a, b) => a.sort - b.sort)
        .map((movie, index) => ({ ...movie, sort: index + 1 }))

      update(userRef, { 'watch-list': resetWatchList })
    } catch (error) {
      console.error('resetWatchListSort Error:', error)
    }
  }, [userRef, watchListRef])

  useEffect(() => {
    const unsubscribe = onValue(watchListRef, (snapshot) => {
      const watchList: WatchListState['watchList'] = []
      snapshot.forEach((childSnapshot) => {
        const movie: FirebaseMovie = childSnapshot.val()
        if (getDecimalPlaces(movie.sort) >= 10) {
          resetWatchListSort()
          return
        }
        watchList.push(movie)
      })
      dispatch(setWatchList(watchList))
    })

    return unsubscribe
  }, [dispatch, resetWatchListSort, watchListRef])
}
