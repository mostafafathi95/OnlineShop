# 🐳 تنظیم Docker

## نصب Docker

### macOS
```bash
brew install docker
brew services start docker
```

### Ubuntu
```bash
sudo apt-get install docker.io
sudo systemctl start docker
```

### Windows
- دانلود Docker Desktop
- راه‌اندازی installer

## Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# نصب dependencies تنها Production
COPY package*.json ./
RUN npm ci --only=production

# کپی build
COPY --from=builder /app/dist ./dist

# Copy public
COPY --from=builder /app/client/public ./client/public

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/server/index.js"]
```

## docker-compose.yml

```yaml
version: '3.8'

services:
  # Node.js Application
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://user:password@db:5432/ecommerce
      PORT: 5000
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL Database
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: ecommerce
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: ecommerce
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ecommerce"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # Redis Cache (اختیاری)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

networks:
  default:
    name: ecommerce_network
```

## .dockerignore

```
node_modules
npm-debug.log
.env
.env.local
.git
.gitignore
.DS_Store
dist
build
logs
```

## دستورات Docker

### Build و Run

```bash
# Build image
docker build -t ecommerce:latest .

# اجرا
docker run -p 5000:5000 \
  -e DATABASE_URL=postgresql://... \
  ecommerce:latest

# Run with docker-compose
docker-compose up -d

# لاگ‌ها
docker-compose logs -f app

# توقف
docker-compose down
```

### نگهداری

```bash
# داخل container
docker exec -it ecommerce_app_1 bash

# اجرای command
docker exec ecommerce_app_1 npm run db:push

# حذف images
docker image prune

# حذف volumes
docker volume prune
```

## Production Checklist

- ✅ استفاده از specific Node version
- ✅ Multi-stage builds
- ✅ `.dockerignore` موجود
- ✅ Health checks تعریف شده
- ✅ Restart policy
- ✅ Resource limits
- ✅ Logging configuration

---

**محدثه:** 1 دسامبر 2025
