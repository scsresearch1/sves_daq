import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeFirebase } from './config/firebase.js'
import { errorHandler } from './middleware/errorHandler.js'
import metricsRoutes from './routes/metrics.js'
import testDataRoutes from './routes/testData.js'
import analyticsRoutes from './routes/analytics.js'
import complianceRoutes from './routes/compliance.js'
import mlRoutes from './routes/ml.js'
import kpisRoutes from './routes/kpis.js'
import domainRoutes from './routes/domain.js'
import pluginsRoutes from './routes/plugins.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Initialize Firebase Admin (optional - server will run without it)
initializeFirebase()

// Middleware
// CORS configuration - allow all origins in production, localhost in development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? true // Allow all origins in production (or specify Netlify domain)
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
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
