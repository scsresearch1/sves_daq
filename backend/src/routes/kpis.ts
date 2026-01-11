import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler'
import { db, admin } from '../config/firebase'

type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot

const router = Router()

// Get KPIs by domain and level
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const { domain, level, testId, programId, vehicleId } = req.query

      let query: any = db.collection('kpis')

      if (domain) {
        query = query.where('domain', '==', domain)
      }

      if (testId) {
        query = query.where('testId', '==', testId)
      }

      if (programId) {
        query = query.where('programId', '==', programId)
      }

      if (vehicleId) {
        query = query.where('vehicleId', '==', vehicleId)
      }

      const snapshot = await query.get()
      let kpis = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Filter by level if specified (executive, subsystem, diagnostic)
      if (level) {
        kpis = kpis.filter((kpi: any) => {
          if (level === 'executive') {
            return kpi.domain === 'executive'
          } else if (level === 'subsystem') {
            return ['suspension', 'brakes', 'nvh', 'ride', 'electrical', 'thermal', 'environment', 'fatigue'].includes(kpi.domain)
          } else if (level === 'diagnostic') {
            return false // Diagnostic KPIs are typically derived from raw data
          }
          return true
        })
      }

      res.json(kpis)
    } catch (error: any) {
      throw new Error(`Failed to fetch KPIs: ${error.message}`)
    }
  })
)

// Get aggregated executive KPIs
router.get(
  '/executive',
  asyncHandler(async (req, res) => {
    try {
      const { programId } = req.query

      let query: any = db.collection('kpis').where('domain', '==', 'executive')

      if (programId) {
        query = query.where('programId', '==', programId)
      }

      const snapshot = await query.get()
      const executiveKpis = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Aggregate latest executive KPIs
      const latest = executiveKpis[executiveKpis.length - 1] || {}
      const aggregated = {
        safetyComplianceIndex: latest.safetyComplianceIndex || 0,
        durabilityMarginPct: latest.durabilityMarginPct || 0,
        nvhComplianceScore: latest.nvhComplianceScore || 0,
        rideComfortIndex: latest.rideComfortIndex || 0,
        energyEfficiencyIndex: latest.energyEfficiencyIndex || 0,
        environmentalRobustnessScore: latest.environmentalRobustnessScore || 0,
        warrantyRiskIndex: latest.warrantyRiskIndex || 0,
      }

      res.json(aggregated)
    } catch (error: any) {
      throw new Error(`Failed to fetch executive KPIs: ${error.message}`)
    }
  })
)

export default router
