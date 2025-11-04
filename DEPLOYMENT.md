# Deployment Guide

## Environment Variables Setup

### Frontend (Vite)

Create a `.env.production` file in the `Brainly-FrontEnd` directory:

```env
VITE_BACKEND_URL=https://your-backend-domain.com
VITE_FRONTEND_URL=https://your-frontend-domain.com
```

### Backend (Node.js)

Your backend already uses environment variables. Make sure your production environment has:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Deployment Platforms

### Option 1: Vercel (Recommended for Frontend)

**Frontend:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Framework Preset: Vite
5. Root Directory: `Brainly-FrontEnd`
6. Add environment variables:
   - `VITE_BACKEND_URL`: Your backend URL
   - `VITE_FRONTEND_URL`: Your Vercel domain (e.g., https://yourapp.vercel.app)
7. Deploy

**Backend:**
1. Root Directory: `Brainly-BackEnd`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Install Command: `npm install`
5. Add environment variables (MONGODB_URL, JWT_SECRET)

### Option 2: Render

**Frontend:**
1. New Static Site
2. Build Command: `cd Brainly-FrontEnd && npm install && npm run build`
3. Publish Directory: `Brainly-FrontEnd/dist`
4. Add environment variables

**Backend:**
1. New Web Service
2. Build Command: `cd Brainly-BackEnd && npm install && npm run build`
3. Start Command: `cd Brainly-BackEnd && npm start`
4. Add environment variables

### Option 3: Railway

**Frontend:**
1. Add to Railway
2. Root Directory: `Brainly-FrontEnd`
3. Build Command: `npm run build`
4. Start Command: `npm run preview`

**Backend:**
1. Add to Railway
2. Root Directory: `Brainly-BackEnd`
3. Build Command: `npm run build`
4. Start Command: `npm start`

## Using Vercel (Detailed Steps)

Since you already have `vercel.json` files, here's how to deploy:

### Frontend Deployment:

1. **Update `.env.production`** in `Brainly-FrontEnd`:
   ```env
   VITE_BACKEND_URL=https://your-backend.vercel.app
   VITE_FRONTEND_URL=https://your-frontend.vercel.app
   ```

2. **Install Vercel CLI** (optional but helpful):
   ```bash
   npm install -g vercel
   ```

3. **Deploy from Brainly-FrontEnd directory**:
   ```bash
   cd Brainly-FrontEnd
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_BACKEND_URL` and `VITE_FRONTEND_URL`

### Backend Deployment:

1. **Update Backend URL** in your backend if needed

2. **Deploy from Brainly-BackEnd directory**:
   ```bash
   cd Brainly-BackEnd
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `MONGODB_URL`: Your MongoDB connection string (use MongoDB Atlas)
   - `JWT_SECRET`: Your secret key

4. **Enable CORS** - Your backend already has CORS enabled, but make sure it allows your frontend domain

## After Deployment

1. **Update Frontend Environment Variables** with actual deployed URLs
2. **Test the Share Brain Feature**:
   - Create content
   - Click "Share Brain"
   - Copy the link
   - Open in incognito/another browser
   - Verify it shows: `https://your-domain.com/brain/xxxxxxxxxx`

3. **Update Backend CORS** if needed:
   ```typescript
   app.use(cors({
     origin: ['https://your-frontend-domain.com'],
     credentials: true
   }));
   ```

## MongoDB Atlas Setup (If not done)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for serverless deployment
5. Get connection string and add to backend environment variables

## Troubleshooting

- **Share links show localhost**: Update `VITE_FRONTEND_URL` in production environment
- **CORS errors**: Add your frontend domain to backend CORS configuration
- **Database connection fails**: Check MongoDB Atlas whitelist and connection string
- **Environment variables not working**: Rebuild and redeploy after adding variables

## Current Configuration

Your app will automatically:
- Use `localhost` URLs in development
- Use production URLs when deployed (from environment variables)
- Generate share links with the correct domain

No code changes needed after setting environment variables! 🚀
