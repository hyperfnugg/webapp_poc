# Project conventions

## Plans

Multi-step work lives in `plans/active/<kebab-name>.md`. Each plan has scope, out-of-scope, steps, ownership, and a done-when.

- **Read the plan at the start of a session** and do not preload plans you aren't working on.
- **Steps are checkboxes** (`- [ ]` / `- [x]`). Tick each step off as it lands. Steps must use `- [ ]` bullet form, not numbered lists (GitHub only renders checkboxes on bullets).
- **Plans are living documents.** Add, remove, rewrite, or resplit steps as understanding changes — the plan reflects current reality, not original intent. Don't preserve obsolete steps just because they were written down.
- **Commits are per-step or per-coherent-chunk**, not one commit per plan. A plan will typically span several commits.
- **When the plan is complete**, `git mv plans/active/<name>.md plans/done/<name>.md` in its own commit (or bundled with the final step if small).
- One plan per milestone. Don't accumulate tiny TODOs here — those belong in conversation or a commit.
- Don't duplicate plan content in `README.md` or this file.

## Style

- Inline styles in components. No CSS framework, no animations, no transitions, no icon library.
- React + TypeScript + Vite frontend; Firebase (Auth, Firestore, AI Logic / Gemini) backend. Full stack in `README.md`.
- Keep new code minimal — this is a POC. Don't add abstractions for hypothetical future needs.