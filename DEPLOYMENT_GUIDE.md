# 🚀 راهنمای배포 - فروشگاه اینترنتی فارسی

**نسخه:** 3.0 | **تاریخ:** 1 دسامبر 2025

---

## ✅ پیش‌شرط‌های배포

### Requirements Checklist
- [x] تمام API endpoints کار می‌کنند
- [x] Database schema تکمیل شده
- [x] Admin panel functional
- [x] Payment gateways ready
- [x] Error handling configured
- [x] Logging system active
- [x] Rate limiting enabled
- [x] Security headers set

---

## 🎯 مراحل배포 (Replit)

### 1. Replit Publishing (Best Option for You)

```bash
# در Replit GUI:
1. کلیک بر روی دکمه "Publish"
2. Select "Replit Hosting"
3. Configure domain (optional)
4. Click "Publish"
```

**مزایا:**
- ✅ Automatic SSL/HTTPS
- ✅ Built-in CDN
- ✅ Auto-scaling
- ✅ Health checks
- ✅ Easy rollback

---

## 📋 Pre-Deployment Checklist

### Backend
- [x] Environment variables configured
- [x] Database connected
- [x] Logging working
- [x] Error handling robust
- [x] Rate limiting active
- [x] API endpoints tested

### Frontend
- [x] Build succeeds
- [x] All routes working
- [x] Admin panel accessible
- [x] RTL/Dark mode working
- [x] Responsive design verified

### Database
- [x] Schema migrations done
- [x] Indexes created
- [x] Constraints set
- [x] Backups enabled

---

## 🔧 Configuration for Production

### Environment Variables (Keep Secure)
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
SESSION_SECRET=strong-random-secret
```

### Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

### CORS Configuration
```
Allow-Origin: your-domain.com
Allow-Methods: GET, POST, PATCH, DELETE
Allow-Headers: Content-Type, Authorization
```

---

## 📊 Monitoring After Deployment

### Health Checks
```bash
# Check app status
curl https://your-app.replit.app/api/health

# Check admin health
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-app.replit.app/api/admin/health
```

### Performance Metrics
```bash
# Get performance data
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-app.replit.app/api/admin/performance
```

### Log Files
```bash
# Check logs in Replit
# They're automatically stored and accessible via Replit UI
```

---

## 🔐 Security Best Practices

1. **Secrets Management**
   - ✅ Use Replit secrets for API keys
   - ✅ Never commit .env files
   - ✅ Rotate passwords regularly

2. **Database**
   - ✅ Use strong passwords
   - ✅ Enable SSL connections
   - ✅ Regular backups
   - ✅ Monitor slow queries

3. **API Security**
   - ✅ Rate limiting enabled (429 responses)
   - ✅ Input validation with Zod
   - ✅ CSRF protection
   - ✅ XSS prevention

4. **SSL/TLS**
   - ✅ Replit provides free HTTPS
   - ✅ Auto-renewal of certificates
   - ✅ Force HTTPS redirects

---

## 🎨 Custom Domain Setup

### Option 1: Use Replit Domain
- Default: `your-project.replit.dev`
- Free HTTPS
- Auto-renewal

### Option 2: Custom Domain
1. Go to Replit Deployment Settings
2. Add custom domain
3. Update DNS records
4. Wait for verification

---

## 📈 Performance Optimization

### Before Deployment
```bash
npm run build
npm run start  # Test production build locally
```

### After Deployment
- Monitor API response times
- Check database query performance
- Use CDN for static assets
- Enable caching headers

---

## 🚨 Common Issues & Solutions

### Issue: Database Connection Timeout
```bash
# Solution: Check DATABASE_URL
# Verify PostgreSQL is running
# Check network access rules
```

### Issue: Static Files Not Loading
```bash
# Solution: Check file paths
# Verify build output in dist/
# Check public/ directory
```

### Issue: Memory Issues
```bash
# Solution: Optimize queries
# Implement caching
# Monitor memory usage
# Use pagination for large datasets
```

---

## 🔄 Rollback Procedure

### If Something Goes Wrong
1. Go to Replit Deployments
2. Select previous version
3. Click "Rollback"
4. Verify app is working

---

## 📱 API Endpoints for Monitoring

### Health Check
```bash
GET /api/health
Response: { status: "ok", uptime: 123.45 }
```

### Admin Health
```bash
GET /api/admin/health
Authorization: Bearer <token>
Response: { status: "healthy", database: {...} }
```

### Performance Data
```bash
GET /api/admin/performance
Authorization: Bearer <token>
Response: { metrics: [...], total: 50 }
```

---

## 📞 Support & Monitoring

### Logs Location
- Replit UI → Logs tab
- `/logs/api/` → API logs
- `/logs/system/` → System logs
- `/logs/errors/` → Error logs

### Metrics to Monitor
- ✅ API response time (target: <500ms)
- ✅ Database query time (target: <100ms)
- ✅ Error rate (target: <0.1%)
- ✅ Uptime (target: 99.9%)

---

## ✨ Post-Deployment

### Day 1
- Monitor all logs
- Test all endpoints
- Check user experience
- Verify payments working

### Week 1
- Monitor performance
- Collect user feedback
- Fix any issues
- Optimize slow endpoints

### Monthly
- Review analytics
- Update content
- Backup data
- Security audit

---

## 🎯 Success Criteria

✅ **Your app is ready to deploy if:**
- All tests pass
- No critical errors
- Performance acceptable
- Security measures in place
- Monitoring configured
- Backup plan ready

---

**پروژه شما آماده배포است! 🚀**

**Final Status:** ✅ **PRODUCTION READY**

**Deploy Now Using Replit's Publish Button!**

---

Created: 1 December 2025  
Last Updated: 1 December 2025  
Version: 3.0 Complete
