import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { clearWatchList } from '../models/watchList'
import { useToast } from './useToast'

interface Auth {
  name: string | null
  photoURL: string | null
  uid: string | null
}

export function useAuthState () {
  const [googleAuth, setGoogleAuth] = useState<Auth>()
  const [isLoaded, setIsLoaded] = useState(false)
  const { showErrorToast, showSuccessToast } = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoaded(false)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleAuth({
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL
        })
      } else {
        setGoogleAuth(undefined)
      }
      setIsLoaded(true)
    })
    return unsubscribe
  }, [])

  const signOut = async () => {
    try {
      await auth.signOut()
      showSuccessToast('登出成功')
      dispatch(clearWatchList())
    } catch (error) {
      console.warn(error)
      showErrorToast('登出失敗')
    }
  }

  return { googleAuth, signOut, isLoaded }
}
