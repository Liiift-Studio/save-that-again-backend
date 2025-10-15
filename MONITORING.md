// Monitoring and Backup Guide for Save That Again

# Monitoring & Backup Configuration

## Overview

This document describes the monitoring and backup infrastructure for Save That Again.

## Error Tracking

### Current Setup
- **Structured Logging**: All errors logged with context
- **Console Output**: JSON-formatted error logs
- **Performance Tracking**: Slow operation detection (>1s)

### Production Setup (Recommended)
1. **Install Sentry**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

2. **Configure Environment**
   ```bash
   # Add to .env.local
   SENTRY_DSN=your_sentry_dsn_here
   ```

3. **Usage**
   ```typescript
   import { errorTracker } from './lib/error-tracking';
   
   // Log errors
   errorTracker.logError(error, { user, request });
   
   // Log warnings
   errorTracker.logWarning('Slow operation detected');
   
   // Track performance
   errorTracker.logPerformance('database_query', 1500);
   ```

## Database Backups

### Automatic Backups (Neon)
✅ **Already Configured** (if using Neon PostgreSQL)

1. **Enable in Dashboard**
   - Go to https://console.neon.tech
   - Select your project
   - Settings → Backups
   - Enable automatic backups

2. **Configuration**
   - Frequency: Every 24 hours
   - Retention: 7-30 days (depending on plan)
   - Type: Point-in-time recovery (PITR)
   - RPO: < 5 minutes
   - RTO: < 1 hour

### Manual Backup (Optional)
```bash
# Export database to SQL file
pg_dump -h YOUR_NEON_HOST -U YOUR_USER -d YOUR_DB > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h YOUR_NEON_HOST -U YOUR_USER -d YOUR_DB < backup_20251015.sql
```

### Blob Storage Backups
- **Provider**: Vercel Blob
- **Backup**: Handled automatically by Vercel
- **No action required**

## Health Monitoring

### Health Check Endpoint
```bash
# Check system health
curl https://your-backend.vercel.app/api/health

Response:
{
  "status": "healthy",
  "timestamp": "2025-10-15T10:00:00.000Z",
  "checks": {
    "database": {
      "accessible": true,
      "status": "Connected"
    },
    "backups": {
      "enabled": true,
      "provider": "Neon (automatic)"
    },
    "integrity": {
      "healthy": true,
      "issues": []
    }
  },
  "performance": {
    "responseTimeMs": 45
  }
}
```

### Monitoring Schedule
**Recommended checks:**
- Every 5 minutes: Health endpoint
- Daily: Database integrity
- Weekly: Manual backup (optional)
- Monthly: Disaster recovery test

## Uptime Monitoring

### Setup with UptimeRobot (Free)
1. Go to https://uptimerobot.com
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://your-backend.vercel.app/api/health`
   - Interval: 5 minutes
3. Configure alerts:
   - Email notifications
   - Slack/Discord webhooks

### Alternative: Vercel Analytics
- Automatically enabled for Vercel deployments
- Dashboard: https://vercel.com/dashboard/analytics
- Tracks: Response times, error rates, traffic

## Analytics Dashboard

### User Analytics Endpoint
```bash
GET /api/analytics
Authorization: Bearer <token>

Response:
{
  "user": { ... },
  "stats": {
    "totalClips": 10,
    "totalDurationMs": 300000,
    "firstClipDate": "2025-10-14",
    "lastClipDate": "2025-10-15"
  }
}
```

## Alerts & Notifications

### Critical Alerts
Set up notifications for:
- ❌ Health check fails (3 consecutive)
- ❌ Database connection lost
- ❌ API error rate > 5%
- ❌ Response time > 2 seconds
- ❌ Disk space > 80%

### Warning Alerts
- ⚠️ Slow queries (>1s)
- ⚠️ Orphaned database records
- ⚠️ High memory usage
- ⚠️ Backup age > 25 hours

## Disaster Recovery

### Recovery Procedures

**Scenario 1: Database Corruption**
1. Access Neon dashboard
2. Navigate to Backups
3. Select restore point
4. Click "Restore"
5. Verify data integrity

