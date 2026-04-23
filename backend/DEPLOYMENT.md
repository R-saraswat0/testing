# 🚀 Backend Deployment Guide

## Deployment Platforms

### 1. Local Development
- ✅ Already set up with `npm run dev`
- Port: 3000
- Database: SQLite (dev.db)

### 2. Vercel Deployment

#### Setup
```bash
npm install -g vercel
cd backend
vercel
```

#### Configure vercel.json
```json
{
  "buildCommand": "npm run db:migrate",
  "env": {
    "DATABASE_URL": "@database_url",
    "NODE_ENV": "production",
    "FRONTEND_URL": "@frontend_url"
  }
}
```

### 3. Heroku Deployment

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL="your_db_url"
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 4. Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run
```bash
docker build -t agile-backend .
docker run -p 3000:3000 agile-backend
```

### 5. AWS EC2 Deployment

```bash
# SSH into instance
ssh -i key.pem ec2-user@your-ip

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18

# Clone and setup
git clone your-repo
cd backend
npm install
npm run db:migrate

# Start with PM2
npm install -g pm2
pm2 start src/index.js --name "agile-backend"
```

### 6. Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 7. Render Deployment

1. Connect GitHub repository
2. Create new Web Service
3. Set environment variables
4. Build command: `npm run db:migrate`
5. Start command: `npm start`

---

## Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="postgresql://user:password@host:5432/dbname"
FRONTEND_URL=https://yourdomain.com
LOG_LEVEL=info
```

## Database Setup for Production

### Using PostgreSQL (Recommended)

Update Prisma datasource in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Update DATABASE_URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/agile_db"
```

---

## Monitoring & Logging

### Application Health Check
```bash
curl https://your-backend.com/health
```

### View Logs
```bash
# On server
tail -f logs/all.log
```

### Performance Monitoring
- Use PM2 monitoring
- Set up APM (New Relic, DataDog)
- Monitor database queries

---

## Security Checklist

- [ ] Use HTTPS/SSL
- [ ] Set secure environment variables
- [ ] Enable CORS for specific domains
- [ ] Update dependencies: `npm audit fix`
- [ ] Enable rate limiting
- [ ] Use strong database credentials
- [ ] Regular backups of database
- [ ] Monitor logs for errors
- [ ] Set up alerts

---

## Performance Optimization

```bash
# Bundle analysis
npm install --save-dev webpack-bundle-analyzer

# Update dependencies
npm update

# Prune unnecessary packages
npm prune --production
```

## Backup & Recovery

### Database Backup
```bash
# SQLite
cp dev.db backup_$(date +%Y%m%d).db

# PostgreSQL
pg_dump dbname > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
# SQLite
cp backup_20240101.db dev.db

# PostgreSQL
psql dbname < backup_20240101.sql
```

---

**Choose the platform that best fits your needs and budget!**
