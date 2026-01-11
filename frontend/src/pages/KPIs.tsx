import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material'
import KPICard from '../components/KPICard'
import GlobalFilters from '../components/GlobalFilters'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../services/api'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

interface KPI {
  id: string
  domain: string
  [key: string]: any
}

export default function KPIs() {
  const [tabValue, setTabValue] = useState(0)
  const [executiveKPIs, setExecutiveKPIs] = useState<any[]>([])
  const [subsystemKPIs, setSubsystemKPIs] = useState<any[]>([])
  const [diagnosticKPIs, setDiagnosticKPIs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        // Fetch executive KPIs
        const execData = await apiClient.get('/kpis/executive')
        const execKPIs = [
          {
            title: 'Safety Compliance Index',
            value: Math.round((execData.safetyComplianceIndex || 0) * 100 * 10) / 10,
            unit: '%',
            target: 95,
            status: (execData.safetyComplianceIndex || 0) >= 0.9 ? 'good' : 'warning' as const,
            trend: 1.2,
            level: 'executive' as const,
          },
          {
            title: 'Durability Margin',
            value: Math.round((execData.durabilityMarginPct || 0) * 10) / 10,
            unit: '% life remaining',
            target: 80,
            status: (execData.durabilityMarginPct || 0) >= 80 ? 'good' : 'warning' as const,
            trend: -2.1,
            level: 'executive' as const,
          },
          {
            title: 'NVH Compliance Score',
            value: Math.round((execData.nvhComplianceScore || 0) * 100 * 10) / 10,
            unit: '%',
            target: 90,
            status: (execData.nvhComplianceScore || 0) >= 0.9 ? 'good' : 'warning' as const,
            trend: 3.4,
            level: 'executive' as const,
          },
          {
            title: 'Ride Comfort Index',
            value: Math.round((execData.rideComfortIndex || 0) * 100 * 10) / 10,
            unit: '%',
            target: 85,
            status: (execData.rideComfortIndex || 0) >= 0.85 ? 'good' : 'warning' as const,
            trend: 2.3,
            level: 'executive' as const,
          },
          {
            title: 'Energy Efficiency Index',
            value: Math.round((execData.energyEfficiencyIndex || 0) * 100 * 10) / 10,
            unit: '%',
            target: 85,
            status: (execData.energyEfficiencyIndex || 0) >= 0.85 ? 'good' : 'warning' as const,
            trend: -1.5,
            level: 'executive' as const,
          },
          {
            title: 'Environmental Robustness',
            value: Math.round((execData.environmentalRobustnessScore || 0) * 100 * 10) / 10,
            unit: '%',
            target: 88,
            status: (execData.environmentalRobustnessScore || 0) >= 0.88 ? 'good' : 'warning' as const,
            trend: 1.8,
            level: 'executive' as const,
          },
          {
            title: 'Warranty Risk Index',
            value: Math.round((execData.warrantyRiskIndex || 0) * 100 * 10) / 10,
            unit: '%',
            target: 15,
            status: (execData.warrantyRiskIndex || 0) <= 0.15 ? 'good' : 'warning' as const,
            trend: -0.5,
            level: 'executive' as const,
          },
        ]
        setExecutiveKPIs(execKPIs)

        // Fetch subsystem KPIs
        const subsystemData = await apiClient.get('/kpis?level=subsystem')
        const subsystem = (subsystemData as KPI[]).map((kpi) => {
          let title = ''
          let value = 0
          let unit = ''
          let status: 'good' | 'warning' | 'error' = 'good'
          let target: number | undefined

          if (kpi.domain === 'suspension') {
            title = 'Peak Strain Utilization'
            value = Math.round((kpi.peakStrainUtilizationPct || 0) * 10) / 10
            unit = '%'
            status = (kpi.peakStrainUtilizationPct || 0) < 80 ? 'good' : 'warning'
          } else if (kpi.domain === 'fatigue') {
            title = 'Fatigue Damage / 100km'
            value = Math.round((kpi.minerDamageTotal || 0) * 1000) / 1000
            unit = ''
            status = (kpi.minerDamageTotal || 0) < 1 ? 'good' : 'warning'
          } else if (kpi.domain === 'brakes') {
            title = 'Stopping Distance'
            value = Math.round((kpi.stoppingDistanceM || 0) * 10) / 10
            unit = 'm'
            target = 45
            status = (kpi.stoppingDistanceM || 0) <= 45 ? 'good' : 'warning'
          } else if (kpi.domain === 'nvh') {
            title = 'SPL Max'
            value = Math.round((kpi.splMax_dBA || 0) * 10) / 10
            unit = 'dBA'
            status = (kpi.splMax_dBA || 0) < 90 ? 'good' : 'warning'
          } else if (kpi.domain === 'ride') {
            title = 'Weighted RMS Acceleration'
            value = Math.round((kpi.iso2631_weightedRMS_ms2 || 0) * 100) / 100
            unit = 'm/s²'
            status = (kpi.iso2631_weightedRMS_ms2 || 0) < 0.8 ? 'good' : 'warning'
          } else if (kpi.domain === 'electrical') {
            title = 'Average Efficiency'
            value = Math.round((kpi.avgEfficiencyPct || 0) * 10) / 10
            unit = '%'
            status = (kpi.avgEfficiencyPct || 0) >= 85 ? 'good' : 'warning'
          }

          return {
            title,
            value,
            unit,
            status,
            target,
            level: 'subsystem' as const,
          }
        }).filter(k => k.title !== '')
        setSubsystemKPIs(subsystem)

        // Diagnostic KPIs
        const diagnosticData = await apiClient.get('/kpis?level=diagnostic')
        const diagnostic = (diagnosticData as any[]).map((kpi: any) => {
          let title = ''
          let value = 0
          let unit = ''
          let status: 'good' | 'warning' | 'error' | 'default' = 'default'

          if (kpi.peakStrain !== undefined) {
            title = 'Peak Strain'
            value = Math.round(kpi.peakStrain * 10) / 10
            unit = 'με'
            status = kpi.peakStrain < 2000 ? 'good' : 'warning'
          } else if (kpi.forceSpectrumPeak !== undefined) {
            title = 'Force Spectrum Peak'
            value = Math.round(kpi.forceSpectrumPeak * 10) / 10
            unit = 'kN'
            status = 'good'
          } else if (kpi.fftMagnitude !== undefined) {
            title = 'FFT Magnitude'
            value = Math.round(kpi.fftMagnitude * 100) / 100
            unit = 'g'
            status = 'good'
          } else if (kpi.orderAmplitude !== undefined) {
            title = 'Order Amplitude'
            value = Math.round(kpi.orderAmplitude * 100) / 100
            unit = 'g'
            status = 'good'
          } else if (kpi.shockVelocity !== undefined) {
            title = 'Shock Velocity'
            value = Math.round(kpi.shockVelocity * 10) / 10
            unit = 'm/s'
            status = kpi.shockVelocity < 4 ? 'good' : 'warning'
          } else if (kpi.clampLoadTrend !== undefined) {
            title = 'Clamp Load Trend'
            value = Math.round(kpi.clampLoadTrend * 100) / 100
            unit = '%/hr'
            status = Math.abs(kpi.clampLoadTrend) < 0.1 ? 'good' : 'warning'
          }

          return { title, value, unit, status, level: 'diagnostic' as const }
        }).filter(k => k.title !== '')
        setDiagnosticKPIs(diagnostic.length > 0 ? diagnostic : [
          { title: 'Peak Strain (με)', value: 1250, unit: 'με', level: 'diagnostic' as const },
          { title: 'Force Spectrum Peak', value: 8.5, unit: 'kN', level: 'diagnostic' as const },
          { title: 'FFT Magnitude', value: 0.45, unit: 'g', level: 'diagnostic' as const },
          { title: 'Order Amplitude', value: 0.32, unit: 'g', level: 'diagnostic' as const },
          { title: 'Shock Velocity', value: 2.8, unit: 'm/s', level: 'diagnostic' as const },
          { title: 'Clamp Load Trend', value: -0.05, unit: '%/hr', status: 'warning' as const, level: 'diagnostic' as const },
        ])
      } catch (error) {
        console.error('Failed to fetch KPIs:', error)
        // Fallback to mock data
        setExecutiveKPIs([
          { title: 'Safety Compliance Index', value: 94.5, unit: '%', target: 95, status: 'warning' as const, trend: 1.2, level: 'executive' as const },
          { title: 'Durability Margin', value: 78.3, unit: '% life remaining', target: 80, status: 'warning' as const, trend: -2.1, level: 'executive' as const },
          { title: 'NVH Compliance Score', value: 91.2, unit: '%', target: 90, status: 'good' as const, trend: 3.4, level: 'executive' as const },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchKPIs()
  }, [])

  if (loading) {
    return <Typography>Loading KPIs...</Typography>
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
          KPIs & Metrics Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hierarchical view of program, subsystem, and diagnostic KPIs
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="Executive / Program KPIs" />
          <Tab label="Subsystem Engineering KPIs" />
          <Tab label="Raw / Diagnostic KPIs" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {executiveKPIs.map((kpi, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <KPICard {...kpi} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {subsystemKPIs.map((kpi, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <KPICard {...kpi} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {diagnosticKPIs.map((kpi, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <KPICard {...kpi} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  )
}
