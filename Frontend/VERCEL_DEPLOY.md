# Vercel Deployment Instructions

## Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: `Vite`
   - Build Command: `cd Frontend && npm install && npm run build`
   - Output Directory: `Frontend/dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://airesumebuilder-production-7ae8.up.railway.app/`
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod --yes
```

## Environment Variables

In Vercel dashboard, add these environment variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_API_URL` | `https://airesumebuilder-production-7ae8.up.railway.app/` | Production, Preview, Development |

## Project Structure

The project has a monorepo structure with:
- **Frontend**: React/Vite app in `Frontend/` directory
- **Backend**: Spring Boot app in `Backend/` directory

Vercel will deploy only the Frontend. The Backend should be deployed separately (e.g., on Railway, Render, or Heroku).

## CORS Configuration

Make sure your backend allows requests from your Vercel frontend URL. Update CORS configuration in `Backend/src/main/java/com/resume/backend/config/WebConfig.java`:

```java
corsConfiguration.addAllowedOriginPattern("https://ai-resume-builder*.vercel.app");
```
