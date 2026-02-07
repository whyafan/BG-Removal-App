# API Functions

This directory hosts Vercel Serverless Functions used by the client app and external API access.

## Authentication
- User-facing app requests use Kinde sessions (server-side cookies).
- API tokens are manually approved and accepted as Bearer tokens for the credits/history APIs.

Helpers live in `api/supabase-auth.js`.

## Endpoints
- `GET /api/health`
  - Health check endpoint.
- `GET /api/credits`
  - Returns current credits for the signed-in user.
  - Initializes to `5` if not present.
  - Accepts Supabase access tokens or approved API tokens.
- `POST /api/credits/init`
  - Ensures a user has default credits (5).
  - Requires Kinde session.
- `POST /api/credits/consume`
  - Decrements credits by `1` if available.
  - Returns `402` when out of credits.
  - Appends an entry to `conversion_history`.
  - Accepts Supabase access tokens or approved API tokens.
- `GET /api/history`
  - Returns conversion history for the signed-in user.
  - Accepts Supabase access tokens or approved API tokens.
- `POST /api/access/request`
  - Submits an API access request (signed-in users only).
  - Stores email + confirmation code, sends an email via Resend.
- `POST /api/access/approve`
  - Admin-only approval endpoint.
  - Generates and emails an API token, stores its hash in the DB.
- `POST /api/stripe/checkout`
  - Creates a Stripe Checkout session (Kinde session required).
- `POST /api/stripe/webhook`
  - Stripe webhook handler (server-side only).

## Database Tables (Supabase)
```sql
create table if not exists profiles (
  id uuid primary key,
  email text,
  credits integer default 5,
  created_at timestamp with time zone default now()
);

create table if not exists conversion_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  file_name text,
  created_at timestamp with time zone default now()
);

create table if not exists api_access_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  email text not null,
  status text default 'pending',
  confirmation_code text,
  token_hash text,
  token_last4 text,
  approved_at timestamp with time zone,
  created_at timestamp with time zone default now()
);
```

## Environment Variables (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `KINDE_CLIENT_ID`
- `KINDE_CLIENT_SECRET`
- `KINDE_ISSUER_URL`
- `KINDE_SITE_URL`
- `KINDE_POST_LOGIN_REDIRECT_URL`
- `KINDE_POST_LOGOUT_REDIRECT_URL`
- `ADMIN_EMAILS`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_SUCCESS_URL`
- `STRIPE_CANCEL_URL`
- `NEXT_PUBLIC_STRIPE_PRICE_BASIC`
- `NEXT_PUBLIC_STRIPE_PRICE_ADVANCED`
- `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS`
