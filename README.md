# Save That Again - Backend API v.1.0.0

Production-ready Next.js backend API for Save That Again audio recording app. Provides authentication, audio clip storage, web interface, analytics, and monitoring infrastructure.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Vercel Postgres (Neon)
- **File Storage**: Vercel Blob
- **Authentication**: JWT with bcrypt
- **Language**: TypeScript
- **Monitoring**: Error tracking & health checks
- **Backups**: Automatic PITR (Point-in-time recovery)

## Project Structure

```
save-that-again-backend/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts    # POST /api/auth/register
│   │   │   └── login/route.ts       # POST /api/auth/login
│   │   ├── clips/
│   │   │   ├── route.ts             # GET/POST /api/clips
│   │   │   └── [id]/route.ts        # GET/DELETE /api/clips/[id]
│   │   ├── analytics/route.ts       # GET/POST /api/analytics
│   │   └── health/route.ts          # GET /api/health
│   ├── login/page.tsx               # Web: Login page
│   ├── signup/page.tsx              # Web: Signup page
│   ├── clips/page.tsx               # Web: Clips viewer
│   └── page.tsx                     # Web: Home with auto-redirect
├── lib/
│   ├── auth.ts                      # Authentication utilities
│   ├── db.ts                        # Database functions
│   ├── blob.ts                      # Blob storage utilities
│   ├── error-tracking.ts            # Error monitoring
│   └── database-backup.ts           # Backup utilities
├── schema.sql                       # Database schema
├── MONITORING.md                    # Monitoring & backup guide
└── .env.example                     # Environment variables template
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: { "user": {...}, "token": "jwt-token" }
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { "user": {...}, "token": "jwt-token" }
```

### Audio Clips

#### List Clips
```
GET /api/clips?limit=50&offset=0
Authorization: Bearer <token>

Response: { "clips": [...], "total": 10, "limit": 50, "offset": 0 }
```

#### Upload Clip
```
POST /api/clips
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form data:
- file: <audio-file.m4a>
- title: "My Clip"
- timestamp: "2025-01-01T00:00:00Z"
- duration: "300000"
- tags: '["important","meeting"]'

Response: { "clip": {...} }
```

#### Get Specific Clip
```
GET /api/clips/[id]
Authorization: Bearer <token>

Response: { "clip": {...} }
```

#### Delete Clip
```
DELETE /api/clips/[id]
Authorization: Bearer <token>

Response: { "success": true }
```

### Analytics

#### Get User Statistics
```
GET /api/analytics
Authorization: Bearer <token>

Response: {
  "user": { "id": "...", "name": "...", "email": "..." },
  "stats": {
    "totalClips": 10,
    "totalDurationMs": 300000,
    "firstClipDate": "2025-10-14",
    "lastClipDate": "2025-10-15"
  }
}
```

#### Track Event
```
POST /api/analytics
Authorization: Bearer <token>
Content-Type: application/json

{
  "event": "clip_played",
  "metadata": { "clipId": "...", "duration": 5000 }
}

Response: { "success": true }
```

### Health & Monitoring

#### System Health Check
```
GET /api/health

Response: {
  "status": "healthy",
  "timestamp": "2025-10-15T10:00:00.000Z",
  "checks": {
    "database": { "accessible": true, "status": "Connected" },
    "backups": { "enabled": true, "provider": "Neon" },
    "integrity": { "healthy": true, "issues": [] }
  },
  "performance": { "responseTimeMs": 45 }
}
```

## Web Interface

The backend includes a full web interface for managing clips:

### Pages

- **`/`** - Home page with auto-redirect (login → clips)
- **`/login`** - User login page
- **`/signup`** - User registration page
- **`/clips`** - Clips viewer with playback, download, share, delete

### Features

- ✅ User authentication (login/signup)
- ✅ View all uploaded clips
- ✅ Audio playback in browser
- ✅ Download clips (.m4a format)
- ✅ Share clips (Web Share API + clipboard fallback)
- ✅ Delete clips with confirmation
- ✅ Responsive design
- ✅ Analytics integration

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account (for Postgres and Blob)

### Setup

1. **Clone and install dependencies**
   ```bash
   cd save-that-again-backend
   npm install
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Link to Vercel project**
   ```bash
   vercel link
   ```

4. **Pull environment variables**
   ```bash
   vercel env pull .env.local
   ```

5. **Generate JWT secret**
   ```bash
   openssl rand -base64 32
   ```
   Add this to `.env.local` as `JWT_SECRET`

6. **Set up database**
   - Go to Vercel dashboard
   - Navigate to your project > Storage tab
   - Create Postgres database (if not exists)
   - Create Blob store (if not exists)
   - Copy `schema.sql` content
   - In Vercel dashboard > Postgres > Query tab
   - Paste and execute the SQL

7. **Run development server**
   ```bash
   npm run dev
   ```
   
   API will be available at `http://localhost:3000`

