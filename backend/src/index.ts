import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeFirebase } from './config/firebase'
import { errorHandler } from './middleware/errorHandler'
import metricsRoutes from './routes/metrics'
import testDataRoutes from './routes/testData'
import analyticsRoutes from './routes/analytics'
import complianceRoutes from './routes/compliance'
import mlRoutes from './routes/ml'
import kpisRoutes from './routes/kpis'
import domainRoutes from './routes/domain'
import pluginsRoutes from './routes/plugins'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Initialize Firebase Admin (optional - server will run without it)
initializeFirebase()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/metrics', metricsRoutes)
app.use('/api/test-data', testDataRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/compliance', complianceRoutes)
app.use('/api/ml', mlRoutes)
app.use('/api/kpis', kpisRoutes)
app.use('/api/domain', domainRoutes)
app.use('/api/plugins', pluginsRoutes)

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 SVES-DAQ Backend server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
})
