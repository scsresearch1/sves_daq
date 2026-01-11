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

export default function Ride() {
  const [tabValue, setTabValue] = useState(0)
  const [kpis, setKpis] = useState<any[]>([])
  const [streams, setStreams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [domainData, streamsData] = await Promise.all([
          apiClient.get<any>('/domain/ride'),
          apiClient.get<any[]>('/domain/ride/streams?limit=10')
        ])

        console.log('Ride domain data:', domainData)
        setKpis((domainData as any)?.kpis || [])
        setStreams(Array.isArray(streamsData) ? streamsData : [])
      } catch (error: any) {
        console.error('Failed to fetch ride data:', error)
        setError(error.message || 'Failed to fetch ride data')
        setKpis([])
        setStreams([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Transform KPIs for display
  const displayKPIs = kpis.map((kpi: any) => {
    if (kpi.domain === 'ride') {
      return [
        { title: 'Weighted RMS Acceleration', value: Math.round((kpi.iso2631_weightedRMS_ms2 || 0) * 100) / 100, unit: 'm/s²', status: ((kpi.iso2631_weightedRMS_ms2 || 0) < 0.8 ? 'good' : 'warning') as 'good' | 'warning', level: 'subsystem' as const },
        { title: 'Exposure Duration', value: Math.round((kpi.exposureHours || 0) * 10) / 10, unit: 'hrs', status: ((kpi.exposureHours || 0) < 4 ? 'good' : 'warning') as 'good' | 'warning', level: 'subsystem' as const },
        { title: 'Comfort Status', value: kpi.comfortStatus === 'OK' ? 100 : kpi.comfortStatus === 'Warning' ? 60 : 30, unit: '%', status: (kpi.comfortStatus === 'OK' ? 'good' : kpi.comfortStatus === 'Warning' ? 'warning' : 'critical') as 'good' | 'warning' | 'critical', level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare acceleration data
  const accelStreams = streams.filter(s => 
    s.sensorId?.includes('accel') || 
    s.sensorId?.includes('seat') ||
    s.sensorId?.includes('steer')
  )

  const accelData = accelStreams
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      acceleration: p.value || 0
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
          background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
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
          Ride & Human Comfort
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ISO 2631 weighted vibration, exposure accumulation, ride harshness indices, transfer paths
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="ISO 2631" />
          <Tab label="Harshness" />
          <Tab label="Transfer Paths" />
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
                <Typography color="text.secondary">No ride KPIs available</Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>ISO 2631 Weighted Vibration</Typography>
            {kpis.filter((k: any) => k.domain === 'ride').length > 0 ? (
              <Grid container spacing={3}>
                {kpis.filter((k: any) => k.domain === 'ride').map((kpi: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2">ISO 2631 Analysis</Typography>
                      <Typography variant="body2">Weighted RMS: {Math.round((kpi.iso2631_weightedRMS_ms2 || 0) * 100) / 100} m/s²</Typography>
                      <Typography variant="body2">Exposure Hours: {Math.round((kpi.exposureHours || 0) * 10) / 10}</Typography>
                      <Typography variant="body2" color={kpi.comfortStatus === 'OK' ? 'success.main' : 'warning.main'}>
                        Comfort Status: {kpi.comfortStatus || 'Unknown'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
                {accelData.length > 0 && (
                  <Grid item xs={12}>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={accelData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis label={{ value: 'Acceleration (m/s²)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="acceleration" stroke="#2e7d32" strokeWidth={2} name="Weighted Acceleration" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No ISO 2631 data available. Run ride comfort tests to view weighted vibration analysis.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ride Harshness Indices</Typography>
            {kpis.filter((k: any) => k.domain === 'ride').length > 0 ? (
              <Box>
                {kpis.filter((k: any) => k.domain === 'ride').map((kpi: any, idx: number) => (
                  <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2">Harshness Evaluation</Typography>
                    <Typography variant="body2">
                      Weighted RMS: {Math.round((kpi.iso2631_weightedRMS_ms2 || 0) * 100) / 100} m/s²
                    </Typography>
                    <Typography variant="body2" color={kpi.iso2631_weightedRMS_ms2 < 0.8 ? 'success.main' : 'error.main'}>
                      {kpi.iso2631_weightedRMS_ms2 < 0.8 ? '✓ Acceptable harshness' : '⚠ High harshness detected'}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No harshness data available. Run ride tests to evaluate harshness indices.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Transfer Path Analysis</Typography>
            {accelStreams.length > 0 ? (
              <Grid container spacing={2}>
                {accelStreams.slice(0, 5).map((stream: any, idx: number) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2">{stream.sensorId}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Points: {stream.points?.length || 0}
                      </Typography>
                      {stream.points && stream.points.length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                          Max: {Math.round(Math.max(...stream.points.map((p: any) => p.value || 0)) * 100) / 100}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No transfer path data available. Install seat, steering, and floor accelerometers to analyze transfer paths.
              </Typography>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
