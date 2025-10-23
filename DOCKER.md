# Docker Setup Guide

## Overview

This project is fully containerized and optimized for Docker deployment. The Docker setup includes:

- **Multi-stage build** for optimal image size
- **Puppeteer support** with pre-installed Chromium
- **Security best practices** (non-root user)
- **Production and development** configurations
- **Health checks** for monitoring
- **Cloud Run compatible** (GCP, AWS, Azure)

---

## Quick Start

### Production Deployment

```bash
# 1. Create production environment file
cp .env.example .env.production

# 2. Edit .env.production and add your credentials
nano .env.production

# 3. Build and run with Docker Compose
docker-compose up -d

# 4. Access the application
open http://localhost:3000
```

### Development with Hot Reload

```bash
# 1. Create local environment file
cp .env.example .env.local

# 2. Edit .env.local and add your credentials
nano .env.local

# 3. Start development environment
docker-compose -f docker-compose.dev.yml up

# 4. Access the application (with hot reload)
open http://localhost:3000
```

---

## Environment Variables

### Required Variables

```bash
# NextAuth.js (Required)
NEXTAUTH_URL=http://localhost:3000  # Your app URL
NEXTAUTH_SECRET=  # Generate with: openssl rand -base64 32

# LinkedIn OAuth (Required)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# AI API (Required)
GEMINI_API_KEY=your_gemini_api_key
```

### Optional Variables

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=production

# Puppeteer (Auto-configured in Docker)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

---

## Docker Commands

### Production

```bash
# Build image
docker-compose build

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Remove all (including volumes)
docker-compose down -v
```

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Rebuild development image
docker-compose -f docker-compose.dev.yml up --build

# Stop development environment
docker-compose -f docker-compose.dev.yml down
```

### Direct Docker Commands

```bash
# Build production image
docker build -t linkedin-hashtag-engine .

# Run production container
docker run -p 3000:8080 \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e LINKEDIN_CLIENT_ID="your-id" \
  -e LINKEDIN_CLIENT_SECRET="your-secret" \
  -e GEMINI_API_KEY="your-key" \
  linkedin-hashtag-engine

# Build development image
docker build -f Dockerfile.dev -t linkedin-hashtag-engine-dev .

# Run development container
docker run -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  linkedin-hashtag-engine-dev
```

---

## Cloud Deployment

### Google Cloud Run

```bash
# 1. Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# 2. Authenticate
gcloud auth login

# 3. Set project
gcloud config set project YOUR_PROJECT_ID

# 4. Deploy to Cloud Run
gcloud run deploy linkedin-hashtag-engine \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --set-env-vars NEXTAUTH_SECRET=xxx,NEXTAUTH_URL=xxx,GEMINI_API_KEY=xxx,LINKEDIN_CLIENT_ID=xxx,LINKEDIN_CLIENT_SECRET=xxx

# 5. Your app is now live! 🚀
# URL: https://linkedin-hashtag-engine-xxx-uc.a.run.app
```

### Google Container Registry

```bash
# 1. Tag image
docker tag linkedin-hashtag-engine gcr.io/YOUR_PROJECT_ID/linkedin-hashtag-engine

# 2. Configure Docker for GCR
gcloud auth configure-docker

# 3. Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/linkedin-hashtag-engine

# 4. Deploy to Cloud Run from GCR
gcloud run deploy linkedin-hashtag-engine \
  --image gcr.io/YOUR_PROJECT_ID/linkedin-hashtag-engine \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi
```

### AWS ECS / Fargate

```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name linkedin-hashtag-engine

# 2. Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# 3. Tag image
docker tag linkedin-hashtag-engine:latest \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/linkedin-hashtag-engine:latest

# 4. Push to ECR
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/linkedin-hashtag-engine:latest

# 5. Deploy to ECS Fargate
# Use AWS Console or CLI to create ECS service with the image
```

### Azure Container Apps

```bash
# 1. Create Azure Container Registry
az acr create --resource-group myResourceGroup \
  --name linkedinHashtagEngine \
  --sku Basic

# 2. Log in to ACR
az acr login --name linkedinHashtagEngine

# 3. Tag and push image
docker tag linkedin-hashtag-engine linkedinHashtagEngine.azurecr.io/linkedin-hashtag-engine:latest
docker push linkedinHashtagEngine.azurecr.io/linkedin-hashtag-engine:latest

# 4. Deploy to Azure Container Apps
az containerapp create \
  --name linkedin-hashtag-engine \
  --resource-group myResourceGroup \
  --image linkedinHashtagEngine.azurecr.io/linkedin-hashtag-engine:latest \
  --target-port 8080 \
  --ingress external \
  --env-vars NEXTAUTH_SECRET=xxx GEMINI_API_KEY=xxx
