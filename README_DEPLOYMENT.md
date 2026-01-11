# Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] TypeScript compilation errors fixed
- [x] Build scripts configured (`npm run build`)
- [x] Environment variables documented
- [x] CORS configured for production
- [x] Deployment config files created (`netlify.toml`, `render.yaml`)

## 🚀 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### 2. Deploy Backend (Render)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. **Important**: Set environment variable:
   - Key: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Copy entire JSON from `backend/config/firebase-service-account.json` as single line
6. Click "Create Web Service"
7. Wait for build to complete
8. Copy your backend URL (e.g., `https://sves-daq-backend.onrender.com`)

### 3. Deploy Frontend (Netlify)

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will auto-detect `netlify.toml`
5. **Important**: Set environment variable:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://your-backend-name.onrender.com/api` (use your Render URL)
6. Click "Deploy site"
7. Wait for build to complete
8. Copy your frontend URL (e.g., `https://your-site.netlify.app`)

### 4. Update Backend CORS (if needed)

If you want to restrict CORS to your Netlify domain only, update `backend/src/index.ts`:

```typescript
const corsOptions = {
  origin: ['https://your-site.netlify.app'],
  credentials: true,
}
```

Then redeploy backend.

## 🔧 Converting Firebase JSON to Single Line

**Windows PowerShell:**
```powershell
(Get-Content backend/config/firebase-service-account.json -Raw) -replace "`r`n", "" -replace "`n", ""
```

**Linux/Mac:**
```bash
cat backend/config/firebase-service-account.json | jq -c
```

Or manually: Copy the JSON, remove all line breaks and extra spaces.

## 📝 Environment Variables Summary

### Render (Backend)
- `FIREBASE_SERVICE_ACCOUNT`: Full JSON as single line string
- `NODE_ENV`: `production`
- `PORT`: `3000` (auto-set by Render)

### Netlify (Frontend)
- `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api`

## 🧪 Testing After Deployment

1. Visit your Netlify URL
2. Open browser console (F12)
3. Check for API errors
4. Test key features:
   - Dashboard loads
   - Data displays
   - API calls succeed

## 🐛 Common Issues

**Backend build fails:**
- Check Render build logs
- Verify TypeScript compiles: `cd backend && npm run build`

**Frontend can't connect:**
- Verify `VITE_API_BASE_URL` is correct
- Check backend is running (visit Render URL/health)
- Check CORS settings

**Firebase errors:**
- Verify `FIREBASE_SERVICE_ACCOUNT` is valid JSON (single line)
- Check Firebase project ID matches
- Ensure Firestore API is enabled

## 📚 Full Documentation

See `DEPLOYMENT.md` for detailed deployment guide.
