import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { useToast } from '@chakra-ui/react'

interface Auth {
  name: string | null
  photoURL: string | null
}

export function useAuthState () {
  const [googleAuth, setGoogleAuth] = useState<Auth>()
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setIsLoaded(false)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setGoogleAuth({
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
      toast({
        title: '登出成功',
        position: 'top-right',
        status: 'success',
        duration: 1000,
        isClosable: true
      })
    } catch (error) {
      console.warn(error)
      toast({
        title: '登出失敗',
        position: 'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true
      })
    }
  }

  return { googleAuth, signOut, isLoaded }
}