```

---

## Docker Architecture

### Production Dockerfile (Multi-Stage)

```
Stage 1: Dependencies (node:20-slim)
  ↓ Install production dependencies only
  
Stage 2: Builder (node:20-slim)
  ↓ Copy dependencies from Stage 1
  ↓ Build Next.js application
  
Stage 3: Runner (node:20-slim)
  ↓ Install Chromium for Puppeteer
  ↓ Copy build output from Stage 2
  ↓ Create non-root user for security
  ↓ Run application as non-root user
```

**Benefits:**
- Small final image size (~800MB with Chromium)
- Secure (non-root user)
- Fast builds (cached layers)
- Production-optimized

### Development Dockerfile

```
Single Stage (node:20-slim)
  ↓ Install Chromium
  ↓ Install all dependencies (including dev)
  ↓ Mount source code as volume
  ↓ Enable hot reload
```

**Benefits:**
- Hot reload enabled
- Fast development cycle
- Same environment as production

---

## Health Checks

### Endpoint

```
GET /api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-23T12:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### Docker Health Check

The Dockerfile includes automatic health checks:

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/api/health', ...)"
```

---

## Performance Optimization

### Image Size Comparison

| Configuration | Image Size | Notes |
|--------------|------------|-------|
| Without multi-stage | ~2.5GB | Includes build dependencies |
| With multi-stage | ~800MB | Production-optimized |
| Alpine-based | ~600MB | Smaller but may have issues |

### Build Time

- **First build:** ~5-8 minutes (downloading Chromium)
- **Cached build:** ~30 seconds (only changed layers)
- **Rebuild after code change:** ~1-2 minutes

### Memory Usage

- **Minimum:** 512MB (basic Next.js)
- **Recommended:** 2GB (with Puppeteer scraping)
- **Cloud Run default:** 2Gi

---

## Troubleshooting

### Problem: "Chromium not found"

**Solution:** Make sure Puppeteer environment variables are set:

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
```

### Problem: "Port 3000 already in use"

**Solution:** Change the port mapping in docker-compose.yml:

```yaml
ports:
  - "8080:8080"  # Use port 8080 instead of 3000
```

### Problem: "Next.js build fails"

**Solution:** Check for syntax errors in your code:

```bash
# Run linter
npm run lint

# Build locally first
npm run build
```

### Problem: "Container keeps restarting"

**Solution:** Check logs for errors:

```bash
docker-compose logs -f
```

### Problem: "Health check failing"

**Solution:** Verify the application is running:

```bash
# Check if port is listening
docker-compose exec app netstat -tuln | grep 8080

# Test health endpoint manually
docker-compose exec app curl http://localhost:8080/api/health
```

---

## Security Best Practices

### 1. Non-Root User

The production Dockerfile runs as a non-root user (`nextjs:nodejs`):

```dockerfile
USER nextjs
```

### 2. Minimal Base Image

Using `node:20-slim` reduces attack surface:

```dockerfile
FROM node:20-slim
```

### 3. Environment Variables

Never commit secrets to the repository:

```bash
# Add to .gitignore
.env
.env.local
.env.production
```

### 4. Health Checks

Enable monitoring with health checks:

```yaml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:8080/api/health"]
  interval: 30s
```

### 5. Resource Limits

Set resource limits to prevent DoS:

```yaml
deploy:
  resources:
    limits:
      cpus: '2.0'
      memory: 2G
```

---

## Cost Estimation

### Cloud Run (GCP)

- **Free tier:** 2M requests/month
- **Pricing:** $0.00002400/vCPU-second, $0.00000250/GiB-second
- **Estimated:** $5-20/month for small projects
- **Scales to zero:** Pay only when running

### AWS ECS Fargate

- **Pricing:** $0.04048/vCPU-hour, $0.004445/GB-hour
- **Estimated:** $30-60/month for 0.5 vCPU, 1GB RAM
- **Always on:** No scale-to-zero

### Azure Container Apps

- **Consumption plan:** Pay per request
- **Dedicated plan:** $50-100/month
- **Estimated:** $10-40/month for small projects
- **Scales to zero:** Available

---

## Support

For issues with Docker setup:

1. Check logs: `docker-compose logs -f`
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Open an issue: [GitHub Issues](https://github.com/saurav02022/linkedin-hashtag-refresh-engine/issues)

---

**Last Updated:** October 23, 2025  
**Maintained by:** Development Team

