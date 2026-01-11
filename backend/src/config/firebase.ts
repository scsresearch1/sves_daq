import admin from 'firebase-admin'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

let firebaseInitialized = false

export function initializeFirebase() {
  if (firebaseInitialized) {
    return admin.app()
  }

  try {
    // Option 1: Use service account key file path
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
      // Resolve the path (handles both relative and absolute paths)
      const serviceAccountPath = path.isAbsolute(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
        ? process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
        : path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
      
      // Read and parse JSON file (ES module compatible)
      const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8')
      const serviceAccount = JSON.parse(serviceAccountJson)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
      firebaseInitialized = true
      console.log('✅ Firebase Admin initialized successfully')
      return admin.app()
    }
    // Option 2: Use service account JSON as environment variable
    else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
      firebaseInitialized = true
      console.log('✅ Firebase Admin initialized successfully')
      return admin.app()
    }
    // Option 3: Use default credentials (for GCP environments)
    else {
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        })
        firebaseInitialized = true
        console.log('✅ Firebase Admin initialized successfully (using default credentials)')
        return admin.app()
      } catch (defaultError) {
        console.warn('⚠️  Firebase Admin not configured. Server will run but Firebase features will be unavailable.')
        console.warn('   To enable Firebase, set FIREBASE_SERVICE_ACCOUNT_KEY_PATH or FIREBASE_SERVICE_ACCOUNT in .env')
        firebaseInitialized = false
        return null
      }
    }
  } catch (error) {
    console.warn('⚠️  Firebase Admin initialization failed. Server will run but Firebase features will be unavailable.')
    console.warn('   Error:', (error as Error).message)
    firebaseInitialized = false
    return null
  }
}

export { admin }

// Lazy initialization of Firestore and Storage to handle missing Firebase config
let _db: any = null
let _storage: any = null

export const db = new Proxy({} as any, {
  get(target, prop) {
    if (!firebaseInitialized || !admin.apps.length) {
      throw new Error('Firebase is not initialized. Please configure Firebase credentials in .env')
    }
    if (!_db) {
      _db = admin.firestore()
    }
    return _db[prop as string]
  }
})

export const storage = new Proxy({} as any, {
  get(target, prop) {
    if (!firebaseInitialized || !admin.apps.length) {
      throw new Error('Firebase is not initialized. Please configure Firebase credentials in .env')
    }
    if (!_storage) {
      _storage = admin.storage()
    }
    return _storage[prop as string]
  }
})
