# Save That Again - Backend API v.0.0.1

Next.js backend API for Save That Again audio recording app. Provides authentication, audio clip storage, and management via RESTful API.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Vercel Postgres
- **File Storage**: Vercel Blob
- **Authentication**: JWT with bcrypt
- **Language**: TypeScript

## Project Structure

```
save-that-again-backend/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts    # POST /api/auth/register
│       │   └── login/route.ts       # POST /api/auth/login
│       └── clips/
│           ├── route.ts             # GET/POST /api/clips
│           └── [id]/route.ts        # GET/DELETE /api/clips/[id]
├── lib/
│   ├── auth.ts                      # Authentication utilities
│   ├── db.ts                        # Database functions
│   └── blob.ts                      # Blob storage utilities
├── schema.sql                       # Database schema
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

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ User-specific data isolation
- ✅ Authorization checks on all endpoints
- ✅ HTTPS only (Vercel default)
- ✅ Environment variable protection

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

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Review Next.js docs: https://nextjs.org/docs
- Check Vercel Postgres docs: https://vercel.com/docs/storage/vercel-postgres
- Check Vercel Blob docs: https://vercel.com/docs/storage/vercel-blob
