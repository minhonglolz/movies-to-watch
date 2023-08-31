import { get, query, orderByChild, equalTo, remove, child, limitToLast, push } from 'firebase/database'
import { type FirebaseMovie, type Movie } from '../types/Discoverd/Movies'
import { useToast } from './useToast'
import { useFirebase } from './useFirebase'
import { useState } from 'react'

export function useWatchList () {
  const { showErrorToast, showSuccessToast } = useToast()
  const { watchListRef } = useFirebase()
  const [isLoading, setIsLoading] = useState(false)

  const removeWatchList = async (id: Movie['id']) => {
    try {
      setIsLoading(true)
      const snapshot = (await get(query(watchListRef, orderByChild('id'), equalTo(id))))
      const key = Object.keys(snapshot.val()).at(0)
      if (!key) return
      await remove(child(watchListRef, key))
      showSuccessToast('移除待看清單成功')
    } catch (error) {
      console.error('removeWatchList Error:', error)
      showErrorToast('移除待看清單失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const addWatchList = async (props: Omit<FirebaseMovie, 'sort'>) => {
    try {
      setIsLoading(true)
      const snapshot = (await get(query(watchListRef, orderByChild('sort'), limitToLast(1))))
      const last = Object.values(snapshot.val()).at(0) as FirebaseMovie | undefined

      const pushValue = { ...props, sort: last ? last.sort + 1 : 1 }

      await push(watchListRef, pushValue)
      showSuccessToast('加入待看清單成功')
    } catch (error) {
      console.error('addWatchList Error:', error)
      showErrorToast('加入待看清單失敗')
    } finally {
      setIsLoading(false)
    }
  }

  return { removeWatchList, addWatchList, isLoading }
}
