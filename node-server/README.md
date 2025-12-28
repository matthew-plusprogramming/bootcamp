# node-server

Simple Express 5 API with an in-memory data store. The server seeds a small
exercise list on startup and keeps everything in memory while it runs.

## Quick Start

From `node-server`:

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

The API listens on `http://localhost:3001` by default. Override with `PORT`.

## API Endpoints

- `GET /health`: `{ status: "ok" }`
- `GET /exercises`: list all exercises
- `GET /exercises/:id`: fetch a single exercise
- `POST /exercises`: create a new exercise

Example payload for `POST /exercises`:

```json
{
  "title": "Add a friendly footer",
  "summary": "Create a footer component and wire it into the home page.",
  "difficulty": "intro",
  "estMinutes": 15,
  "tags": ["frontend", "react"]
}
```

## Project Structure

- `src/index.ts`: Express entrypoint and route definitions.
- `src/data/store.ts`: In-memory database and seeded exercises.
- `src/services/exercises.ts`: CRUD helpers used by the routes.

## Notes

- The data store resets every time the server restarts.
- This project intentionally avoids external services to keep exercises simple.
