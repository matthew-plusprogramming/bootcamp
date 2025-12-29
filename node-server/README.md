# node-server

Simple Express 5 API with an in-memory data store. The server seeds a small
mentor tip list on startup and keeps everything in memory while it runs.

## Quick Start

From `node-server`:

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

The API listens on `http://localhost:3001` by default. Override with `PORT`.

## API Endpoints

- `GET /health`: `{ status: "ok" }`
- `GET /tips`: list all mentor tips
- `GET /tips/:id`: fetch a single mentor tip
- `POST /tips`: create a new mentor tip

Example payload for `POST /tips`:

```json
{
  "headline": "Keep commits small",
  "summary": "Make each change easy to review and revert.",
  "topic": "workflow",
  "readMinutes": 4,
  "tags": ["git", "habits"],
  "author": "Mentor"
}
```

## Project Structure

- `src/index.ts`: Express entrypoint and route definitions.
- `src/data/store.ts`: In-memory database and seeded mentor tips.
- `src/services/tips.ts`: CRUD helpers used by the routes.

## Notes

- The data store resets every time the server restarts.
- This project intentionally avoids external services to keep the bootcamp setup simple.
