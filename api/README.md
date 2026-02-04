# API Functions

This directory hosts Vercel Serverless Functions used by the client app.

## Authentication
Each endpoint uses a Clerk JWT from the `Authorization: Bearer <token>` header.
The helper lives in `api/_auth.js` and verifies tokens with `CLERK_SECRET_KEY`.

## Endpoints
- `GET /api/health`
  - Health check endpoint.
- `GET /api/credits`
  - Returns current credits for the signed-in user.
  - Initializes to `5` if not present.
- `POST /api/credits/init`
  - Ensures a user has default credits (5).
  - Safe to call on every session start.
- `POST /api/credits/consume`
  - Decrements credits by `1` if available.
  - Returns `402` when out of credits.
  - Appends an entry to `privateMetadata.history`.
- `GET /api/history`
  - Returns conversion history from `privateMetadata.history`.

## Environment Variables (Vercel)
- `CLERK_SECRET_KEY`
- `CLERK_PUBLISHABLE_KEY` (needed for Clerk middleware behavior)
