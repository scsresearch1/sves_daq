import { Router } from 'express'
import { asyncHandler } from '../middleware/errorHandler.js'
import { predictPerformance } from '../services/mlService.js'
import { db, admin } from '../config/firebase.js'

type QueryDocumentSnapshot = admin.firestore.QueryDocumentSnapshot

const router = Router()

// Get all ML predictions
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const { testId, limit = 50 } = req.query

      let query: any = db.collection('ml_predictions').orderBy('timestamp', 'desc')

      if (testId) {
        query = query.where('testId', '==', testId)
      }

      const snapshot = await query.limit(Number(limit)).get()
      const predictions = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...doc.data(),
      }))

      res.json(predictions)
    } catch (error: any) {
      throw new Error(`Failed to fetch ML predictions: ${error.message}`)
    }
  })
)

// Predict performance based on test parameters
router.post(
  '/predict',
  asyncHandler(async (req, res) => {
    try {
      const { testData, modelType = 'default' } = req.body

      if (!testData) {
        res.status(400).json({
          error: 'Missing required field: testData',
        })
        return
      }

      const prediction = await predictPerformance(testData, modelType)

      res.json({
        prediction,
        confidence: prediction.confidence || 0.85,
        timestamp: new Date().toISOString(),
      })
    } catch (error: any) {
      throw new Error(`Failed to generate prediction: ${error.message}`)
    }
  })
)

// Analyze risk factors
router.post(
  '/analyze-risk',
  asyncHandler(async (req, res) => {
    try {
      const { testResults, domain } = req.body

      if (!testResults) {
        res.status(400).json({
          error: 'Missing required field: testResults',
        })
        return
      }

      // Risk analysis logic
      const riskFactors = analyzeRiskFactors(testResults, domain)

      res.json({
        riskLevel: riskFactors.overallRisk,
        factors: riskFactors.factors,
        recommendations: riskFactors.recommendations,
      })
    } catch (error: any) {
      throw new Error(`Failed to analyze risk: ${error.message}`)
    }
  })
)

// Generate design recommendations
router.post(
  '/recommendations',
  asyncHandler(async (req, res) => {
    try {
      const { testData, performanceGaps } = req.body

      const recommendations = generateRecommendations(testData, performanceGaps)

      res.json({
        recommendations,
        priority: 'high',
        estimatedImpact: 'medium',
      })
    } catch (error: any) {
      throw new Error(`Failed to generate recommendations: ${error.message}`)
    }
  })
)

function analyzeRiskFactors(testResults: any, _domain?: string) {
  // Placeholder risk analysis logic
  // In production, this would use trained ML models
  const factors: any[] = []
  let overallRisk = 'low'

  if (testResults.complianceRate < 90) {
    factors.push({
      type: 'compliance',
      severity: 'high',
      message: 'Compliance rate below threshold',
    })
    overallRisk = 'high'
  }

  if (testResults.performanceVariability > 15) {
    factors.push({
      type: 'variability',
      severity: 'medium',
      message: 'High performance variability detected',
    })
    if (overallRisk === 'low') overallRisk = 'medium'
  }

  const recommendations = factors.map((factor) => ({
    action: `Address ${factor.type} issues`,
    priority: factor.severity,
  }))

  return {
    overallRisk,
    factors,
    recommendations,
  }
}

function generateRecommendations(_testData: any, performanceGaps: any[]) {
  // Placeholder recommendation logic
  // In production, this would use ML models to suggest optimizations
  return performanceGaps.map((gap) => ({
    area: gap.area,
    currentValue: gap.current,
    targetValue: gap.target,
    suggestion: `Optimize ${gap.area} parameters to improve performance`,
    estimatedImprovement: `${((gap.target - gap.current) / gap.current * 100).toFixed(1)}%`,
  }))
}

export default router
