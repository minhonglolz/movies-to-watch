import { onValue } from 'firebase/database'
import { useEffect } from 'react'
import { type WatchListState, setWatchList } from '../models/watchList'
import { useFirebase } from './useFirebase'
import { useDispatch } from 'react-redux'

export function useFirebaseWatchList () {
  const { watchListRef } = useFirebase()
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onValue(watchListRef, (snapshot) => {
      const watchList: WatchListState['watchList'] = []
      snapshot.forEach((childSnapshot) => {
        watchList.push(childSnapshot.val())
      })
      dispatch(setWatchList(watchList))
    })

    return unsubscribe
  }, [dispatch, watchListRef])
}
