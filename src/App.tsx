import { signInWithGoogle, signOut, useUser } from './firebase'

const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  fontFamily: 'system-ui, sans-serif',
  fontSize: '1.25rem',
} as const

const buttonStyle = {
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
}

export default function App() {
  const { user, loading } = useUser()

  if (loading) return null

  if (!user) {
    return (
      <main style={pageStyle}>
        <button style={buttonStyle} onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
      </main>
    )
  }

  return (
    <main style={pageStyle}>
      <div>Signed in as {user.displayName ?? user.email}</div>
      <button style={buttonStyle} onClick={() => signOut()}>
        Sign out
      </button>
    </main>
  )
}
