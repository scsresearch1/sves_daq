import { Box, Typography, Grid, Paper, Button, Card, CardContent, TextField, Select, MenuItem, FormControl, InputLabel, Alert, Snackbar, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import { PlayArrow, Psychology, CheckCircle, Error as ErrorIcon } from '@mui/icons-material'
import GlobalFilters from '../components/GlobalFilters'
import KPICard from '../components/KPICard'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../services/api'

export default function ML() {
  const [predictionType, setPredictionType] = useState('remainingLife')
  
  // Sample data templates for each prediction type
  const getSampleData = (type: string): string => {
    const samples: { [key: string]: any } = {
      remainingLife: {
        peakStrain: 1250,
        stressRange: 450,
        meanStress: 320,
        cycleCount: 25000,
        loadRate: 12.5,
        loadReversalFrequency: 2.3,
        minerDamageTotal: 0.72,
        temperature: 95,
        terrainSeverityIndex: 0.65
      },
      failureRisk: {
        peakStrain: 1850,
        stressRange: 680,
        meanStress: 450,
        cycleCount: 15000,
        loadRate: 18.2,
        asymmetryMetrics: 12.5,
        clampLoadLossRate: -0.05,
        driftIndicators: 0.08,
        temperatureGradient: 9.6
      },
      brakeFade: {
        brakePressure: 58,
        brakeTemperature: 420,
        vehicleSpeed: 85,
        deceleration: 0.86,
        brakeApplications: 15,
        fadeSlope: -0.12,
        ambientTemperature: 32,
        brakeDiscTemperature: 450
      },
      squealLikelihood: {
        dominantFrequency: 2350,
        splMax: 92,
        orderAmplitude: 0.38,
        rpm: 3200,
        brakePressure: 45,
        brakeTemperature: 380,
        vibrationRMS: 0.45,
        squealOccurrences: 2
      },
      fastenerLoosening: {
        clampLoadLossRate: -0.08,
        vibrationRMS: 0.52,
        shockVelocity: 2.8,
        temperatureCycles: 1250,
        loadReversalFrequency: 3.2,
        asymmetryMetrics: 15.3,
        fastenerTorque: 45,
        threadCondition: 0.85
      },
      bottomOut: {
        shockVelocity: 3.2,
        wheelTravel: 180,
        verticalAcceleration: 0.95,
        loadRate: 22.5,
        suspensionCompression: 0.92,
        forceStrutTop: 14.2,
        terrainSeverityIndex: 0.85,
        driverAggressivenessScore: 0.75
      },
      rideDiscomfort: {
        iso2631WeightedRMS: 0.82,
        crestFactor: 4.8,
        exposureHours: 3.0,
        seatAccelerationZ: 0.76,
        seatAccelerationX: 0.42,
        seatAccelerationY: 0.38,
        steeringAcceleration: 0.35,
        floorAcceleration: 0.58
      },
      nvhCompliance: {
        splMax: 88,
        laeq: 74,
        dominantFrequency: 2100,
        orderAmplitude: 0.35,
        vibrationRMS: 0.38,
        squealOccurrences: 3,
        rpm: 2800,
        noiseVariance: 12.5
      },
      warrantyClaim: {
        failureRiskScore: 0.35,
        warrantyRiskIndex: 0.22,
        complianceRate: 0.88,
        performanceVariability: 18.5,
        eventFrequency: 12,
        durabilityMargin: 0.28,
        environmentalRobustness: 0.79,
        usageHours: 450
      }
    }

    return JSON.stringify(samples[type] || {}, null, 2)
  }

  const [inputData, setInputData] = useState(() => getSampleData('remainingLife'))
  const [predictions, setPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [runningPrediction, setRunningPrediction] = useState(false)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  })
  const [latestPrediction, setLatestPrediction] = useState<any>(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await apiClient.get('/ml')
        const formattedPredictions = (data as any[]).slice(0, 6).map((pred: any) => {
          const cards = []
          
          if (pred.remainingLifeHours !== undefined) {
            cards.push({
              title: 'Remaining Life',
              value: Math.round(pred.remainingLifeHours * 10) / 10,
              unit: 'hours',
              status: pred.remainingLifeHours > 50 ? 'good' : pred.remainingLifeHours > 20 ? 'warning' : 'error' as const,
              level: 'executive' as const,
            })
          }
          
          if (pred.failureRiskScore !== undefined) {
            cards.push({
              title: 'Failure Risk',
              value: Math.round(pred.failureRiskScore * 100 * 10) / 10,
              unit: '%',
              status: pred.failureRiskScore < 0.2 ? 'good' : pred.failureRiskScore < 0.4 ? 'warning' : 'error' as const,
              level: 'executive' as const,
            })
          }
          
          if (pred.brakeFadeRisk) {
            const riskValue = pred.brakeFadeRisk === 'Low' ? 20 : pred.brakeFadeRisk === 'Medium' ? 50 : 80
            cards.push({
              title: 'Brake Fade Risk',
              value: riskValue,
              unit: '%',
              status: pred.brakeFadeRisk === 'Low' ? 'good' : pred.brakeFadeRisk === 'Medium' ? 'warning' : 'error' as const,
              level: 'executive' as const,
            })
          }
          
          if (pred.rideDiscomfortProbability !== undefined) {
            cards.push({
              title: 'Ride Discomfort',
              value: Math.round(pred.rideDiscomfortProbability * 100 * 10) / 10,
              unit: '%',
              status: pred.rideDiscomfortProbability < 0.3 ? 'good' : pred.rideDiscomfortProbability < 0.5 ? 'warning' : 'error' as const,
              level: 'executive' as const,
            })
          }
          
          return cards
        }).flat()
        
        setPredictions(formattedPredictions.length > 0 ? formattedPredictions : [
          { title: 'Remaining Life', value: 78.3, unit: '%', status: 'warning' as const, level: 'executive' as const },
          { title: 'Failure Risk', value: 12.5, unit: '%', status: 'good' as const, level: 'executive' as const },
          { title: 'Brake Fade Onset', value: 245, unit: 'km', status: 'good' as const, level: 'executive' as const },
        ])
      } catch (error) {
        console.error('Failed to fetch ML predictions:', error)
        // Fallback to mock data
        setPredictions([
          { title: 'Remaining Life', value: 78.3, unit: '%', status: 'warning' as const, level: 'executive' as const },
          { title: 'Failure Risk', value: 12.5, unit: '%', status: 'good' as const, level: 'executive' as const },
          { title: 'Brake Fade Onset', value: 245, unit: 'km', status: 'good' as const, level: 'executive' as const },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  const predictionTypes = [
    { value: 'remainingLife', label: 'Remaining Fatigue Life' },
    { value: 'failureRisk', label: 'Failure Risk Score' },
    { value: 'brakeFade', label: 'Brake Fade Onset' },
    { value: 'squealLikelihood', label: 'Brake Squeal Likelihood' },
    { value: 'fastenerLoosening', label: 'Fastener Loosening Risk' },
    { value: 'bottomOut', label: 'Shock Bottom-out Probability' },
    { value: 'rideDiscomfort', label: 'Ride Discomfort Probability' },
    { value: 'nvhCompliance', label: 'NVH Compliance Failure Risk' },
    { value: 'warrantyClaim', label: 'Warranty Claim Likelihood' },
  ]

  // Update input data when prediction type changes
  useEffect(() => {
    setInputData(getSampleData(predictionType))
  }, [predictionType])

  const handleRunPrediction = async () => {
    if (!inputData || inputData.trim() === '') {
      setSnackbar({
        open: true,
        message: 'Please provide input features in JSON format',
        severity: 'error'
      })
      return
    }

    setRunningPrediction(true)
    try {
      // Validate JSON
      let testData
      try {
        testData = JSON.parse(inputData)
      } catch (parseError) {
        setSnackbar({
          open: true,
          message: 'Invalid JSON format. Please check your input.',
          severity: 'error'
        })
        setRunningPrediction(false)
        return
      }

      const result = await apiClient.post('/ml/predict', { testData, modelType: predictionType })
      
      // Format the prediction result based on prediction type
      const predictionValue = result.prediction?.value || 0
      const confidence = result.prediction?.confidence || result.confidence || 0.85
      
      // Create a formatted prediction card
      const predictionCard = {
        title: predictionTypes.find(t => t.value === predictionType)?.label || 'Prediction',
        value: Math.round(predictionValue * 10) / 10,
        unit: getUnitForPredictionType(predictionType),
        status: getStatusForValue(predictionValue, predictionType) as 'good' | 'warning' | 'error',
        level: 'executive' as const,
        confidence: Math.round(confidence * 100),
        timestamp: result.timestamp || new Date().toISOString()
      }

      setLatestPrediction(predictionCard)
      
      // Add to predictions list (prepend)
      setPredictions(prev => [predictionCard, ...prev].slice(0, 6))

      setSnackbar({
        open: true,
        message: `Prediction completed successfully! Confidence: ${Math.round(confidence * 100)}%`,
        severity: 'success'
      })
    } catch (error: any) {
      console.error('Failed to run prediction:', error)
      setSnackbar({
        open: true,
        message: error.response?.data?.error || error.message || 'Failed to run prediction. Please try again.',
        severity: 'error'
      })
    } finally {
      setRunningPrediction(false)
    }
  }

  const getUnitForPredictionType = (type: string): string => {
    const units: { [key: string]: string } = {
      remainingLife: 'hours',
      failureRisk: '%',
      brakeFade: 'km',
      squealLikelihood: '%',
      fastenerLoosening: '%',
      bottomOut: '%',
      rideDiscomfort: '%',
      nvhCompliance: '%',
      warrantyClaim: '%'
    }
    return units[type] || '%'
  }

  const getStatusForValue = (value: number, type: string): 'good' | 'warning' | 'error' => {
    if (type === 'remainingLife') {
      return value > 50 ? 'good' : value > 20 ? 'warning' : 'error'
    } else if (type === 'failureRisk' || type === 'warrantyClaim') {
      return value < 20 ? 'good' : value < 40 ? 'warning' : 'error'
    } else if (type === 'brakeFade') {
      return value > 200 ? 'good' : value > 100 ? 'warning' : 'error'
    } else {
      return value < 30 ? 'good' : value < 60 ? 'warning' : 'error'
    }
  }

  if (loading) {
    return <Typography>Loading ML predictions...</Typography>
  }

  return (
    <Box>
      <GlobalFilters />
      
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
          borderRadius: 2,
          p: 3,
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dashboardBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0,
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Psychology sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              ML Predictions & AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Predictive analytics for remaining life, failure risk, and design optimization
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prediction Configuration
            </Typography>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Prediction Type</InputLabel>
              <Select
                value={predictionType}
                label="Prediction Type"
                onChange={(e) => {
                  setPredictionType(e.target.value)
                  // Sample data will be auto-populated via useEffect
                }}
              >
                {predictionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Input Features (JSON)"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder='{"peakStrain": 1250, "stressRange": 450, ...}'
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              startIcon={runningPrediction ? <CircularProgress size={20} color="inherit" /> : <PlayArrow />}
              size="large"
              onClick={handleRunPrediction}
              disabled={runningPrediction}
            >
              {runningPrediction ? 'Running Prediction...' : 'Run Prediction'}
            </Button>
            
            {latestPrediction && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle color="success" fontSize="small" />
                  Latest Prediction Result
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <KPICard {...latestPrediction} />
                  </Grid>
                  {latestPrediction.confidence && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Confidence: {latestPrediction.confidence}%
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Recent Predictions
          </Typography>
          <Grid container spacing={2}>
            {predictions.map((pred, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <KPICard {...pred} level="executive" />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Prediction Situations
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click on a situation to auto-configure and run a prediction for that scenario
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[
            {
              label: 'Before endurance completion',
              predictionType: 'remainingLife',
              sampleData: {
                peakStrain: 1200,
                stressRange: 420,
                cycleCount: 18000,
                minerDamageTotal: 0.65,
                temperature: 92,
                terrainSeverityIndex: 0.6
              }
            },
            {
              label: 'After severe event clusters',
              predictionType: 'failureRisk',
              sampleData: {
                peakStrain: 2100,
                stressRange: 750,
                cycleCount: 5000,
                loadRate: 22.5,
                asymmetryMetrics: 18.2,
                driftIndicators: 0.12
              }
            },
            {
              label: 'During design change simulation',
              predictionType: 'warrantyClaim',
              sampleData: {
                failureRiskScore: 0.28,
                complianceRate: 0.85,
                performanceVariability: 16.2,
                durabilityMargin: 0.25,
                environmentalRobustness: 0.75
              }
            },
            {
              label: 'Across environment transitions',
              predictionType: 'nvhCompliance',
              sampleData: {
                splMax: 86,
                laeq: 72,
                dominantFrequency: 2200,
                vibrationRMS: 0.42,
                temperature: 45,
                rpm: 3000
              }
            },
            {
              label: 'Between vehicle variants',
              predictionType: 'rideDiscomfort',
              sampleData: {
                iso2631WeightedRMS: 0.75,
                exposureHours: 2.5,
                seatAccelerationZ: 0.68,
                seatAccelerationX: 0.38,
                steeringAcceleration: 0.32
              }
            },
            {
              label: 'For new terrain profiles',
              predictionType: 'bottomOut',
              sampleData: {
                shockVelocity: 3.5,
                wheelTravel: 195,
                verticalAcceleration: 1.05,
                terrainSeverityIndex: 0.92,
                driverAggressivenessScore: 0.82
              }
            },
            {
              label: 'For cost-reduction proposals',
              predictionType: 'fastenerLoosening',
              sampleData: {
                clampLoadLossRate: -0.12,
                vibrationRMS: 0.58,
                shockVelocity: 3.1,
                temperatureCycles: 1500,
                fastenerTorque: 40
              }
            },
            {
              label: 'For homologation readiness',
              predictionType: 'brakeFade',
              sampleData: {
                brakePressure: 62,
                brakeTemperature: 450,
                vehicleSpeed: 90,
                deceleration: 0.88,
                brakeApplications: 20,
                fadeSlope: -0.15
              }
            },
          ].map((situation, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card 
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                    '& .MuiTypography-root': {
                      color: 'primary.contrastText'
                    }
                  }
                }}
                onClick={async () => {
                  setPredictionType(situation.predictionType)
                  const sampleDataJson = JSON.stringify(situation.sampleData, null, 2)
                  setInputData(sampleDataJson)
                  
                  // Auto-run prediction after state updates
                  setTimeout(async () => {
                    setRunningPrediction(true)
                    try {
                      const result = await apiClient.post('/ml/predict', { 
                        testData: situation.sampleData, 
                        modelType: situation.predictionType 
                      })
                      const predictionValue = result.prediction?.value || 0
                      const confidence = result.prediction?.confidence || result.confidence || 0.85
                      const predictionCard = {
                        title: predictionTypes.find(t => t.value === situation.predictionType)?.label || 'Prediction',
                        value: Math.round(predictionValue * 10) / 10,
                        unit: getUnitForPredictionType(situation.predictionType),
                        status: getStatusForValue(predictionValue, situation.predictionType) as 'good' | 'warning' | 'error',
                        level: 'executive' as const,
                        confidence: Math.round(confidence * 100),
                        timestamp: result.timestamp || new Date().toISOString()
                      }
                      setLatestPrediction(predictionCard)
                      setPredictions(prev => [predictionCard, ...prev].slice(0, 6))
                      setSnackbar({
                        open: true,
                        message: `Prediction for "${situation.label}" completed! Confidence: ${Math.round(confidence * 100)}%`,
                        severity: 'success'
                      })
                    } catch (error: any) {
                      setSnackbar({
                        open: true,
                        message: error.response?.data?.error || 'Failed to run prediction',
                        severity: 'error'
                      })
                    } finally {
                      setRunningPrediction(false)
                    }
                  }, 300)
                }}
              >
                <CardContent>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {situation.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    Click to run prediction
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          icon={snackbar.severity === 'success' ? <CheckCircle /> : <ErrorIcon />}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
