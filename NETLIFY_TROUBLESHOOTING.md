# Netlify Deployment Troubleshooting

## Connection Timeout Issues

If you see `ERR_CONNECTION_TIMED_OUT` when accessing your Netlify site:

### 1. Check Deployment Status

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Find your site in the list
3. Check the latest deployment:
   - **Building**: Wait for it to complete (usually 2-5 minutes)
   - **Failed**: Click on the deployment to see error logs
   - **Published**: Site should be accessible

### 2. Verify Site URL

Netlify generates a random site name. Your actual URL might be different:
- Check the Netlify dashboard for the exact URL
- It should look like: `https://random-name-12345.netlify.app`
- Or your custom domain if you've set one up

### 3. Check Build Logs

If deployment failed:
1. Click on the failed deployment
2. Scroll through the build logs
3. Look for errors like:
   - TypeScript compilation errors
   - Missing dependencies
   - Build command failures
   - Environment variable issues

### 4. Common Build Errors

**TypeScript Errors:**
- Fix all TypeScript errors locally first
- Run `cd frontend && npm run build` to verify
- Commit and push fixes

**Missing Environment Variables:**
- Go to Site Settings → Environment Variables
- Ensure `VITE_API_BASE_URL` is set
- Value should be: `https://sves-daq.onrender.com/api`

**Build Command Issues:**
- Verify `netlify.toml` is correct
- Build command: `cd frontend && npm install && npm run build`
- Publish directory: `frontend/dist`

### 5. Retry Deployment

1. Go to Deploys tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for build to complete
4. Check the new deployment status

### 6. Verify Build Locally

Before deploying, test the build locally:

```bash
cd frontend
npm install
npm run build
```

If this fails locally, it will fail on Netlify too.

### 7. Check Netlify Status

Sometimes Netlify has service issues:
- Check [Netlify Status Page](https://www.netlifystatus.com/)
- Check [Netlify Community](https://community.netlify.com/) for known issues

## Quick Fixes

### Force Rebuild
1. Go to Deploys tab
2. Click "Trigger deploy" → "Clear cache and deploy site"

### Check Site Settings
1. Site Settings → Build & Deploy
2. Verify:
   - Base directory: (leave empty or set to root)
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`

### Verify Environment Variables
1. Site Settings → Environment Variables
2. Ensure `VITE_API_BASE_URL` is set correctly
3. Value: `https://sves-daq.onrender.com/api`
4. Make sure it's set for "Production" environment

## Still Having Issues?

1. Check the exact error in Netlify build logs
2. Verify your GitHub repository is connected correctly
3. Ensure all code is pushed to the `main` branch
4. Try clearing Netlify cache and redeploying
