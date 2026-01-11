# SVES-DAQ Setup Guide

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Firebase Project**: A Firebase project with Firestore and Storage enabled
- **Firebase Service Account**: Service account key for backend authentication

## Initial Setup

### 1. Install Dependencies

From the root directory, run:

```bash
npm run install:all
```

This will install dependencies for the root workspace, frontend, and backend.

### 2. Firebase Configuration

#### Frontend Configuration

1. Copy `frontend/.env.example` to `frontend/.env`
2. Fill in your Firebase web app credentials:
   - Get these from Firebase Console > Project Settings > General > Your apps > Web app

#### Backend Configuration

1. Copy `backend/.env.example` to `backend/.env`
2. Set up Firebase Admin SDK using one of these methods:

   **Option A: Service Account Key File (Recommended for Development)**
   - Download your service account key from Firebase Console > Project Settings > Service Accounts
   - Save it as `backend/config/firebase-service-account.json`
   - Set `FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./config/firebase-service-account.json` in `backend/.env`

   **Option B: Environment Variable**
   - Copy the entire service account JSON
   - Set it as `FIREBASE_SERVICE_ACCOUNT` in `backend/.env` (as a JSON string)

   **Option C: Application Default Credentials (For GCP/Cloud Run)**
   - No configuration needed if running on Google Cloud Platform

### 3. Firebase Firestore Setup

Create the following collections in Firestore:

- `testData` - Stores test records
- `metrics` - Stores dashboard metrics
- `compliance` - Stores compliance records
- `mlModels` - Stores ML model metadata (optional)

### 4. Start Development Servers

```bash
npm run dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
SVES-DAQ/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and Firebase services
│   │   └── App.tsx        # Main app component
│   └── package.json
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic and ML services
│   │   ├── middleware/    # Express middleware
│   │   └── index.ts       # Server entry point
│   └── package.json
└── docs/                  # Documentation
```

## Development Workflow

### Frontend Development

- Run `npm run dev:frontend` to start only the frontend
- Hot reload is enabled by default
- API calls are proxied to backend via Vite proxy configuration

### Backend Development

- Run `npm run dev:backend` to start only the backend
- Uses `tsx watch` for hot reload
- TypeScript is compiled on-the-fly

### Building for Production

```bash
npm run build
```

This builds both frontend and backend:
- Frontend: Outputs to `frontend/dist/`
- Backend: Outputs to `backend/dist/`

## API Endpoints

### Metrics
- `GET /api/metrics/dashboard` - Get dashboard metrics

### Test Data
- `GET /api/test-data` - List test data (supports `domain` and `limit` query params)
- `POST /api/test-data` - Create new test record

### Analytics
- `GET /api/analytics` - Get analytics data (supports `domain` query param)

### Compliance
- `GET /api/compliance` - List compliance records
- `POST /api/compliance` - Create compliance record

### ML/AI
- `POST /api/ml/predict` - Generate performance predictions
- `POST /api/ml/analyze-risk` - Analyze risk factors
- `POST /api/ml/recommendations` - Get design recommendations

## ML/AI Integration

The ML service (`backend/src/services/mlService.ts`) is set up for integration with:

- **TensorFlow.js**: For browser and Node.js ML models
- **Python ML APIs**: Can be integrated via HTTP calls
- **Custom Models**: Extend the service to load your trained models

Current implementation includes placeholder logic that can be replaced with actual ML model inference.

## Troubleshooting

### Firebase Connection Issues

1. Verify your service account key has the correct permissions
2. Check that Firestore is enabled in Firebase Console
3. Ensure environment variables are set correctly

### Port Conflicts

- Frontend port: Change in `frontend/vite.config.ts`
- Backend port: Change `PORT` in `backend/.env`

### TypeScript Errors

- Run `npm run build` to check for type errors
- Ensure all dependencies are installed

## Next Steps

1. **Configure Firebase Security Rules**: Set up Firestore security rules for production
2. **Add Authentication**: Integrate Firebase Auth for user management
3. **Deploy ML Models**: Train and deploy your predictive models
4. **Set Up CI/CD**: Configure deployment pipelines
5. **Add Tests**: Write unit and integration tests
