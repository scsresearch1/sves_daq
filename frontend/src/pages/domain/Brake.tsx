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

export default function Brake() {
  const [tabValue, setTabValue] = useState(0)
  const [kpis, setKpis] = useState<any[]>([])
  const [streams, setStreams] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [compliance, setCompliance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [domainData, streamsData, complianceData] = await Promise.all([
          apiClient.get('/domain/brake'),
          apiClient.get('/domain/brake/streams?limit=10'),
          apiClient.get('/compliance').catch(() => [])
        ])

        console.log('Brake domain data:', domainData)
        console.log('Brake streams data:', streamsData)

        setKpis(domainData.kpis || [])
        setEvents(domainData.events || [])
        setStreams(streamsData || [])
        setCompliance(Array.isArray(complianceData) ? complianceData.filter((c: any) => 
          c.standard?.includes('FMVSS') || c.standard?.includes('ECE') || c.standard?.includes('Brake')
        ) : [])
      } catch (error: any) {
        console.error('Failed to fetch brake data:', error)
        setError(error.message || 'Failed to fetch brake data')
        setKpis([])
        setEvents([])
        setStreams([])
        setCompliance([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Transform KPIs for display
  const displayKPIs = kpis.map((kpi: any) => {
    if (kpi.domain === 'brakes') {
      return [
        { title: 'Stopping Distance', value: Math.round((kpi.stoppingDistanceM || 0) * 10) / 10, unit: 'm', target: 45, status: (kpi.stoppingDistanceM || 0) <= 45 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'MFDD', value: Math.round((kpi.mfdd || 0) * 100) / 100, unit: 'm/s²', target: 7.5, status: (kpi.mfdd || 0) >= 7.5 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Brake Fade Slope', value: Math.round((kpi.fadeSlope || 0) * 100) / 100, unit: '%/cycle', status: (kpi.fadeSlope || 0) > -0.15 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'ABS Activation Rate', value: Math.round((kpi.absActivationRate || 0) * 100 * 10) / 10, unit: '%', status: (kpi.absActivationRate || 0) < 0.5 ? 'good' : 'warning' as const, level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare brake performance data
  const brakeStreams = streams.filter(s => 
    s.sensorId?.includes('brake') || 
    s.sensorId?.includes('speed') || 
    s.sensorId?.includes('decel')
  )

  const performanceData = brakeStreams
    .flatMap(s => s.points?.slice(0, 30) || [])
    .map((p: any, i: number) => ({
      time: i,
      speed: p.sensorId?.includes('speed') ? p.value : null,
      pressure: p.sensorId?.includes('pressure') ? p.value : null,
      decel: p.sensorId?.includes('decel') ? p.value : null,
    }))
    .filter((d: any) => d.speed !== null || d.pressure !== null || d.decel !== null)

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
          background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.1) 0%, rgba(237, 108, 2, 0.1) 100%)',
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
          Brake & Safety
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stopping distance, MFDD, brake fade analysis, ABS intervention, regulatory compliance
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="Performance" />
          <Tab label="Fade Analysis" />
          <Tab label="ABS Tracking" />
          <Tab label="Compliance" />
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
                <Typography color="text.secondary">No brake KPIs available</Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Stopping Distance & MFDD</Typography>
            {kpis.filter((k: any) => k.domain === 'brakes').length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {kpis.filter((k: any) => k.domain === 'brakes').map((kpi: any, idx: number) => (
                    <Box key={idx} sx={{ mb: 2 }}>
                      <Typography variant="subtitle2">Test {idx + 1}</Typography>
                      <Typography variant="body2">Stopping Distance: {Math.round((kpi.stoppingDistanceM || 0) * 10) / 10} m</Typography>
                      <Typography variant="body2">MFDD: {Math.round((kpi.mfdd || 0) * 100) / 100} m/s²</Typography>
                      <Typography variant="body2" color={kpi.stoppingDistanceM <= 45 && kpi.mfdd >= 7.5 ? 'success.main' : 'warning.main'}>
                        {kpi.stoppingDistanceM <= 45 && kpi.mfdd >= 7.5 ? '✓ Compliant' : '⚠ Review required'}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md={6}>
                  {performanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {performanceData.some((d: any) => d.speed !== null) && (
                          <Line type="monotone" dataKey="speed" stroke="#1976d2" name="Speed (kmph)" />
                        )}
                        {performanceData.some((d: any) => d.pressure !== null) && (
                          <Line type="monotone" dataKey="pressure" stroke="#d32f2f" name="Pressure (bar)" />
                        )}
                        {performanceData.some((d: any) => d.decel !== null) && (
                          <Line type="monotone" dataKey="decel" stroke="#2e7d32" name="Deceleration (g)" />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                      No performance data available
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No brake performance data available. Run brake tests to view metrics.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Brake Fade & Recovery</Typography>
            {kpis.filter((k: any) => k.domain === 'brakes').length > 0 ? (
              <Box>
                {kpis.filter((k: any) => k.domain === 'brakes').map((kpi: any, idx: number) => (
                  <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="subtitle2">Fade Analysis</Typography>
                    <Typography variant="body2">
                      Fade Slope: {Math.round((kpi.fadeSlope || 0) * 100) / 100} %/cycle
                    </Typography>
                    <Typography variant="body2" color={kpi.fadeSlope > -0.15 ? 'success.main' : 'error.main'}>
                      {kpi.fadeSlope > -0.15 ? '✓ Acceptable fade behavior' : '⚠ Significant fade detected'}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No fade data available. Run repeated brake tests to analyze fade behavior.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>ABS Intervention Tracking</Typography>
            {events.filter((e: any) => e.eventType === 'ABSActivation' || e.eventType === 'BrakeStop').length > 0 ? (
              <Grid container spacing={2}>
                {events
                  .filter((e: any) => e.eventType === 'ABSActivation' || e.eventType === 'BrakeStop')
                  .map((event: any, idx: number) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: event.eventType === 'ABSActivation' ? 'warning.dark' : 'info.dark' }}>
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
                No ABS events recorded. ABS activation events will appear here.
              </Typography>
            )}
            {kpis.filter((k: any) => k.domain === 'brakes').map((kpi: any, idx: number) => (
              <Box key={idx} sx={{ mt: 2 }}>
                <Typography variant="subtitle2">ABS Activation Rate: {Math.round((kpi.absActivationRate || 0) * 100 * 10) / 10}%</Typography>
              </Box>
            ))}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Regulatory Compliance</Typography>
            {compliance.length > 0 ? (
              <Grid container spacing={2}>
                {compliance.map((record: any, idx: number) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Paper sx={{ p: 2, bgcolor: record.status === 'compliant' ? 'success.dark' : 'error.dark' }}>
                      <Typography variant="subtitle2">{record.standard}</Typography>
                      <Typography variant="body2">Test: {record.testName}</Typography>
                      <Typography variant="body2">Score: {record.score} / {record.threshold}</Typography>
                      <Typography variant="body2" color={record.status === 'compliant' ? 'success.light' : 'error.light'}>
                        {record.status === 'compliant' ? '✓ Compliant' : '✗ Non-compliant'}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No compliance records available. Run FMVSS 135 or ECE R13 tests to generate compliance data.
              </Typography>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
