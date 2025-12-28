---
last_reviewed: 2025-12-28
---

# Technical Context

Stacks & Tooling

- Frontend: Next.js App Router (React 19), TypeScript, SCSS modules, Zustand,
  TanStack Query, React Hook Form, Framer Motion.
- Backend: Node.js + Express 5, TypeScript, Zod
  via `@packages/backend-core`, JWT utilities.
- Tooling: Vitest for tests, ESLint and Stylelint for linting.

Constraints

- No root workspace package. Install and run scripts inside `client-website` or
  `node-server`.
- `@/` path alias maps to `src/*` in both apps; avoid unnecessary relative
  import churn.
- Keep changes small and localized to support beginner exercises.

Environment

- Backend uses dotenvx to load `.env.dev` / `.env.production`. Common variables
  include `PORT`, `JWT_SECRET`, and `PEPPER`.
- Frontend uses the Next dev server and does not require env vars for basic
  pages.
- CSS module types are generated into `client-website/__generated__/src` via
  `npm run gen:css-types` when needed.

Entrypoints

- Client: `client-website/src/app/page.tsx` (public landing) and
  `client-website/src/app/**/page.tsx` routes.
- Server: `node-server/src/index.ts` (Express app) and
  `node-server/src/lambda.ts` (serverless wrapper).

Where To Look First

- Frontend pages: `client-website/src/app`
- Frontend sections/components: `client-website/src/sections`,
  `client-website/src/app/components`
- Frontend hooks/state: `client-website/src/hooks`, `client-website/src/stores`
- Backend routes: `node-server/src/index.ts`
- Backend handlers/services: `node-server/src/handlers`,
  `node-server/src/services`
- Backend middleware: `node-server/src/middleware`

Codebase Map

- `client-website`: Next.js app, hooks, providers, sections, stores, styles.
- `node-server`: Express API, handlers, middleware, services, tests under
  `src/__tests__`.

Task Recipes

- Fix frontend bug: locate route in `client-website/src/app`, update component
  logic/styles, run `npm run lint` or `npm run test` in `client-website`.
- Add frontend component: create a component in `client-website/src/sections`
  or `client-website/src/app/components`, then import into a page.
- Fix backend bug: locate handler in `node-server/src/handlers`, update logic,
  run `npm run test` in `node-server`.
- Add backend endpoint: add handler in `node-server/src/handlers`, wire the
  route in `node-server/src/index.ts`, and reuse existing services as needed.
