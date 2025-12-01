# 🚀 Setup Guide - Getting Started

**Persian E-Commerce Platform - Installation & Configuration Guide**

---

## 📋 Prerequisites

### System Requirements
- Node.js 20+ ([Download](https://nodejs.org/))
- npm 10+ or bun
- PostgreSQL 14+ (via Neon backend)
- Git for version control
- A code editor (VS Code recommended)

### Accounts Required
- Replit account (for deployment)
- Neon PostgreSQL account (database hosting)

---

## 🔧 Installation Steps

### Step 1: Clone Repository

```bash
# Clone the repository
git clone <repository-url>
cd project-directory

# Or fork and clone your fork
git clone https://github.com/your-username/project.git
cd project
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using bun
bun install
```

### Step 3: Setup Environment Variables

Create `.env.local` file in project root:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Database Details (for connection pooling)
PGHOST=host.neon.tech
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=database_name

# Security
SESSION_SECRET=your-random-secret-key-generate-one

# Optional: Payment Gateway Keys
ZARINPAL_MERCHANT_ID=your_merchant_id
MELLAT_MERCHANT_ID=your_merchant_id

# Optional: External Services
OPENAI_API_KEY=sk-...  # If using AI features
```

### Getting Database URL

**From Neon:**

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Create database
4. Copy connection string
5. Paste as DATABASE_URL

**Example URL:**
```
postgresql://user:password@host.neon.tech:5432/dbname
```

### Generate SESSION_SECRET

```bash
# Linux/Mac
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Initialize Database

```bash
# Run migrations
npm run db:push

# First time only - creates tables and schema
```

### Step 5: Start Development Server

```bash
# Development mode
npm run dev

# Server runs on http://localhost:5000
# Open browser to see the app
```

---

## 📁 Project Structure After Setup

```
project-root/
├── .env.local               ← Your environment variables
├── node_modules/            ← Dependencies
├── client/                  ← Frontend
├── server/                  ← Backend
├── shared/                  ← Shared code
├── dist/                    ← Built files (after build)
└── ...
```

---

## 🔗 Database Setup Details

### Database Schema

First `npm run db:push` creates:
- 29 tables
- Foreign keys
- Indexes
- Enums
- Constraints

### Current Tables

**Users:**
- users
- sessions

**Products:**
- categories
- products
- product_images

**Shopping:**
- cart
- orders
- order_items
- coupons

**User Data:**
- addresses
- wishlist
- wallets
- wallet_transactions

**Management:**
- banners
- landing_sections
- questions
- notifications
- reviews
- ...and more

### Updating Schema

If you modify `shared/schema.ts`:

```bash
npm run db:push
```

This safely updates schema without data loss.

---

## 🔐 Authentication Setup

### Replit Auth

The app uses Replit authentication. No additional setup needed!

1. Users click "Login via Replit"
2. Redirected to Replit login
3. User authorized
4. Redirected back with auth token
5. Session created

### Testing Authentication

1. Click login button
2. Authenticate with Replit account
3. Redirected to home as authenticated user
4. Admin users see admin panel

---

## 📡 API Testing

### Using curl

```bash
# Get products
curl http://localhost:5000/api/products

# Get with auth header
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/products
```

### Using REST Client (VS Code Extension)

Create `requests.http`:

```
GET http://localhost:5000/api/products

###

POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "items": [
    {"productId": 1, "quantity": 2}
  ],
  "shippingAddressId": 1
}
```

---

## 🐛 Troubleshooting

### Issue: Database Connection Failed

```
Error: getaddrinfo ENOTFOUND host.neon.tech
```

**Solution:**
- Check DATABASE_URL is correct
- Verify Neon project is active
- Test connection: `psql <DATABASE_URL>`
- Wait a few seconds, Neon has startup time

### Issue: PORT Already in Use

```
Error: Listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3000 npm run dev
```

### Issue: Dependencies Not Installing

```
Error: npm ERR! code ERESOLVE
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove package-lock.json
rm package-lock.json

# Try again
npm install
```

### Issue: TypeScript Errors

```
Error: Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# Check types
npm run check

# Fix reported errors
# Edit files to match expected types
```

### Issue: Build Fails

```
Error: npm run build fails
```

**Solution:**
```bash
# Clean previous build
rm -rf dist

# Check for errors
npm run check

# Try building again
npm run build
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Dependencies installed (`node_modules` exists)
- [ ] Environment variables set (`.env.local` created)
- [ ] Database connected (no connection errors)
- [ ] Migrations ran (tables created)
- [ ] Dev server starts (`npm run dev` works)
- [ ] App loads in browser (`http://localhost:5000`)
- [ ] Can view products
- [ ] Can click login (redirects to Replit)
- [ ] Type checking passes (`npm run check`)
- [ ] Build succeeds (`npm run build`)

---

## 📚 Scripts Reference

### Development

```bash
npm run dev              # Start development server
npm run check           # Type checking
npm run build           # Production build
npm run start           # Run production build
```

### Database

```bash
npm run db:push        # Sync schema with database
npm run db:studio      # Open Drizzle Studio
```

---

## 🌐 Deployment to Replit

### Automatic Deployment

```bash
# Push to main branch
git push origin main

# Replit auto-deploys on push
# Check deployment status in Replit dashboard
```

### Manual Deploy (if needed)

1. Go to Replit project
2. Click "Run" or restart workflow
3. App deploys to Replit domains

### Environment in Production

Set these in Replit Secrets:

```
DATABASE_URL=...
PGHOST=...
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
SESSION_SECRET=...
NODE_ENV=production
```

---

## 📖 Next Steps

1. **Read Documentation** - See `PROJECT_DOCUMENTATION.md`
2. **Explore Code** - Check `client/README.md`, `server/README.md`
3. **Start Developing** - Create feature branch
4. **Test Features** - Verify in browser
5. **Commit Changes** - Follow commit guidelines
6. **Submit PR** - See `CONTRIBUTING.md`

---

## 🆘 Getting Help

- **Documentation** - Read README files
- **Search Issues** - GitHub issues
- **Discussion Forum** - GitHub Discussions
- **Contact Maintainers** - @mention in issues

---

**Setup Guide Version:** 1.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready

---

**Happy coding!** 🎉