**Scenario 2: Accidental Data Deletion**
1. Identify deletion timestamp
2. Use PITR to restore
3. Export affected data
4. Merge with current database

**Scenario 3: Complete System Failure**
1. Restore database from Neon backup
2. Redeploy backend from GitHub
3. Verify blob storage integrity
4. Test all API endpoints
5. Update DNS if needed

### Recovery Time Objectives
- Database: < 1 hour
- Application: < 30 minutes
- Full system: < 2 hours

## Security Monitoring

### What to Monitor
- Failed login attempts
- Unusual upload patterns
- API rate limit violations
- Suspicious user activity
- Database access patterns

### Implementation
```typescript
// Track failed logins
errorTracker.logWarning('Failed login attempt', {
  user: { email },
  request: { ip, userAgent },
  extra: { attemptCount }
});

// Track suspicious activity
if (uploadCount > 100) {
  errorTracker.logWarning('Unusual upload activity', {
    user,
    extra: { uploadCount, timeWindow: '1 hour' }
  });
}
```

## Performance Monitoring

### Key Metrics
- API response time: < 500ms (p95)
- Database query time: < 200ms (p95)
- Upload time: < 5s (p95)
- Error rate: < 1%

### Vercel Analytics
Automatically tracks:
- Page views
- API calls
- Error rates
- Geographic distribution
- Device types

## Maintenance Schedule

### Daily
- ✅ Automatic database backup (Neon)
- ✅ Health check monitoring (UptimeRobot)
- ✅ Error log review (Sentry/Console)

### Weekly
- Review analytics
- Check disk usage
- Verify backup integrity
- Security audit

### Monthly
- Test disaster recovery
- Update dependencies
- Performance optimization
- Cost review

## Cost Monitoring

### Vercel
- Free tier: Sufficient for development
- Pro tier: $20/month (recommended for production)
- Monitor: Function execution, bandwidth, storage

### Neon
- Free tier: 0.5GB storage, 1 compute hour
- Launch tier: $19/month (1GB storage, always-on)
- Monitor: Database size, connection count

### Total Monthly Cost
- Development: $0 (free tiers)
- Production: ~$40/month (Vercel Pro + Neon Launch)

## Troubleshooting

### Health Check Fails
```bash
# 1. Check database connectivity
curl https://your-backend.vercel.app/api/health

# 2. View Vercel logs
vercel logs

# 3. Check Neon dashboard
# Visit console.neon.tech

# 4. Verify environment variables
vercel env ls
```

### High Error Rate
```bash
# 1. View recent errors
vercel logs --since=1h

# 2. Check specific endpoint
curl -v https://your-backend.vercel.app/api/clips

# 3. Review Sentry dashboard
# Visit sentry.io
```

### Slow Performance
```bash
# 1. Check response time
time curl https://your-backend.vercel.app/api/health

# 2. Analyze database queries
# View slow query log in Neon dashboard

# 3. Check Vercel Analytics
# Visit vercel.com/dashboard/analytics
```

## Support & Resources

### Documentation
- Neon: https://neon.tech/docs
- Vercel: https://vercel.com/docs
- Sentry: https://docs.sentry.io
- Postgres: https://www.postgresql.org/docs

### Emergency Contacts
- Neon Status: https://neonstatus.com
- Vercel Status: https://www.vercel-status.com
- Support: support@vercel.com

## Checklist

### Initial Setup
- [ ] Enable Neon automatic backups
- [ ] Configure health monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Set up alert notifications
- [ ] Test disaster recovery
- [ ] Document procedures

### Monthly Review
- [ ] Review backup status
- [ ] Test restore procedure
- [ ] Check error logs
- [ ] Review analytics
- [ ] Update documentation
- [ ] Security audit
- [ ] Cost analysis

## Next Steps

1. **Enable Neon Backups**: Visit console.neon.tech
2. **Set Up Monitoring**: Configure UptimeRobot or Sentry
3. **Test Recovery**: Perform a backup restore test
4. **Document Procedures**: Update this guide as needed
5. **Set Alerts**: Configure notification channels
