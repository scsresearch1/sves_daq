import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import { db, admin } from '../config/firebase'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const { domain, limit = 100 } = req.query

      let query: any = db.collection('testData').orderBy('timestamp', 'desc')

      if (domain) {
        query = query.where('domain', '==', domain)
      }

      const snapshot = await query.limit(Number(limit)).get()
      const tests = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      res.json(tests)
    } catch (error: any) {
      throw new Error(`Failed to fetch test data: ${error.message}`)
    }
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const testData = req.body

      // Validate required fields
      if (!testData.testName || !testData.domain) {
        return res.status(400).json({
          error: 'Missing required fields: testName, domain',
        })
      }

      const docRef = await db.collection('testData').add({
        ...testData,
        timestamp: new Date().toISOString(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      res.status(201).json({
        id: docRef.id,
        message: 'Test data created successfully',
      })
    } catch (error: any) {
      throw new Error(`Failed to create test data: ${error.message}`)
    }
  })
)

export default router
