# Hello World

First milestone. Proves the toolchain and deploy pipeline end-to-end. No Firebase yet — that's the next milestone.

## Scope

A React + TypeScript + Vite static SPA that renders literal "Hello, world", deployed automatically to GitHub Pages on every push to `main`.

## Out of scope

- Firebase Auth, Firestore, AI Logic.
- Family allowlist and security rules.
- Shopping list UI and logic.
- Custom domain.

## Prerequisites (user)

- GitHub repo exists, and its full name (`owner/repo`) is known.
- Deploy target is the default `https://<owner>.github.io/<repo>/` subpath.

## Steps

- [ ] **Verify GitHub remote.** Confirm `origin` points at the GitHub repo; fix or set if the upstream is gone. *(user)*
- [ ] **Scaffold project in repo root.** `npm create vite@latest . -- --template react-ts`, then `npm install`.
- [ ] **Write `.gitignore`.** Ignore `node_modules/`, `dist/`, `.idea/`, `.DS_Store`, `.env*`.
- [ ] **Configure Vite base path.** Set `base: '/<repo-name>/'` in `vite.config.ts` so assets resolve under the Pages subpath.
- [ ] **Replace `App.tsx` with "Hello, world".** Strip the Vite template. Inline styles. No logo, no counter, nothing else.
- [ ] **Delete template cruft.** `App.css`, `index.css`, `public/vite.svg`, `src/assets/`, React logo references.
- [ ] **Add GitHub Actions deploy workflow** at `.github/workflows/deploy.yml`. On push to `main`: checkout, setup Node, `npm ci`, `npm run build`, publish `dist/` via `actions/upload-pages-artifact` + `actions/deploy-pages`.
- [ ] **Enable Pages in repo settings.** Source = "GitHub Actions". One-time UI step. *(user)*
- [ ] **Commit and push.** Workflow runs; verify `https://<owner>.github.io/<repo>/` renders "Hello, world". *(user)*

## Done when

- Pushing to `main` triggers a successful Actions run.
- The Pages URL renders "Hello, world" with no console errors.
- `README.md` stack section still reflects reality (no drift).