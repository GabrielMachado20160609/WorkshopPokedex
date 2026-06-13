# AGENTS.md — Agent instructions for this repository

Purpose: give AI coding agents the minimal, high-value context they need to be productive in this Next.js + TypeScript workshop project.

Quick commands
- Install: `npm install`
- Dev (app): `npm run dev` (Next.js on http://localhost:3000)
- Build: `npm run build`
- Start prod: `npm run start`
- Tests: `npm test` (watch: `npm run test:watch`, coverage: `npm run test:coverage`)
- Serve workshop docs: `npm run serve-docs` (opens at http://localhost:4000/docs/)

What this repo is
- Minimal Next.js 15 + TypeScript Pokédex used for workshop exercises. See [README.md](README.md).
- App uses the Next App Router under `src/app/` and server components by default.

Key locations (link-first)
- App entry & pages: [src/app/](src/app/)
- API route used by the UI: [src/app/api/pokemon/route.ts](src/app/api/pokemon/route.ts)
- Network helpers: [src/lib/api.ts](src/lib/api.ts)
- Types/constants: [src/lib/types.ts](src/lib/types.ts), [src/lib/constants.ts](src/lib/constants.ts)
- UI components: [src/app/components/](src/app/components/)
- Workshop materials and docs: [workshop/](workshop/) and [docs/](docs/)

Useful notes for agents
- Use the App Router conventions: files under `src/app/` are routes and UI. Prefer editing components inside `src/app/components/`.
- Network fetch helpers live in `src/lib/api.ts` — reuse or adjust them instead of duplicating fetch logic.
- Image hosts are allowed from `raw.githubusercontent.com` (see `next.config.ts`).
- Styling uses Tailwind; global styles live in `src/app/globals.css`.
- Tests use Jest. Run `npm test` to execute unit tests.

Conventions & constraints
- Keep changes TypeScript-first. Prefer small, focused edits and add tests when behavior changes.
- Don't modify workshop lesson source in `workshop/` or the generated docs in `docs/` unless requested — link to them instead.
- Avoid committing large external assets; prefer remote image URLs already used by the project.

Where to look first for common tasks
- Implementing UI: `src/app/components/` + `src/app/page.tsx`
- API/logic: `src/lib/api.ts`, `src/lib/*`
- Add tests: mirror source file under `__tests__` or follow repo's existing test patterns.

Suggested agent customizations (next steps)
- A test-run hook that runs `npm test` and reports failures.
- A small code-mod prompt that adds typed props to new components.
- A documentation hook to auto-open `npm run serve-docs` when asked for workshop materials.

If anything is unclear or you want a different focus (frontend, API, tests), tell me which area to expand and I'll update this file.
