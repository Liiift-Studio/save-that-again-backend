# Save That Again - Backend API

Next.js 15 backend for Save That Again, deployed on Vercel at https://savethatagain.com

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm test             # Run Jest tests (34 tests)
npm start            # Start production server
```

## Architecture

```
app/api/
├── auth/            # register, login, google OAuth
├── clips/           # CRUD for audio clips (list, upload, get, delete)
│   └── [id]/        # Single clip operations
├── user/            # Profile, privacy, export, delete
│   ├── delete/      # Account deletion with grace period
│   ├── privacy/     # Privacy settings
│   └── export/      # Data export
├── analytics/       # User stats and event tracking
└── health/          # Health check endpoint

lib/
├── auth.ts          # JWT, bcrypt, Google OAuth, extractBearerToken()
├── db.ts            # Vercel Postgres queries (users, audio_clips)
├── blob.ts          # Vercel Blob upload/download/delete
├── error-tracking.ts
└── database-backup.ts

middleware.ts         # Auth checks, rate limiting, CORS
__tests__/            # Jest tests (auth.test.ts, middleware.test.ts)
schema.sql            # Database DDL
```

## Conventions

- Always use `extractBearerToken()` from lib/auth.ts for auth header parsing
- Database table is `audio_clips` (not `clips`) - past bugs from this mismatch
- Use parameterized SQL via `@vercel/postgres` sql template tags, never string interpolation
- All API routes return `{ error: string }` on failure
- Environment variables are required - throw on missing, no fallback defaults for secrets
- Package manager: npm

## Database

Two tables in Vercel Postgres (Neon):
- **users**: id (UUID), email, password_hash (nullable for OAuth), google_id, auth_provider, profile_picture
- **audio_clips**: id (UUID), user_id (FK), title, timestamp, duration (ms), blob_url, blob_pathname, file_size, tags (JSONB)

Full schema in `schema.sql`.

## Auth Flow

1. Middleware checks Bearer token presence on protected routes (Edge runtime)
2. Route handlers verify JWT via `getUserFromToken()` (Node runtime)
3. Rate limiting: 60 req/min on /api/clips, 30 req/min on /api/analytics and /api/user

## Testing

- Framework: Jest + ts-jest
- Config: `jest.config.js`
- Tests: `__tests__/auth.test.ts`, `__tests__/middleware.test.ts`
- DB functions are mocked in tests via `jest.mock()`

## Watch Out For

- `JWT_SECRET` env var is required - backend crashes on startup without it
- Middleware runs on Edge runtime - no Node.js crypto (jsonwebtoken) there
- Account deletion must clean up Vercel Blob files before deleting DB records
- CORS reflects allowed origins only (savethatagain.com, www, localhost:3000)
