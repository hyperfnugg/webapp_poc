import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyAEAvJBBvR8i7DGtpcGhlc0YmcIC1_kuys',
  authDomain: 'kraftigere.firebaseapp.com',
  projectId: 'kraftigere',
  storageBucket: 'kraftigere.firebasestorage.app',
  messagingSenderId: '934401063813',
  appId: '1:934401063813:web:d54a68e4205017e9a2e2ec',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
}

export function signOut() {
  return firebaseSignOut(auth)
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}
