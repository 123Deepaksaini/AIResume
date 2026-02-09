# Vercel Deployment Instructions

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd Frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://airesumebuilder-production-7ae8.up.railway.app/`
7. Click "Deploy"

## Environment Variables

In Vercel dashboard, add these environment variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_URL` | `https://airesumebuilder-production-7ae8.up.railway.app/` | Production, Preview, Development |

## CORS Configuration

Make sure your backend allows requests from your Vercel frontend URL. Update CORS configuration in `Backend/src/main/java/com/resume/backend/config/WebConfig.java`:

```java
corsConfiguration.addAllowedOrigin("https://your-vercel-frontend.vercel.app");
```
