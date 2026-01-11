import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import { db } from '../config/firebase'

const router = Router()

router.get(
  '/dashboard',
  asyncHandler(async (_req, res) => {
    try {
      // Fetch metrics from Firestore
      const metricsRef = db.collection('metrics').doc('dashboard')
      const metricsDoc = await metricsRef.get()

      if (metricsDoc.exists) {
        res.json(metricsDoc.data())
        return
      }

      // Return default metrics if not found
      const defaultMetrics = {
        totalTests: 0,
        activeProjects: 0,
        complianceRate: 0,
        avgPerformance: 0,
        recentTrends: [],
      }

      res.json(defaultMetrics)
    } catch (error: any) {
      throw new Error(`Failed to fetch dashboard metrics: ${error.message}`)
    }
  })
)

export default router
