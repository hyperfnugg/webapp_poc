import { useState, type FormEvent } from 'react'
import { type User } from 'firebase/auth'
import { signInWithGoogle, signOut, useUser } from './firebase'
import {
  addItem,
  removeItem,
  toggleItem,
  useAuthorized,
  useItems,
} from './items'

const centerStyle = {
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
  const { user, loading: userLoading } = useUser()
  const { authorized, loading: authLoading } = useAuthorized(user)

  if (userLoading) return null

  if (!user) {
    return (
      <main style={centerStyle}>
        <button style={buttonStyle} onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
      </main>
    )
  }

  if (authLoading) return null

  if (!authorized) {
    return (
      <main style={centerStyle}>
        <div>Not authorized — ask a family member to add your Google account.</div>
        <button style={buttonStyle} onClick={() => signOut()}>
          Sign out
        </button>
      </main>
    )
  }

  return <List user={user} />
}

function List({ user }: { user: User }) {
  const { items } = useItems()
  const [text, setText] = useState('')

  function onAdd(e: FormEvent) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    addItem(t)
    setText('')
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '1rem',
        width: 'min(100%, 32rem)',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#555',
        }}
      >
        <span>{user.displayName ?? user.email}</span>
        <button
          onClick={() => signOut()}
          style={{ ...buttonStyle, fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}
        >
          Sign out
        </button>
      </header>

      <form onSubmit={onAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add item"
          style={{ flex: 1, fontSize: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={buttonStyle}>
          Add
        </button>
      </form>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              opacity: item.checked ? 0.4 : 1,
              fontSize: '1.125rem',
            }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => toggleItem(item.id, e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: item.checked ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              aria-label="Remove"
              style={{ ...buttonStyle, padding: '0.25rem 0.5rem' }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
