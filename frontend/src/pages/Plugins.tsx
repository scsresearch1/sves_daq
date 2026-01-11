import { Box, Typography, Grid, Chip, Button, Card, CardContent, CardActions, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useState } from 'react'
import { CheckCircle, RadioButtonUnchecked, PlayArrow, Settings } from '@mui/icons-material'
import GlobalFilters from '../components/GlobalFilters'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../services/api'

interface Plugin {
  name: string
  category: 'standards' | 'analytics' | 'predictive'
  description: string
  enabled: boolean
  version: string
}

export default function Plugins() {
  const [runningPlugins, setRunningPlugins] = useState<Set<string>>(new Set())
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [configDialog, setConfigDialog] = useState<{ open: boolean; plugin: Plugin | null }>({
    open: false,
    plugin: null,
  })
  const [pluginResults, setPluginResults] = useState<{ [key: string]: any }>({})

  const plugins: Plugin[] = [
    // Standards Compliance
    { name: 'ISO2631_VibrationCompliance', category: 'standards', description: 'ISO 2631 weighted vibration compliance evaluation', enabled: true, version: '1.2.0' },
    { name: 'FMVSS135_BrakePerformance', category: 'standards', description: 'FMVSS 135 brake performance compliance', enabled: true, version: '2.0.1' },
    { name: 'ECE_R13_Braking', category: 'standards', description: 'ECE R13 braking regulation compliance', enabled: true, version: '1.5.2' },
    { name: 'SAE_J2522_BrakeNoise', category: 'standards', description: 'SAE J2522 brake noise evaluation', enabled: false, version: '1.0.0' },
    { name: 'VDA303_BrakeSquealDetection', category: 'standards', description: 'VDA 303 brake squeal detection', enabled: true, version: '1.3.1' },
    { name: 'ISO8608_RoadRoughness', category: 'standards', description: 'ISO 8608 road roughness classification', enabled: true, version: '1.1.0' },
    
    // Analytics & Physics
    { name: 'RainflowFatigueCounter', category: 'analytics', description: 'Rainflow cycle counting for fatigue analysis', enabled: true, version: '2.1.0' },
    { name: 'MinerDamageAccumulator', category: 'analytics', description: 'Miner rule damage accumulation', enabled: true, version: '1.8.2' },
    { name: 'LoadPathResolver', category: 'analytics', description: 'Load path dominance analysis', enabled: true, version: '1.5.0' },
    { name: 'EventSeverityClassifier', category: 'analytics', description: 'Automatic event severity classification', enabled: true, version: '1.2.3' },
    { name: 'OrderTrackingEngine', category: 'analytics', description: 'Order tracking and waterfall plots', enabled: true, version: '2.0.0' },
    { name: 'FFT_STFT_Analyzer', category: 'analytics', description: 'Time-frequency analysis (FFT, STFT)', enabled: true, version: '1.9.1' },
    
    // Predictive & AI
    { name: 'RemainingLifePredictor', category: 'predictive', description: 'ML-based remaining fatigue life prediction', enabled: true, version: '3.0.1' },
    { name: 'FailureRiskScorer', category: 'predictive', description: 'Failure risk scoring using ML models', enabled: true, version: '2.2.0' },
    { name: 'BrakeFadePredictor', category: 'predictive', description: 'Predict brake fade onset', enabled: false, version: '1.0.0' },
    { name: 'NoiseOccurrencePredictor', category: 'predictive', description: 'Predict brake squeal likelihood', enabled: true, version: '1.5.2' },
    { name: 'ShockTuningOptimizer', category: 'predictive', description: 'Shock tuning optimization recommendations', enabled: false, version: '0.9.0' },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'standards': return 'primary'
      case 'analytics': return 'secondary'
      case 'predictive': return 'success'
      default: return 'default'
    }
  }

  const handleRunPlugin = async (plugin: Plugin) => {
    if (!plugin.enabled || runningPlugins.has(plugin.name)) return

    setRunningPlugins((prev) => new Set(prev).add(plugin.name))

    try {
      const result = await apiClient.post<any>(`/plugins/${plugin.name}/run`, {
        testId: null, // Could be passed from GlobalFilters
        config: {},
      })

      setPluginResults((prev) => ({
        ...prev,
        [plugin.name]: result,
      }))

      setSnackbar({
        open: true,
        message: result.message || `${plugin.name} executed successfully`,
        severity: 'success',
      })
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || `Failed to run ${plugin.name}`,
        severity: 'error',
      })
    } finally {
      setRunningPlugins((prev) => {
        const next = new Set(prev)
        next.delete(plugin.name)
        return next
      })
    }
  }

  const handleConfigurePlugin = (plugin: Plugin) => {
    setConfigDialog({ open: true, plugin })
  }

  const handleCloseConfigDialog = () => {
    setConfigDialog({ open: false, plugin: null })
  }

  const handleSaveConfig = async () => {
    if (!configDialog.plugin) return

    try {
      await apiClient.post<any>(`/plugins/${configDialog.plugin.name}/configure`, {
        config: {},
      })

      setSnackbar({
        open: true,
        message: `${configDialog.plugin.name} configuration saved`,
        severity: 'success',
      })

      handleCloseConfigDialog()
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to save configuration',
        severity: 'error',
      })
    }
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Plugin Modules
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Standards compliance, analytics, and predictive AI plugins
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {plugins.map((plugin, idx) => {
          const isRunning = runningPlugins.has(plugin.name)
          const result = pluginResults[plugin.name]

          return (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <Card
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                      {plugin.name}
                    </Typography>
                    {plugin.enabled ? (
                      <CheckCircle sx={{ color: 'success.main' }} />
                    ) : (
                      <RadioButtonUnchecked sx={{ color: 'text.disabled' }} />
                    )}
                  </Box>
                  <Chip
                    label={plugin.category}
                    size="small"
                    color={getCategoryColor(plugin.category) as any}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                    {plugin.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Version {plugin.version}
                  </Typography>
                  
                  {result && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: 'success.dark', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                        Last Result:
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {result.message}
                      </Typography>
                      {result.data && Object.keys(result.data).length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          {Object.entries(result.data).slice(0, 2).map(([key, value]) => (
                            <Typography key={key} variant="caption" sx={{ fontSize: '0.7rem', display: 'block' }}>
                              {key}: {String(value)}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={isRunning ? <CircularProgress size={16} /> : <PlayArrow />}
                    disabled={!plugin.enabled || isRunning}
                    onClick={() => handleRunPlugin(plugin)}
                    variant="contained"
                    color="primary"
                  >
                    {isRunning ? 'Running...' : 'Run'}
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Settings />}
                    onClick={() => handleConfigurePlugin(plugin)}
                  >
                    Configure
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={configDialog.open} onClose={handleCloseConfigDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Configure {configDialog.plugin?.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Configuration options for {configDialog.plugin?.name} will be available here.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            Version: {configDialog.plugin?.version}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog}>Cancel</Button>
          <Button onClick={handleSaveConfig} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
