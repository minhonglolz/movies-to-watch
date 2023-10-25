import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button, type ButtonProps } from '@chakra-ui/react'
import { auth, database } from '../firebase/firebase'
import { set, ref, get } from 'firebase/database'
import { useToast } from '../hooks/useToast'

type Props = ButtonProps & {
  action?: () => void,
}

export function ButtonGoogleLogin ({ action, ...props }: Props) {
  const { showErrorToast, showSuccessToast } = useToast()
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const { uid, displayName, photoURL } = result.user
      const userRef = ref(database, `users/${uid}`)
      const snapshot = await get(userRef)

      if (!snapshot.exists()) {
        await set(userRef, {
          username: displayName,
          profilePicture: photoURL,
        })
      }
      showSuccessToast('登入成功')
    } catch (error) {
      console.error('Google 登入時出錯:', error)
      showErrorToast('登入失敗，請稍後再嘗試')
    } finally {
      action?.()
    }
  }

  return (
    <Button onClick={signInWithGoogle} variant="unstyled" {...props}>登入</Button>
  )
}
