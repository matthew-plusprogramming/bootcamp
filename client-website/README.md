# client-website

Next.js (App Router) landing page for the bootcamp. The page explains the
learning flow and previews seeded mentor tips from the local API.

## Quick Start

From `client-website`:

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`

The site runs on `http://localhost:3000` by default.

## API Connection

The optional LiveTips component fetches from the Express server. Set
`NEXT_PUBLIC_API_URL` if your API runs somewhere else.

Example:

```bash
export NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Project Notes

- Routes live under `src/app`.
- Components use SCSS modules for styling.
- The site remains static-friendly; API data loads on the client.
