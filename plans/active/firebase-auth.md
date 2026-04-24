# Firebase Auth

Second milestone. Wire Firebase into the SPA and gate the app on Google sign-in. No Firestore, no allowlist, no shopping list data yet — just: signed out → sign-in screen, signed in → "signed in as X" placeholder.

## Scope

- Register a Firebase project and web app.
- Add the Firebase JS SDK to the app.
- Implement Google sign-in and sign-out.
- Render a sign-in screen when logged out and a minimal placeholder when logged in.

## Out of scope

- Family allowlist, Firestore, security rules.
- Shopping list UI and state.
- LLM integration.
- App Check (deferred until there's something worth protecting).

## Prerequisites (user)

- Firebase project created in the console.
- A web app registered in the project; Firebase web config noted.
- Google provider enabled in Authentication → Sign-in method.
- `hyperfnugg.github.io` added to Authentication → Settings → Authorized domains (hostname, no scheme, no path). `localhost` is on by default — keep it for dev.

## CI / deploy impact

No workflow changes needed. Firebase is a runtime dep bundled by Vite; web config is public-by-design and committed directly — no secrets, no env vars, no CI tweaks. The existing `deploy.yml` picks up the new dependency via `npm ci`.

## Steps

- [ ] **Set up Firebase project.** Create project, register web app, enable Google provider, add authorized domain. *(user)*
- [ ] **Install Firebase SDK.** `npm install firebase`.
- [ ] **Create `src/firebase.ts`** — single module, no premature split. Initialize the app with the web config (committed directly; public-by-design for web — security comes from rules and App Check). Export:
  - `auth` (the `Auth` instance)
  - `signInWithGoogle()` — uses `signInWithPopup` with `GoogleAuthProvider`. Default; fall back to `signInWithRedirect` only if a phone browser misbehaves.
  - `signOut()`
  - `useUser()` — hook wrapping `onAuthStateChanged` with `useState` / `useEffect`; returns `{ user, loading }` where `loading` is `true` until the first auth state callback fires.
- [ ] **Commit: initialize Firebase auth module.** *(auto)*
- [ ] **Gate the app on auth state.** In `App.tsx`, read `useUser()`:
  - `loading` → render nothing (avoids flashing the sign-in UI for already-signed-in users before Firebase reads the cached session).
  - `user === null` → sign-in screen: single "Sign in with Google" button. Inline styles.
  - `user` set → placeholder: `Signed in as <displayName>` and a "Sign out" button.
- [ ] **Commit: gate app on Google sign-in.** *(auto)*
- [ ] **Deploy and verify.** Push triggers the existing Pages workflow; sign in from a phone and a desktop, confirm auth persists across reloads and no sign-in-UI flash. *(user)*
- [ ] **Move plan to `plans/done/`.** `git mv plans/active/firebase-auth.md plans/done/firebase-auth.md`.
- [ ] **Commit: complete firebase-auth milestone.** *(auto)*

## Done when

- Unauthenticated users see only the sign-in screen; no network calls to Firestore.
- Any Google account can sign in (allowlist comes next milestone).
- Signed-in state persists across full page reloads.
- Sign-out returns to the sign-in screen.