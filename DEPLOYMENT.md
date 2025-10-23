# GCP Deployment Guide

This guide covers deploying the LinkedIn Hashtag Refresh Engine to Google Cloud Platform using Docker.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Cloud CLI** (`gcloud`) installed
   ```bash
   # Install gcloud CLI
   # https://cloud.google.com/sdk/docs/install
   ```
3. **Docker** installed locally (for testing)
4. **Project requirements**:
   - LinkedIn OAuth credentials
   - Gemini API key
   - NextAuth secret

---

## Option 1: Deploy to Cloud Run (Recommended)

**Best for**: Automatic scaling, pay-per-use, serverless

### 1. Setup GCP Project

```bash
# Set your project ID
PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com
```

### 2. Create Environment Variables

Create a `.env.production` file:

```env
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-cloudrun-url.run.app
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=https://your-cloudrun-url.run.app
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Build and Deploy

```bash
# Set your region
REGION="us-central1"

# Deploy to Cloud Run
gcloud run deploy linkedin-hashtag-engine \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --max-instances 10 \
  --min-instances 0 \
  --set-env-vars "$(cat .env.production | grep -v '^#' | xargs | tr ' ' ',')"

# Or set env vars individually
gcloud run deploy linkedin-hashtag-engine \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300 \
  --set-env-vars \
    NEXTAUTH_SECRET="your-secret" \
    NEXTAUTH_URL="https://your-url.run.app" \
    LINKEDIN_CLIENT_ID="your-client-id" \
    LINKEDIN_CLIENT_SECRET="your-client-secret" \
    GEMINI_API_KEY="your-api-key" \
    NEXT_PUBLIC_APP_URL="https://your-url.run.app"
```

### 4. Update NEXTAUTH_URL

After first deployment, get your Cloud Run URL:
```bash
SERVICE_URL=$(gcloud run services describe linkedin-hashtag-engine \
  --region $REGION \
  --format 'value(status.url)')
echo "Your app URL: $SERVICE_URL"
```

Update the environment variables with the actual URL:
```bash
gcloud run services update linkedin-hashtag-engine \
  --region $REGION \
  --set-env-vars \
    NEXTAUTH_URL="$SERVICE_URL" \
    NEXT_PUBLIC_APP_URL="$SERVICE_URL"
```

### 5. Configure LinkedIn OAuth

Update your LinkedIn app settings:
- **Redirect URLs**: Add `https://your-cloudrun-url.run.app/api/auth/callback/linkedin`

---

## Option 2: Deploy to Compute Engine

**Best for**: More control, consistent pricing, long-running instances

### 1. Create VM Instance

```bash
# Create a VM with Container-Optimized OS
gcloud compute instances create-with-container linkedin-hashtag-vm \
  --zone=us-central1-a \
  --machine-type=e2-standard-2 \
  --boot-disk-size=20GB \
  --boot-disk-type=pd-standard \
  --container-image=gcr.io/$PROJECT_ID/linkedin-hashtag-engine:latest \
  --container-env-file=.env.production \
  --tags=http-server,https-server
```

### 2. Configure Firewall

```bash
# Allow HTTP/HTTPS traffic
gcloud compute firewall-rules create allow-http \
  --allow tcp:80 \
  --target-tags http-server

gcloud compute firewall-rules create allow-https \
  --allow tcp:443 \
  --target-tags https-server
```

### 3. Setup Load Balancer (Optional)

For production with SSL:
```bash
# Reserve static IP
gcloud compute addresses create linkedin-hashtag-ip --global

# Create backend service and configure load balancer
# (Follow GCP Load Balancer documentation)
```

---

## Option 3: Deploy to GKE (Kubernetes)

**Best for**: Multiple services, complex infrastructure, high availability

### 1. Create GKE Cluster

```bash
gcloud container clusters create linkedin-hashtag-cluster \
  --zone us-central1-a \
  --num-nodes 2 \
  --machine-type e2-standard-2
```

### 2. Build and Push Docker Image

```bash
# Build image
docker build -t gcr.io/$PROJECT_ID/linkedin-hashtag-engine:latest .

# Push to Google Container Registry
docker push gcr.io/$PROJECT_ID/linkedin-hashtag-engine:latest
```

### 3. Create Kubernetes Deployment

