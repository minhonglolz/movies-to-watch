import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button, useToast } from '@chakra-ui/react'
import { auth, database } from './firebase'
import { set, ref, get } from 'firebase/database'

export function ButtonGoogleLogin () {
  const toast = useToast()
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const userRef = ref(database, `users/${user.uid}`)
      const snapshot = await get(userRef)

      if (!snapshot.exists()) {
        await set(userRef, {
          username: user.displayName,
          profilePicture: user.photoURL
        })
      }

      toast({
        title: '登入成功',
        position: 'top-right',
        status: 'success',
        duration: 1000,
        isClosable: true
      })
    } catch (error) {
      console.error('Google 登入時出錯:', error)
      toast({
        title: '登入失敗',
        position: 'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true
      })
    }
  }

  return (
    <Button onClick={signInWithGoogle} variant={'unstyled'}>登入</Button>
  )
}