### Testing API

Use curl or Postman to test endpoints:

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# List clips (use token from login)
curl http://localhost:3000/api/clips \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Deployment to Vercel

### First Time Deployment

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Add Vercel Postgres**
   - In Vercel dashboard > Storage tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose region closest to users
   - Click "Create"
   - Environment variables are auto-added

4. **Add Vercel Blob**
   - In Vercel dashboard > Storage tab
   - Click "Create Store"
   - Select "Blob"
   - Click "Create"
   - Environment variable is auto-added

5. **Add JWT_SECRET**
   - In Vercel dashboard > Settings > Environment Variables
   - Add `JWT_SECRET` with value from `openssl rand -base64 32`
   - Add for Production, Preview, and Development

6. **Run database migration**
   - In Vercel dashboard > Storage > Postgres
   - Go to Query tab
   - Copy contents of `schema.sql`
   - Paste and execute

7. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Subsequent Deployments

Just push to GitHub - Vercel auto-deploys:
```bash
git add .
git commit -m "Your changes"
git push
```

## Environment Variables

Required environment variables:

```env
# Auto-populated by Vercel Postgres
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Auto-populated by Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Must set manually
JWT_SECRET=your-secret-key-change-in-production
```

## Database Schema

See `schema.sql` for complete schema. Key tables:

- **users**: User accounts with email/password
- **audio_clips**: Audio clip metadata with blob URLs

## Infrastructure Features

### Security
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ User-specific data isolation
- ✅ Authorization checks on all endpoints
- ✅ HTTPS only (Vercel default)
- ✅ Environment variable protection

### Monitoring & Backups
- ✅ Error tracking infrastructure (Sentry-ready)
- ✅ Health check endpoint for uptime monitoring
- ✅ Database integrity checks
- ✅ Automatic backups (Neon PITR)
- ✅ Performance tracking
- ✅ Structured logging

See [MONITORING.md](MONITORING.md) for complete monitoring and backup documentation.

## Flutter Integration

Update Flutter app's `.env`:
```env
BACKEND_URL=https://your-app.vercel.app
```

Use the provided token in Authorization header:
```
Authorization: Bearer <token>
```

## Troubleshooting

### Database Connection Issues
- Verify Postgres database is created in Vercel
- Check environment variables are set
- Try using `POSTGRES_URL_NON_POOLING` for serverless

### Blob Upload Failures
- Verify Blob store is created
- Check `BLOB_READ_WRITE_TOKEN` is set
- Ensure file size is under limit (500MB default)

### Authentication Errors
- Verify `JWT_SECRET` is set and consistent
- Check token expiration (7 days default)
- Ensure proper Authorization header format

## Development Tips

- Use `console.log` for debugging (visible in Vercel logs)
- Test locally before deploying
- Use Vercel preview deployments for testing
- Monitor Vercel Analytics for performance
- Check Vercel Logs for errors

## Monitoring Setup

### Enable Neon Backups (Recommended)
1. Visit https://console.neon.tech
2. Select your project
3. Navigate to Settings → Backups
4. Enable automatic backups
5. Set retention period (7-30 days)

### Configure Error Tracking (Optional)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
# Add SENTRY_DSN to environment variables
```

### Set Up Uptime Monitoring (Optional)
1. Visit https://uptimerobot.com
2. Add monitor: `/api/health`
3. Set interval: 5 minutes
4. Configure alerts

See [MONITORING.md](MONITORING.md) for detailed instructions.

## Production Checklist

### Initial Setup
- [x] Deploy to Vercel
- [x] Configure Postgres database
- [x] Configure Blob storage
- [x] Set JWT_SECRET
- [x] Run database migrations
- [ ] Enable Neon backups ⚠️
- [ ] Set up error tracking ⚠️
- [ ] Configure uptime monitoring ⚠️

### Maintenance
- Daily: Automatic backups (Neon)
- Weekly: Review analytics & logs
- Monthly: Test disaster recovery

## Support & Resources

### Documentation
- [MONITORING.md](MONITORING.md) - Complete monitoring guide
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Neon: https://neon.tech/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Vercel Blob: https://vercel.com/docs/storage/vercel-blob

### Status Pages
- Vercel Status: https://www.vercel-status.com
- Neon Status: https://neonstatus.com
