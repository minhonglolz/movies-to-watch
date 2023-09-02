import { get, query, orderByChild, equalTo, remove, child, limitToLast, push, update } from 'firebase/database'
import { type SortByUnion, type FirebaseMovie, type Movie } from '../types/Discoverd/Movies'
import { useToast } from './useToast'
import { useFirebase } from './useFirebase'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../store'
import dayjs from 'dayjs'

export function useWatchList () {
  const { watchList } = useSelector((state: RootState) => state.watchList)
  const { showErrorToast, showSuccessToast } = useToast()
  const { watchListRef, userRef } = useFirebase()
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
      showErrorToast('移除待看清單失敗，請稍後再嘗試')
    } finally {
      setIsLoading(false)
    }
  }

  const addWatchList = async (props: Omit<FirebaseMovie, 'sort'>) => {
    try {
      setIsLoading(true)
      const snapshot = (await get(query(watchListRef, orderByChild('sort'), limitToLast(1))))

      if (snapshot.exists()) {
        const last = Object.values(snapshot.val()).at(0) as FirebaseMovie
        const pushValue = { ...props, sort: last.sort + 1 }
        await push(watchListRef, pushValue)
      } else {
        const pushValue = { ...props, sort: 1 }
        await push(watchListRef, pushValue)
      }
      showSuccessToast('加入待看清單成功')
    } catch (error) {
      console.error('addWatchList Error:', error)
      showErrorToast('加入待看清單失敗')
    } finally {
      setIsLoading(false)
    }
  }

  const setMovieSort = async (id: FirebaseMovie['id'], sort: FirebaseMovie['sort']) => {
    try {
      setIsLoading(true)
      const snapshot = (await get(query(watchListRef, orderByChild('id'), equalTo(id))))
      const movie = Object.values(snapshot.val()).at(0) as FirebaseMovie | undefined
      const key = Object.keys(snapshot.val()).at(0)
      if (!key) return

      const updateMovie = { ...movie, sort }
      await update(child(watchListRef, key), updateMovie)
      showSuccessToast('排序成功')
    } catch (error) {
      console.error('addWatchList Error:', error)
      showErrorToast('排序失敗，請稍後再嘗試')
    } finally {
      setIsLoading(false)
    }
  }

  const movieListSortBy = (a: FirebaseMovie, b: FirebaseMovie, sortBy: SortByUnion) => {
    const by: Record<SortByUnion, number> = {
      'popularity.desc': b.popularity - a.popularity,
      'popularity.asc': a.popularity - b.popularity,
      'vote_average.desc': (b.voteAverage - a.voteAverage > 0) ? 1 : -1,
      'vote_average.asc': (a.voteAverage - b.voteAverage > 0) ? 1 : -1,
      'vote_count.desc': b.voteCount - a.voteCount,
      'vote_count.asc': a.voteCount - b.voteCount,
      'primary_release_date.desc': dayjs(b.releaseDate).isBefore(a.releaseDate) ? 1 : -1,
      'primary_release_date.asc': dayjs(a.releaseDate).isBefore(b.releaseDate) ? 1 : -1
    }
    return by[sortBy]
  }

  const sortMovieList = async (sortBy: SortByUnion) => {
    try {
      if (!watchList) return
      setIsLoading(true)

      const sortMovieList = [...watchList]
        .sort((a, b) => movieListSortBy(a, b, sortBy))
        .map((movie, index) => ({ ...movie, sort: index + 1 }))

      await update(userRef, { 'watch-list': sortMovieList })
      showSuccessToast('排序成功')
    } catch (error) {
      console.error('sortMovieList Error:', error)
      showErrorToast('排序失敗，請稍後再嘗試')
    } finally {
      setIsLoading(false)
    }
  }

  return { removeWatchList, addWatchList, setMovieSort, sortMovieList, isLoading }
}
