import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler.js'
import { db, admin } from '../config/firebase.js'

type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot

const router = Router()

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    try {
      const complianceRef = db.collection('compliance')
      const snapshot = await complianceRef.orderBy('lastUpdated', 'desc').get()

      const records = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      res.json(records)
    } catch (error: any) {
      throw new Error(`Failed to fetch compliance data: ${error.message}`)
    }
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const complianceData = req.body

      // Validate required fields
      if (!complianceData.standard || !complianceData.testName) {
        res.status(400).json({
          error: 'Missing required fields: standard, testName',
        })
        return
      }

      // Determine compliance status
      const status =
        complianceData.score >= complianceData.threshold
          ? 'compliant'
          : 'non-compliant'

      const docRef = await db.collection('compliance').add({
        ...complianceData,
        status,
        lastUpdated: new Date().toISOString(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      res.status(201).json({
        id: docRef.id,
        status,
        message: 'Compliance record created successfully',
      })
    } catch (error: any) {
      throw new Error(`Failed to create compliance record: ${error.message}`)
    }
  })
)

export default router
