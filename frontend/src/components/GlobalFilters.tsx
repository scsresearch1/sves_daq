import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  FilterList,
  Settings,
  CompareArrows,
  Download,
} from '@mui/icons-material'

interface GlobalFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export default function GlobalFilters({ onFiltersChange }: GlobalFiltersProps) {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    vehicleProgram: '',
    model: '',
    variant: '',
    massConfig: '',
    testCampaign: '',
    track: '',
    lab: '',
    environment: '',
    standard: '',
    domain: 'time',
  })
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
    // Trigger data refresh on pages that use these filters
    // This could be enhanced to actually filter API calls
  }

  const handleCompare = () => {
    setSnackbar({
      open: true,
      message: 'Multi-run comparison feature - Select multiple test runs to compare side-by-side',
    })
    // In a real app, this would open a comparison dialog
  }

  const handleExport = async () => {
    try {
      // Export current filtered data
      const [testData, kpis, compliance] = await Promise.all([
        fetch('/api/test-data').then(r => r.json()).catch(() => []),
        fetch('/api/kpis').then(r => r.json()).catch(() => []),
        fetch('/api/compliance').then(r => r.json()).catch(() => []),
      ])

      const exportData = {
        filters,
        testData,
        kpis,
        compliance,
        exportedAt: new Date().toISOString(),
      }

      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `sves-daq-export-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)

      setSnackbar({
        open: true,
        message: 'Data exported successfully',
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to export data',
      })
    }
  }

  const handleSettings = () => {
    navigate('/settings')
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          <Typography variant="h6">Platform Configuration</Typography>
        </Box>
        <Box>
          <Tooltip
            title="Compare multiple test runs side-by-side for analysis"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(25, 118, 210, 0.95)',
                  color: 'white',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(25, 118, 210, 0.95)',
                  },
                },
              },
            }}
          >
            <IconButton size="small" onClick={handleCompare}>
              <CompareArrows />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Export data: CAE loads, reports, or homologation packages"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(46, 125, 50, 0.95)',
                  color: 'white',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(46, 125, 50, 0.95)',
                  },
                },
              },
            }}
          >
            <IconButton size="small" onClick={handleExport}>
              <Download />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Configure platform settings: sensors, standards, and user preferences"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(156, 39, 176, 0.95)',
                  color: 'white',
                  fontSize: '0.875rem',
                  padding: '10px 14px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(156, 39, 176, 0.95)',
                  },
                },
              },
            }}
          >
            <IconButton size="small" onClick={handleSettings}>
              <Settings />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Tooltip
            title="Select the vehicle program, model, and variant for analysis"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(25, 118, 210, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Vehicle Program</InputLabel>
              <Select
                value={filters.vehicleProgram}
                label="Vehicle Program"
                onChange={(e) => handleFilterChange('vehicleProgram', e.target.value)}
              >
                <MenuItem value="program1">Program Alpha</MenuItem>
                <MenuItem value="program2">Program Beta</MenuItem>
                <MenuItem value="program3">Program Gamma</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Choose specific model variant and configuration"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(25, 118, 210, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Model / Variant</InputLabel>
              <Select
                value={filters.model}
                label="Model / Variant"
                onChange={(e) => handleFilterChange('model', e.target.value)}
              >
                <MenuItem value="model1">Model A - Base</MenuItem>
                <MenuItem value="model2">Model A - Sport</MenuItem>
                <MenuItem value="model3">Model B - Premium</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Vehicle mass configuration: empty, half load, or full load"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(25, 118, 210, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Mass Config</InputLabel>
              <Select
                value={filters.massConfig}
                label="Mass Config"
                onChange={(e) => handleFilterChange('massConfig', e.target.value)}
              >
                <MenuItem value="empty">Empty</MenuItem>
                <MenuItem value="half">Half Load</MenuItem>
                <MenuItem value="full">Full Load</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Select test campaign: durability, NVH, safety, or custom"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(46, 125, 50, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Test Campaign</InputLabel>
              <Select
                value={filters.testCampaign}
                label="Test Campaign"
                onChange={(e) => handleFilterChange('testCampaign', e.target.value)}
              >
                <MenuItem value="campaign1">Durability 2024</MenuItem>
                <MenuItem value="campaign2">NVH Validation</MenuItem>
                <MenuItem value="campaign3">Safety Compliance</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Test location: track, lab facility, or proving ground"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(46, 125, 50, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Track / Lab</InputLabel>
              <Select
                value={filters.track}
                label="Track / Lab"
                onChange={(e) => handleFilterChange('track', e.target.value)}
              >
                <MenuItem value="track1">Test Track A</MenuItem>
                <MenuItem value="track2">Lab Facility B</MenuItem>
                <MenuItem value="track3">Proving Ground C</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Environmental conditions: ambient, cold start, heat soak, or extreme"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(237, 108, 2, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Environment</InputLabel>
              <Select
                value={filters.environment}
                label="Environment"
                onChange={(e) => handleFilterChange('environment', e.target.value)}
              >
                <MenuItem value="ambient">Ambient</MenuItem>
                <MenuItem value="cold">Cold Start</MenuItem>
                <MenuItem value="hot">Heat Soak</MenuItem>
                <MenuItem value="extreme">Extreme</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Regulatory standard: ISO, SAE, ECE, FMVSS, or VDA"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(156, 39, 176, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Standard</InputLabel>
              <Select
                value={filters.standard}
                label="Standard"
                onChange={(e) => handleFilterChange('standard', e.target.value)}
              >
                <MenuItem value="iso">ISO</MenuItem>
                <MenuItem value="sae">SAE</MenuItem>
                <MenuItem value="ece">ECE</MenuItem>
                <MenuItem value="fmvss">FMVSS</MenuItem>
                <MenuItem value="vda">VDA</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>

        <Grid item xs={12} md={3}>
          <Tooltip
            title="Analysis domain: time, frequency, order, or angle domain visualization"
            arrow
            placement="top"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(156, 39, 176, 0.95)',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: 1.5,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
                },
              },
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Domain</InputLabel>
              <Select
                value={filters.domain}
                label="Domain"
                onChange={(e) => handleFilterChange('domain', e.target.value)}
              >
                <MenuItem value="time">Time</MenuItem>
                <MenuItem value="frequency">Frequency</MenuItem>
                <MenuItem value="order">Order</MenuItem>
                <MenuItem value="angle">Angle</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label="Event Tagged" size="small" />
        <Chip label="Terrain Classified" size="small" />
        <Chip label="Multi-Run Active" size="small" />
        <Chip label="Symmetry Analysis" size="small" />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="info"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  )
}
