# Quick Start Guide

Get SVES-DAQ up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm run install:all
```

## Step 2: Configure Firebase

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env`
2. Add your Firebase web app credentials

### Backend  
1. Copy `backend/.env.example` to `backend/.env`
2. Download Firebase service account key
3. Save it as `backend/config/firebase-service-account.json`
4. Or set `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` in `.env`

## Step 3: Start Development

```bash
npm run dev
```

Visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health

## What's Included

✅ **Frontend Dashboard** with 4 main pages:
- Dashboard Overview
- Test Data Management
- Analytics & Insights
- Compliance Management

✅ **Backend API** with endpoints for:
- Metrics and KPIs
- Test data CRUD
- Analytics aggregation
- Compliance tracking
- ML predictions

✅ **Firebase Integration** ready for:
- Firestore database
- Real-time data sync
- File storage

✅ **ML Foundation** prepared for:
- Performance predictions
- Risk analysis
- Design recommendations

## Next Steps

1. Set up Firebase Firestore collections (see `docs/SETUP.md`)
2. Add your ML models to `backend/src/services/mlService.ts`
3. Customize the dashboard for your specific use case
4. Add authentication if needed

For detailed setup, see `docs/SETUP.md`
For architecture details, see `docs/ARCHITECTURE.md`
