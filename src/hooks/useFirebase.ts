import { ref } from 'firebase/database'
import { database } from '../firebase/firebase'
import { useAuthState } from './useAuthState'

export function useFirebase () {
  const { googleAuth } = useAuthState()

  const watchListRef = ref(database, `users/${googleAuth?.uid}/watch-list`)
  const userRef = ref(database, `users/${googleAuth?.uid}`)

  return { watchListRef, userRef }
}
