# Quick Deployment Setup

## For Vercel Deployment (Easiest)

### Step 1: Update Environment Variables

**In `Brainly-FrontEnd/.env.production`:**
```env
VITE_BACKEND_URL=https://your-backend-app.vercel.app
VITE_FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Step 2: Deploy Backend First

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. **Root Directory**: Select `Brainly-BackEnd`
5. **Framework Preset**: Other
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. **Install Command**: `npm install`
9. Add Environment Variables:
   - `MONGODB_URL`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
10. Click "Deploy"
11. **Copy the deployment URL** (e.g., `https://your-backend.vercel.app`)

### Step 3: Deploy Frontend

1. Create a new project in Vercel
2. Import same repository
3. **Root Directory**: Select `Brainly-FrontEnd`
4. **Framework Preset**: Vite
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Add Environment Variables:
   - `VITE_BACKEND_URL`: Paste your backend URL from Step 2
   - `VITE_FRONTEND_URL`: `https://your-app-name.vercel.app` (Vercel will show this)
8. Click "Deploy"

### Step 4: Update CORS (if needed)

If you get CORS errors, update `Brainly-BackEnd/src/index.ts`:

```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true
}));
```

Then redeploy the backend.

## MongoDB Atlas Setup

If you don't have MongoDB Atlas:

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user (remember username/password)
4. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Get connection string:
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with your database name
6. Use this in `MONGODB_URL`

## Testing After Deployment

1. Visit your frontend URL
2. Sign up / Sign in
3. Add some content
4. Click "Share Brain"
5. Verify the share link shows your production domain (not localhost)
6. Open share link in new tab/incognito
7. Verify content displays correctly

## Alternative: Railway Deployment

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Add your repository
5. Railway will auto-detect both frontend and backend
6. Add environment variables in the dashboard
7. Deploy both services

## Current State

✅ Your app is already configured for deployment
✅ Environment variables are set up
✅ Share links will automatically use production URLs
✅ Just need to add your actual deployment URLs in `.env.production`

No code changes needed! Just deploy and update environment variables! 🚀
