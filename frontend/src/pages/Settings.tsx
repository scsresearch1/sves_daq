import { Box, Typography, Paper, Grid, Switch, FormControlLabel, TextField, Button, Snackbar, Alert } from '@mui/material'
import { useState } from 'react'
import { Save } from '@mui/icons-material'
import GlobalFilters from '../components/GlobalFilters'
import dashboardBg from '@/assets/images/3.jpg'

export default function Settings() {
  const [sensorConfig, setSensorConfig] = useState({
    calibrationFile: '',
    samplingRate: '1000',
  })
  const [userRoles, setUserRoles] = useState({
    testEngineer: true,
    caeAnalyst: true,
    nvhSpecialist: false,
    management: false,
  })
  const [traceability, setTraceability] = useState({
    sensorTestKPITraceability: true,
    automaticEventTagging: true,
    terrainClassification: true,
    multiRunComparison: false,
    symmetryAnalysis: true,
  })
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleSave = () => {
    // Simulate saving settings
    const settings = {
      sensorConfig,
      userRoles,
      traceability,
      timestamp: new Date().toISOString(),
    }
    
    console.log('Saving settings:', settings)
    
    // In a real app, this would POST to /api/settings
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success',
    })
  }

  return (
    <Box>
      <GlobalFilters />
      
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
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
          Settings & Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sensor configuration, calibration management, user roles, traceability settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sensor Configuration
            </Typography>
            <TextField 
              fullWidth 
              label="Sensor Calibration File" 
              value={sensorConfig.calibrationFile}
              onChange={(e) => setSensorConfig({ ...sensorConfig, calibrationFile: e.target.value })}
              sx={{ mb: 2 }} 
            />
            <TextField 
              fullWidth 
              label="Sampling Rate" 
              value={sensorConfig.samplingRate}
              onChange={(e) => setSensorConfig({ ...sensorConfig, samplingRate: e.target.value })}
              sx={{ mb: 2 }} 
            />
            <Button 
              variant="contained" 
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save Configuration
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Roles & Permissions
            </Typography>
            <FormControlLabel 
              control={
                <Switch 
                  checked={userRoles.testEngineer}
                  onChange={(e) => setUserRoles({ ...userRoles, testEngineer: e.target.checked })}
                />
              } 
              label="Test Engineer" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={userRoles.caeAnalyst}
                  onChange={(e) => setUserRoles({ ...userRoles, caeAnalyst: e.target.checked })}
                />
              } 
              label="CAE Analyst" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={userRoles.nvhSpecialist}
                  onChange={(e) => setUserRoles({ ...userRoles, nvhSpecialist: e.target.checked })}
                />
              } 
              label="NVH Specialist" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={userRoles.management}
                  onChange={(e) => setUserRoles({ ...userRoles, management: e.target.checked })}
                />
              } 
              label="Management" 
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Traceability Settings
            </Typography>
            <FormControlLabel 
              control={
                <Switch 
                  checked={traceability.sensorTestKPITraceability}
                  onChange={(e) => setTraceability({ ...traceability, sensorTestKPITraceability: e.target.checked })}
                />
              } 
              label="Enable sensor → test → KPI → decision traceability" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={traceability.automaticEventTagging}
                  onChange={(e) => setTraceability({ ...traceability, automaticEventTagging: e.target.checked })}
                />
              } 
              label="Automatic event tagging" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={traceability.terrainClassification}
                  onChange={(e) => setTraceability({ ...traceability, terrainClassification: e.target.checked })}
                />
              } 
              label="Terrain classification" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={traceability.multiRunComparison}
                  onChange={(e) => setTraceability({ ...traceability, multiRunComparison: e.target.checked })}
                />
              } 
              label="Multi-run comparison" 
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={traceability.symmetryAnalysis}
                  onChange={(e) => setTraceability({ ...traceability, symmetryAnalysis: e.target.checked })}
                />
              } 
              label="Left-Right / Front-Rear symmetry analysis" 
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                Save All Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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
    </Box>
  )
}
