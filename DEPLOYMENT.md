# Deployment Guide

This guide covers deploying the SVES-DAQ application to Netlify (frontend) and Render (backend).

## Architecture

- **Frontend**: React + Vite → Deployed on Netlify
- **Backend**: Express + TypeScript → Deployed on Render
- **Database**: Firebase Firestore

## Prerequisites

1. GitHub account with repository pushed
2. Netlify account (free tier available)
3. Render account (free tier available)
4. Firebase project with Firestore enabled

## Frontend Deployment (Netlify)

### Step 1: Connect Repository to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will auto-detect the `netlify.toml` configuration

### Step 2: Configure Build Settings

Netlify should auto-detect:
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`

### Step 3: Set Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
```

Replace `your-backend-name` with your actual Render service name.

### Step 4: Deploy

Click "Deploy site" and Netlify will build and deploy your frontend.

## Backend Deployment (Render)

### Step 1: Connect Repository to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect the `render.yaml` configuration

### Step 2: Configure Service Settings

- **Name**: `sves-daq-backend` (or your preferred name)
- **Environment**: Node
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
- **Instance Type**: Free tier is sufficient for development

### Step 3: Set Environment Variables

In Render Dashboard → Environment, add:

#### Required Variables:

1. **FIREBASE_SERVICE_ACCOUNT** (Recommended)
   - Copy the entire contents of `backend/config/firebase-service-account.json`
   - Convert to a single-line JSON string (remove all newlines)
   - Paste as the value
   - Example: `{"type":"service_account","project_id":"your-project",...}`

   **To convert JSON to single line:**
   ```bash
   # On Windows PowerShell:
   (Get-Content backend/config/firebase-service-account.json -Raw) -replace "`r`n", "" -replace " ", ""
   
   # On Linux/Mac:
   cat backend/config/firebase-service-account.json | jq -c
   ```

2. **NODE_ENV**: `production`
3. **PORT**: `3000` (Render sets this automatically, but you can override)

#### Alternative: Using File Path

If you prefer using a file path instead:

1. Upload `firebase-service-account.json` to Render's file system
2. Set **FIREBASE_SERVICE_ACCOUNT_KEY_PATH**: `/path/to/firebase-service-account.json`

**Note**: Using the JSON string (FIREBASE_SERVICE_ACCOUNT) is recommended as it's more secure and easier to manage.

### Step 4: Deploy

Click "Create Web Service" and Render will build and deploy your backend.

## Post-Deployment

### 1. Update Frontend API URL

After backend is deployed, update the Netlify environment variable:
```
VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
```

Then trigger a new deployment in Netlify.

### 2. Test the Deployment

1. Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
2. Check browser console for any API connection errors
3. Test key features:
   - Dashboard loads
   - API calls work
   - Data displays correctly

### 3. Seed Initial Data (Optional)

To populate Firebase with initial data:

1. SSH into your Render instance (if available) or run locally with Render's environment variables
2. Run the seed script:
   ```bash
   cd backend
   npm run seed
   ```

   Or set environment variables locally and run:
   ```bash
   export FIREBASE_SERVICE_ACCOUNT='<your-json-string>'
   export FIREBASE_PROJECT_ID='<your-project-id>'
   cd backend
   npm run seed
   ```

## Troubleshooting

### Backend Build Fails

- Check TypeScript compilation errors: `cd backend && npm run build`
- Ensure all dependencies are in `package.json`
- Check Render build logs for specific errors

### Frontend Can't Connect to Backend

- Verify `VITE_API_BASE_URL` is set correctly in Netlify
- Check CORS settings in backend (should allow Netlify domain)
- Verify backend is running and accessible
- Check browser console for CORS errors

### Firebase Connection Issues

- Verify `FIREBASE_SERVICE_ACCOUNT` is set correctly (single-line JSON)
- Check Firebase project ID matches
- Ensure Firestore API is enabled in Firebase Console
- Check Render logs for Firebase initialization errors

### Environment Variables Not Working

- Restart the service after adding environment variables
- Verify variable names match exactly (case-sensitive)
- Check for typos in JSON strings

## Continuous Deployment

Both Netlify and Render support automatic deployments:
- **Netlify**: Deploys on every push to `main` branch
- **Render**: Deploys on every push to `main` branch (if configured)

## Security Notes

1. **Never commit** `firebase-service-account.json` to Git (already in `.gitignore`)
2. Use environment variables for all sensitive data
3. Enable HTTPS (automatic on both platforms)
4. Review Firebase security rules for Firestore

## Cost

- **Netlify**: Free tier includes 100GB bandwidth/month
- **Render**: Free tier includes 750 hours/month (sleeps after 15 min inactivity)
- **Firebase**: Free tier includes 1GB storage, 50K reads/day

For production, consider upgrading to paid tiers for:
- Always-on backend (Render)
- More bandwidth (Netlify)
- Higher Firebase quotas
