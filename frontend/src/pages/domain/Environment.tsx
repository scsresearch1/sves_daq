import { Box, Typography, Grid, Paper, Tabs, Tab, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import GlobalFilters from '../../components/GlobalFilters'
import KPICard from '../../components/KPICard'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

export default function Environment() {
  const [tabValue, setTabValue] = useState(0)
  const [kpis, setKpis] = useState<any[]>([])
  const [streams, setStreams] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [domainData, streamsData] = await Promise.all([
          apiClient.get('/domain/environment'),
          apiClient.get('/domain/environment/streams?limit=10')
        ])

        console.log('Environment domain data:', domainData)
        setKpis(domainData.kpis || [])
        setEvents(domainData.events || [])
        setStreams(streamsData || [])
      } catch (error: any) {
        console.error('Failed to fetch environment data:', error)
        setError(error.message || 'Failed to fetch environment data')
        setKpis([])
        setEvents([])
        setStreams([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Transform KPIs for display
  const displayKPIs = kpis.map((kpi: any) => {
    if (kpi.domain === 'environment') {
      return [
        { title: 'Winter Min Temp', value: Math.round((kpi.winterMinC || 0) * 10) / 10, unit: '°C', status: 'good' as const, level: 'subsystem' as const },
        { title: 'Desert Max Temp', value: Math.round((kpi.desertMaxC || 0) * 10) / 10, unit: '°C', status: (kpi.desertMaxC || 0) < 50 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Performance Drift', value: Math.round((kpi.performanceDriftPct || 0) * 10) / 10, unit: '%', status: (kpi.performanceDriftPct || 0) < 10 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Derating Active', value: kpi.deratingFlag ? 100 : 0, unit: '%', status: kpi.deratingFlag ? 'warning' : 'good' as const, level: 'subsystem' as const },
      ]
    } else if (kpi.domain === 'thermal') {
      return [
        { title: 'Peak Temperature', value: Math.round((kpi.strutTempPeakC || 0) * 10) / 10, unit: '°C', status: (kpi.strutTempPeakC || 0) < 150 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Thermal Gradient', value: Math.round((kpi.tempGradientCperMin || 0) * 10) / 10, unit: '°C/min', status: (kpi.tempGradientCperMin || 0) < 15 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Heat Soak Detected', value: kpi.heatSoakDetected ? 100 : 0, unit: '%', status: kpi.heatSoakDetected ? 'warning' : 'good' as const, level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare temperature data
  const tempStreams = streams.filter(s => 
    s.sensorId?.includes('temp') || 
    s.sensorId?.includes('ambient')
  )

  const tempData = tempStreams
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      temperature: p.value || 0
    }))

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography color="text.secondary">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <GlobalFilters />
      
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%)',
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
          Environment & Reliability
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temperature profiling, cold start/heat soak, performance derating, environment-tagged KPI drift
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="Temperature" />
          <Tab label="Cold Start" />
          <Tab label="Derating" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {displayKPIs.length > 0 ? (
              displayKPIs.map((kpi, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <KPICard {...kpi} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography color="text.secondary">No environment KPIs available</Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Temperature Profiling</Typography>
            {tempData.length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={tempData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="temperature" stroke="#0288d1" strokeWidth={2} name="Temperature (°C)" />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                {kpis.filter((k: any) => k.domain === 'thermal').map((kpi: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2">Thermal Analysis</Typography>
                      <Typography variant="body2">Peak Temp: {Math.round((kpi.strutTempPeakC || 0) * 10) / 10} °C</Typography>
                      <Typography variant="body2">Gradient: {Math.round((kpi.tempGradientCperMin || 0) * 10) / 10} °C/min</Typography>
                      <Typography variant="body2" color={kpi.heatSoakDetected ? 'warning.main' : 'success.main'}>
                        Heat Soak: {kpi.heatSoakDetected ? 'Detected' : 'Not detected'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No temperature data available. Run environmental tests to view temperature profiling.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Cold Start / Heat Soak</Typography>
            {events.filter((e: any) => e.eventType === 'WinterSoak' || e.eventType === 'DesertSoak').length > 0 ? (
              <Grid container spacing={2}>
                {events
                  .filter((e: any) => e.eventType === 'WinterSoak' || e.eventType === 'DesertSoak')
                  .map((event: any, idx: number) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: event.eventType === 'WinterSoak' ? 'info.dark' : 'warning.dark' }}>
                        <Typography variant="subtitle2">{event.eventType}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Severity: {event.severity}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No soak events recorded. Winter/Desert soak events will appear here.
              </Typography>
            )}
            {kpis.filter((k: any) => k.domain === 'environment').map((kpi: any, idx: number) => (
              <Box key={idx} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Temperature Range: {Math.round((kpi.winterMinC || 0) * 10) / 10}°C to {Math.round((kpi.desertMaxC || 0) * 10) / 10}°C</Typography>
              </Box>
            ))}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Performance Derating Logic</Typography>
            {kpis.filter((k: any) => k.domain === 'environment').length > 0 ? (
              <Grid container spacing={3}>
                {kpis.filter((k: any) => k.domain === 'environment').map((kpi: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Paper sx={{ p: 2, bgcolor: kpi.deratingFlag ? 'warning.dark' : 'success.dark' }}>
                      <Typography variant="subtitle2">Derating Status</Typography>
                      <Typography variant="body2">
                        Performance Drift: {Math.round((kpi.performanceDriftPct || 0) * 10) / 10}%
                      </Typography>
                      <Typography variant="body2" color={kpi.deratingFlag ? 'error.light' : 'success.light'}>
                        {kpi.deratingFlag ? '⚠ Derating Active' : '✓ No derating'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No derating data available. Run environmental tests to evaluate performance derating.
              </Typography>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
