---
last_reviewed: 2025-12-28
---

# Testing Guidelines

## General

- Tests are small and focused; add them when they clarify behavior or when a bug
  fix needs coverage.
- Prefer observable behavior over internal implementation details.
- For bootcamp exercises, tests are optional unless the task explicitly asks for
  them.

## Tooling

- Frontend: Vitest + Testing Library (`@testing-library/react`,
  `@testing-library/user-event`).
- Backend: no test harness by default; add Vitest + Supertest if a task
  requires backend coverage.
- Test setup: `client-website/src/test/setup.ts`.

## Boundaries & Mocks

- Mock true boundaries: network calls, databases, filesystem, time, randomness,
  and `process.env`.
- Prefer in-memory fakes over deep mock chains.

## Backend Test Patterns

- No backend test helpers yet; keep tests minimal and focused if you add them.

## Suggested Commands

- Frontend: `npm run test` (from `client-website`).
