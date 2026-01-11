# Firebase Setup Instructions

## Current Status

❌ **Firestore API is not enabled** in your Firebase project `sves-daq`

## Steps to Enable Firestore

### Step 1: Enable Firestore API

1. Visit this URL (or click the link from the error):
   ```
   https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=sves-daq
   ```

2. Click the **"Enable"** button

3. Wait 2-3 minutes for the API to be activated

### Step 2: Create Firestore Database

1. Go to Firebase Console: https://console.firebase.google.com/project/sves-daq
2. Click on **"Firestore Database"** in the left menu
3. Click **"Create database"**
4. Choose **"Start in production mode"** (you can set security rules later)
5. Select a location (choose closest to your region)
6. Click **"Enable"**

### Step 3: Set Security Rules (Optional for Development)

For development, you can use these permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning**: These rules allow anyone to read/write. Only use for development!

### Step 4: Run Seed Script Again

After enabling Firestore, run:

```powershell
cd backend
$env:GOOGLE_APPLICATION_CREDENTIALS = (Resolve-Path "config/firebase-service-account.json").Path
$env:FIREBASE_PROJECT_ID = "sves-daq"
npm run seed
```

## What Will Be Created

Once Firestore is enabled and you run the seed script, it will create:

- ✅ **programs** collection (1 document)
- ✅ **vehicles** collection (1 document)
- ✅ **tests** collection (6 documents)
- ✅ **sensors** collection (20 documents)
- ✅ **streams** collection (multiple time-series documents)
- ✅ **events** collection (8 documents)
- ✅ **kpis** collection (10 documents)
- ✅ **ml_predictions** collection (1 document)

## Verify Data Was Uploaded

After running the seed script successfully, you should see:

```
Seed complete.
Created/updated collections: programs, vehicles, tests, sensors, streams, events, kpis, ml_predictions
Example doc IDs:
  programs/baja_2026
  tests/endurance_01
  streams/endurance_01_strain_FLCA_L_c01
  kpis/endurance_01_executive
```

You can then verify in Firebase Console under Firestore Database.
