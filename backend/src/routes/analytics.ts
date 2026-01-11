import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import { db } from '../config/firebase'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const { domain } = req.query

      // Aggregate analytics data from Firestore
      const testDataRef = db.collection('testData')
      let query: any = testDataRef

      if (domain && domain !== 'all') {
        query = query.where('domain', '==', domain)
      }

      const snapshot = await query.get()
      const tests = snapshot.docs.map((doc) => doc.data())

      // Calculate domain distribution
      const domainCounts: Record<string, number> = {}
      tests.forEach((test: any) => {
        domainCounts[test.domain] = (domainCounts[test.domain] || 0) + 1
      })

      const total = tests.length
      const domainDistribution = Object.entries(domainCounts).map(
        ([name, count]) => ({
          name,
          value: total > 0 ? Math.round((count / total) * 100) : 0,
        })
      )

      // Calculate performance by domain
      const performanceByDomain: Record<string, { total: number; sum: number }> =
        {}
      tests.forEach((test: any) => {
        if (test.kpi && test.kpi > 0) {
          if (!performanceByDomain[test.domain]) {
            performanceByDomain[test.domain] = { total: 0, sum: 0 }
          }
          performanceByDomain[test.domain].total++
          performanceByDomain[test.domain].sum += test.kpi
        }
      })

      const performanceData = Object.entries(performanceByDomain).map(
        ([domain, data]) => ({
          domain,
          performance: data.total > 0 ? data.sum / data.total : 0,
        })
      )

      res.json({
        domainDistribution,
        performanceByDomain: performanceData,
      })
    } catch (error: any) {
      throw new Error(`Failed to fetch analytics: ${error.message}`)
    }
  })
)

export default router
