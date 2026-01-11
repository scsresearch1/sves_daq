import { Box, Typography, Grid, Paper, Tabs, Tab, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import GlobalFilters from '../../components/GlobalFilters'
import KPICard from '../../components/KPICard'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

export default function NVH() {
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
          apiClient.get('/domain/nvh'),
          apiClient.get('/domain/nvh/streams?limit=10')
        ])

        console.log('NVH domain data:', domainData)
        setKpis(domainData.kpis || [])
        setEvents(domainData.events || [])
        setStreams(streamsData || [])
      } catch (error: any) {
        console.error('Failed to fetch NVH data:', error)
        setError(error.message || 'Failed to fetch NVH data')
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
    if (kpi.domain === 'nvh') {
      return [
        { title: 'SPL Max', value: Math.round((kpi.splMax_dBA || 0) * 10) / 10, unit: 'dBA', status: (kpi.splMax_dBA || 0) < 90 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'LAeq', value: Math.round((kpi.laeq_dBA || 0) * 10) / 10, unit: 'dBA', status: (kpi.laeq_dBA || 0) < 75 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Squeal Occurrences', value: kpi.squealOccurrences || 0, unit: 'events', status: (kpi.squealOccurrences || 0) < 3 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Dominant Order', value: Math.round((kpi.dominantOrder || 0) * 10) / 10, unit: '', status: 'good' as const, level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare frequency/order data
  const nvhStreams = streams.filter(s => 
    s.sensorId?.includes('mic') || 
    s.sensorId?.includes('freq') || 
    s.sensorId?.includes('order') ||
    s.sensorId?.includes('rpm')
  )

  const frequencyData = nvhStreams
    .filter(s => s.sensorId?.includes('freq') || s.sensorId?.includes('dom_freq'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      frequency: p.value || 0
    }))

  const orderData = nvhStreams
    .filter(s => s.sensorId?.includes('order'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      amplitude: p.value || 0
    }))

  const splData = nvhStreams
    .filter(s => s.sensorId?.includes('mic') || s.sensorId?.includes('spl'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      spl: p.value || 0
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
          NVH & Acoustics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time-frequency analysis, order tracking, brake squeal detection, SPL compliance
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="Time-Frequency" />
          <Tab label="Order Tracking" />
          <Tab label="Squeal Detection" />
          <Tab label="SPL Compliance" />
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
                <Typography color="text.secondary">No NVH KPIs available</Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Time-Frequency Analysis</Typography>
            {frequencyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'Frequency (Hz)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="frequency" stroke="#9c27b0" strokeWidth={2} name="Dominant Frequency (Hz)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No frequency data available. Run NVH tests to view FFT/STFT analysis.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Order Tracking & Waterfall</Typography>
            {orderData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'Order Amplitude', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amplitude" stroke="#1976d2" strokeWidth={2} name="Order Amplitude" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No order tracking data available. Run order analysis tests to view waterfall plots.
              </Typography>
            )}
            {kpis.filter((k: any) => k.domain === 'nvh').map((kpi: any, idx: number) => (
              <Box key={idx} sx={{ mt: 2 }}>
                <Typography variant="body2">Dominant Order: {Math.round((kpi.dominantOrder || 0) * 10) / 10}</Typography>
              </Box>
            ))}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Brake Squeal Detection</Typography>
            {events.filter((e: any) => e.eventType === 'BrakeSqueal').length > 0 ? (
              <Grid container spacing={2}>
                {events
                  .filter((e: any) => e.eventType === 'BrakeSqueal')
                  .map((event: any, idx: number) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: 'error.dark' }}>
                        <Typography variant="subtitle2">Brake Squeal Detected</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Severity: {event.severity}
                        </Typography>
                        {event.relatedSensors && (
                          <Typography variant="caption" color="text.secondary">
                            Sensors: {event.relatedSensors.join(', ')}
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No squeal events detected. Brake squeal events will appear here when detected.
              </Typography>
            )}
            {kpis.filter((k: any) => k.domain === 'nvh').map((kpi: any, idx: number) => (
              <Box key={idx} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Squeal Occurrences: {kpi.squealOccurrences || 0}</Typography>
              </Box>
            ))}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>SPL Compliance Evaluation</Typography>
            {splData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={splData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'SPL (dBA)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spl" stroke="#2e7d32" strokeWidth={2} name="Sound Pressure Level (dBA)" />
                  <Line type="monotone" dataKey={() => 85} stroke="#d32f2f" strokeDasharray="5 5" name="Compliance Threshold (85 dBA)" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No SPL data available. Run acoustic tests to evaluate compliance.
              </Typography>
            )}
            {kpis.filter((k: any) => k.domain === 'nvh').map((kpi: any, idx: number) => (
              <Box key={idx} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">SPL Max: {Math.round((kpi.splMax_dBA || 0) * 10) / 10} dBA</Typography>
                <Typography variant="subtitle2">LAeq: {Math.round((kpi.laeq_dBA || 0) * 10) / 10} dBA</Typography>
                <Typography variant="body2" color={kpi.splMax_dBA < 90 ? 'success.main' : 'error.main'}>
                  {kpi.splMax_dBA < 90 ? '✓ Compliant' : '✗ Exceeds threshold'}
                </Typography>
              </Box>
            ))}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
