---
last_reviewed: 2025-12-28
---

# Technical Context

Stacks & Tooling

- Frontend: Next.js App Router (React 19), TypeScript, SCSS modules.
- Backend: Node.js + Express 5, TypeScript, in-memory data store.
- Tooling: Vitest + Testing Library for frontend tests; ESLint + Stylelint for
  linting.

Constraints

- No root workspace package. Install and run scripts inside `client-website` or
  `node-server`.
- `@/` path alias maps to `src/*` in the client; backend keeps imports simple.
- Keep changes small and localized to support beginner exercises.

Environment

- Backend uses `PORT` (defaults to `3001`).
- Frontend uses `NEXT_PUBLIC_API_URL` to point at the API
  (defaults to `http://localhost:3001`).
- CSS module types are generated into `client-website/__generated__/src` via
  `npm run gen:css-types` when needed.

Entrypoints

- Client: `client-website/src/app/page.tsx` (public landing) and
  `client-website/src/app/**/page.tsx` routes.
- Server: `node-server/src/index.ts` (Express app).

Where To Look First

- Frontend pages: `client-website/src/app`
- Frontend sections/components: `client-website/src/sections`,
  `client-website/src/app/components`
- Backend routes: `node-server/src/index.ts`
- Backend data/services: `node-server/src/data`, `node-server/src/services`

Codebase Map

- `client-website`: Next.js app, sections, components, styles.
- `node-server`: Express API, in-memory data store, and small service helpers.

Task Recipes

- Fix frontend bug: locate route in `client-website/src/app`, update component
  logic/styles, run `npm run lint` or `npm run test` in `client-website`.
- Add frontend component: create a component in `client-website/src/sections`
  or `client-website/src/app/components`, then import into a page.
- Fix backend bug: locate handler in `node-server/src/handlers`, update logic,
  run `npm run test` in `node-server`.
- Add backend endpoint: add handler in `node-server/src/handlers`, wire the
  route in `node-server/src/index.ts`, and reuse existing services as needed.