Create `k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: linkedin-hashtag-engine
spec:
  replicas: 2
  selector:
    matchLabels:
      app: linkedin-hashtag-engine
  template:
    metadata:
      labels:
        app: linkedin-hashtag-engine
    spec:
      containers:
      - name: app
        image: gcr.io/PROJECT_ID/linkedin-hashtag-engine:latest
        ports:
        - containerPort: 8080
        env:
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: nextauth-secret
        - name: NEXTAUTH_URL
          value: "https://your-domain.com"
        # Add other env vars...
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
---
apiVersion: v1
kind: Service
metadata:
  name: linkedin-hashtag-service
spec:
  type: LoadBalancer
  selector:
    app: linkedin-hashtag-engine
  ports:
  - port: 80
    targetPort: 8080
```

Deploy:
```bash
kubectl apply -f k8s-deployment.yaml
```

---

## Local Docker Testing

Test your Docker setup locally before deploying:

```bash
# Build the image
docker build -t linkedin-hashtag-engine .

# Run locally
docker run -p 3000:8080 \
  -e NEXTAUTH_SECRET="test-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e LINKEDIN_CLIENT_ID="your-client-id" \
  -e LINKEDIN_CLIENT_SECRET="your-client-secret" \
  -e GEMINI_API_KEY="your-api-key" \
  -e NEXT_PUBLIC_APP_URL="http://localhost:3000" \
  linkedin-hashtag-engine

# Or use docker-compose
docker-compose up
```

Open http://localhost:3000

---

## CI/CD with Cloud Build

Create `cloudbuild.yaml`:

```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/linkedin-hashtag-engine:$COMMIT_SHA', '.']
  
  # Push the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/linkedin-hashtag-engine:$COMMIT_SHA']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'linkedin-hashtag-engine'
      - '--image=gcr.io/$PROJECT_ID/linkedin-hashtag-engine:$COMMIT_SHA'
      - '--region=us-central1'
      - '--platform=managed'
      - '--allow-unauthenticated'

images:
  - 'gcr.io/$PROJECT_ID/linkedin-hashtag-engine:$COMMIT_SHA'
```

Connect to GitHub:
```bash
# Connect repository
gcloud builds triggers create github \
  --repo-name=linkedin-hashtag-refresh-engine-app \
  --repo-owner=YOUR_GITHUB_USERNAME \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

---

## Monitoring & Logging

### View Logs
```bash
# Cloud Run logs
gcloud run logs read linkedin-hashtag-engine \
  --region $REGION \
  --limit 50

# Follow logs in real-time
gcloud run logs tail linkedin-hashtag-engine --region $REGION
```

### Setup Alerts
```bash
# Create alert for high error rate
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="High Error Rate" \
  --condition-display-name="Error rate > 5%" \
  --condition-threshold-value=0.05
```

---

## Costs Estimation

### Cloud Run (Recommended)
- **Free tier**: 2M requests/month, 360,000 GB-seconds/month
- **After free tier**: ~$0.40 per million requests
- **Memory**: $0.0000025 per GB-second
- **Estimated**: $10-50/month for moderate traffic

### Compute Engine
- **e2-standard-2**: ~$48/month (running 24/7)
- **Storage**: ~$2/month (20GB)
- **Traffic**: First 1TB free
- **Estimated**: $50-100/month

---

## Troubleshooting

### Puppeteer Issues
```bash
# Check if Chromium is installed in container
docker run linkedin-hashtag-engine which chromium

# Test Puppeteer in container
docker run linkedin-hashtag-engine node -e "require('puppeteer').launch().then(b => b.close())"
```

### Memory Issues
```bash
# Increase memory allocation (Cloud Run)
gcloud run services update linkedin-hashtag-engine \
  --region $REGION \
  --memory 4Gi
```

### Environment Variables
```bash
# List current env vars
gcloud run services describe linkedin-hashtag-engine \
  --region $REGION \
  --format="yaml(spec.template.spec.containers[0].env)"
```

---

## Security Best Practices

1. **Use Secret Manager** for sensitive data:
   ```bash
   # Create secret
   echo -n "your-secret" | gcloud secrets create nextauth-secret --data-file=-
   
   # Grant access to Cloud Run
   gcloud secrets add-iam-policy-binding nextauth-secret \
     --member=serviceAccount:SERVICE_ACCOUNT \
     --role=roles/secretmanager.secretAccessor
   ```

2. **Enable IAM Authentication** for production
3. **Use Cloud CDN** for static assets
4. **Enable Cloud Armor** for DDoS protection
5. **Regular security updates**:
   ```bash
   # Rebuild with latest base image
   docker build --no-cache -t linkedin-hashtag-engine .
   ```

---

## Support

For issues or questions:
- Check logs first
- Review [Next.js Docker docs](https://nextjs.org/docs/deployment#docker-image)
- Review [Cloud Run docs](https://cloud.google.com/run/docs)
- Open an issue on GitHub

