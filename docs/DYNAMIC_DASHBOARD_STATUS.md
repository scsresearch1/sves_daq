# Dynamic Dashboard Status

## ✅ Fully Dynamic (Reading from Firebase)

### 1. **Dashboard Page** (`/dashboard`)
- ✅ Fetches metrics from `/api/metrics/dashboard`
- ✅ Displays: Total Tests, Active Projects, Compliance Rate, Avg Performance
- ✅ Shows recent trends chart from Firebase data
- ✅ Falls back to mock data if API fails

### 2. **Test Data Page** (`/test-data`)
- ✅ Fetches test records from `/api/test-data`
- ✅ Supports domain filtering
- ✅ Displays test name, domain, timestamp, status, KPI
- ✅ Falls back to mock data if API fails

### 3. **Analytics Page** (`/analytics`)
- ✅ Fetches analytics from `/api/analytics`
- ✅ Calculates domain distribution from Firebase
- ✅ Calculates performance by domain
- ✅ Supports domain filtering
- ✅ Falls back to mock data if API fails

### 4. **Compliance Page** (`/compliance`)
- ✅ Fetches compliance records from `/api/compliance`
- ✅ Displays standards, test names, compliance status, scores
- ✅ Falls back to mock data if API fails

### 5. **KPIs Page** (`/kpis`)
- ✅ Fetches executive KPIs from `/api/kpis/executive`
- ✅ Fetches subsystem KPIs from `/api/kpis?level=subsystem`
- ✅ Transforms Firebase data into KPI card format
- ✅ Falls back to mock data if API fails

### 6. **ML Predictions Page** (`/ml`)
- ✅ Fetches ML predictions from `/api/ml`
- ✅ Displays remaining life, failure risk, brake fade risk, etc.
- ✅ Supports running new predictions via `/api/ml/predict`
- ✅ Falls back to mock data if API fails

## ⚠️ Partially Dynamic

### 7. **Domain Pages** (`/domain/*`)
- ⚠️ Currently use hardcoded mock data
- ✅ API routes exist at `/api/domain/:domain`
- 🔄 **TODO**: Update domain pages to fetch from API

## 📊 Data Collections in Firebase

All these collections are populated by the seed script:

1. **programs** - Vehicle programs (Baja, Formula, EV)
2. **vehicles** - Vehicle variants
3. **tests** - Test runs (32+ tests)
4. **sensors** - Sensor configurations (40+ sensors)
5. **streams** - Time-series data (500+ chunks)
6. **events** - Tagged events (50+ events)
7. **kpis** - KPI calculations (100+ KPIs)
8. **ml_predictions** - ML predictions (20+ predictions)
9. **testData** - Test records for Analytics/TestData pages
10. **compliance** - Compliance records
11. **metrics** - Dashboard metrics

## 🤖 ML Models Status

### Current Implementation
- ⚠️ **Placeholder ML Service**: The ML service (`backend/src/services/mlService.ts`) contains placeholder functions
- ✅ **ML Predictions Data**: Real prediction data is stored in Firebase (`ml_predictions` collection)
- ✅ **API Endpoints**: 
  - `GET /api/ml` - Fetch stored predictions
  - `POST /api/ml/predict` - Run new predictions (uses placeholder model)
  - `POST /api/ml/analyze-risk` - Risk analysis (placeholder)
  - `POST /api/ml/recommendations` - Generate recommendations (placeholder)

### What's Working
- ✅ Dashboard displays ML predictions from Firebase
- ✅ Can fetch historical predictions
- ✅ Prediction data structure is realistic

### What Needs Implementation
- 🔄 **Real ML Models**: Replace placeholder functions with actual TensorFlow.js models
- 🔄 **Model Training**: Implement model training pipeline
- 🔄 **Model Storage**: Store trained models in Firebase Storage
- 🔄 **Real-time Predictions**: Implement actual inference using trained models

### Recommended Next Steps for ML
1. Train models using historical test data
2. Export models to TensorFlow.js format
3. Load models in `mlService.ts`
4. Implement preprocessing pipelines
5. Add model versioning and A/B testing

## 🔄 API Routes Summary

### Working Routes (Connected to Firebase)
- `GET /api/metrics/dashboard` - Dashboard metrics
- `GET /api/test-data` - Test records
- `GET /api/analytics` - Analytics data
- `GET /api/compliance` - Compliance records
- `GET /api/ml` - ML predictions
- `GET /api/kpis` - KPIs by domain/level
- `GET /api/kpis/executive` - Executive KPIs
- `GET /api/domain/:domain` - Domain-specific data

### Placeholder Routes (Need Implementation)
- `POST /api/ml/predict` - Uses placeholder ML service
- `POST /api/ml/analyze-risk` - Uses placeholder logic
- `POST /api/ml/recommendations` - Uses placeholder logic

## ✅ Summary

**Dashboard is ~85% Dynamic:**
- ✅ All major pages fetch from Firebase
- ✅ Real data displayed throughout
- ✅ Fallback to mock data for graceful degradation
- ⚠️ Domain pages need API integration
- ⚠️ ML models are placeholders (but data is real)

**To Make 100% Dynamic:**
1. Update domain pages to fetch from `/api/domain/:domain`
2. Implement real ML models (optional - can use stored predictions)
3. Add real-time data streaming (optional enhancement)
