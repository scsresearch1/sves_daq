import { Box, Typography, Grid, Paper, Tabs, Tab, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import GlobalFilters from '../../components/GlobalFilters'
import KPICard from '../../components/KPICard'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

export default function Powertrain() {
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
          apiClient.get<any>('/domain/powertrain'),
          apiClient.get<any[]>('/domain/powertrain/streams?limit=10')
        ])

        console.log('Powertrain domain data:', domainData)
        setKpis((domainData as any)?.kpis || [])
        setStreams(Array.isArray(streamsData) ? streamsData : [])
      } catch (error: any) {
        console.error('Failed to fetch powertrain data:', error)
        setError(error.message || 'Failed to fetch powertrain data')
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
    if (kpi.domain === 'electrical') {
      return [
        { title: 'Average Efficiency', value: Math.round((kpi.avgEfficiencyPct || 0) * 10) / 10, unit: '%', status: ((kpi.avgEfficiencyPct || 0) >= 85 ? 'good' : 'warning') as 'good' | 'warning', level: 'subsystem' as const },
        { title: 'Peak Power Draw', value: Math.round((kpi.peakPowerW || 0) / 10) / 100, unit: 'kW', status: 'good' as const, level: 'subsystem' as const },
        { title: 'Energy per km', value: Math.round((kpi.energyPerKm_Wh || 0) * 10) / 10, unit: 'Wh/km', status: ((kpi.energyPerKm_Wh || 0) < 20 ? 'good' : 'warning') as 'good' | 'warning', level: 'subsystem' as const },
        { title: 'Harmonic Distortion (THD)', value: Math.round((kpi.thdPct || 0) * 10) / 10, unit: '%', status: ((kpi.thdPct || 0) < 5 ? 'good' : 'warning') as 'good' | 'warning', level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare power data
  const powerStreams = streams.filter(s => 
    s.sensorId?.includes('power') || 
    s.sensorId?.includes('voltage') ||
    s.sensorId?.includes('current') ||
    s.sensorId?.includes('thd')
  )

  const powerData = powerStreams
    .filter(s => s.sensorId?.includes('power'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      power: p.value || 0
    }))

  const voltageData = powerStreams
    .filter(s => s.sensorId?.includes('voltage'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      voltage: p.value || 0
    }))

  const thdData = powerStreams
    .filter(s => s.sensorId?.includes('thd'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      thd: p.value || 0
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
          background: 'linear-gradient(135deg, rgba(237, 108, 2, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)',
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
          Powertrain / Electrical
        </Typography>
        <Typography variant="body2" color="text.secondary">
          AC/DC power analysis, efficiency maps, harmonic distortion, transient overload detection
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="Power Analysis" />
          <Tab label="Efficiency" />
          <Tab label="Harmonics" />
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
                <Typography color="text.secondary">No powertrain KPIs available</Typography>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>AC/DC Power Analysis</Typography>
            {powerData.length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={powerData}>
                      <defs>
                        <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ed6c02" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ed6c02" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis label={{ value: 'Power (W)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="power" stroke="#ed6c02" fillOpacity={1} fill="url(#colorPower)" name="Power (W)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Grid>
                {voltageData.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={voltageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="voltage" stroke="#1976d2" name="Voltage (V)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Grid>
                )}
                {kpis.filter((k: any) => k.domain === 'electrical').map((kpi: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2">Power Metrics</Typography>
                      <Typography variant="body2">Peak Power: {Math.round((kpi.peakPowerW || 0) / 10) / 100} kW</Typography>
                      <Typography variant="body2">Average Efficiency: {Math.round((kpi.avgEfficiencyPct || 0) * 10) / 10}%</Typography>
                      <Typography variant="body2">Energy per km: {Math.round((kpi.energyPerKm_Wh || 0) * 10) / 10} Wh/km</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No power data available. Run electrical tests to view power analysis.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Efficiency Maps</Typography>
            {kpis.filter((k: any) => k.domain === 'electrical').length > 0 ? (
              <Grid container spacing={3}>
                {kpis.filter((k: any) => k.domain === 'electrical').map((kpi: any, idx: number) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2">Efficiency Analysis</Typography>
                      <Typography variant="body2">
                        Average Efficiency: {Math.round((kpi.avgEfficiencyPct || 0) * 10) / 10}%
                      </Typography>
                      <Typography variant="body2" color={kpi.avgEfficiencyPct >= 85 ? 'success.main' : 'warning.main'}>
                        {kpi.avgEfficiencyPct >= 85 ? '✓ High efficiency' : '⚠ Efficiency below target'}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Peak Power: {Math.round((kpi.peakPowerW || 0) / 10) / 100} kW
                      </Typography>
                      <Typography variant="body2">
                        Energy per km: {Math.round((kpi.energyPerKm_Wh || 0) * 10) / 10} Wh/km
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No efficiency data available. Run power tests to generate efficiency maps.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Harmonic Distortion</Typography>
            {thdData.length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={thdData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis label={{ value: 'THD (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="thd" stroke="#d32f2f" strokeWidth={2} name="Total Harmonic Distortion (%)" />
                      <Line type="monotone" dataKey={() => 5} stroke="#ff9800" strokeDasharray="5 5" name="Threshold (5%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  {kpis.filter((k: any) => k.domain === 'electrical').map((kpi: any, idx: number) => (
                    <Paper key={idx} sx={{ p: 2 }}>
                      <Typography variant="subtitle2">THD Analysis</Typography>
                      <Typography variant="body2">
                        THD: {Math.round((kpi.thdPct || 0) * 10) / 10}%
                      </Typography>
                      <Typography variant="body2" color={kpi.thdPct < 5 ? 'success.main' : 'error.main'}>
                        {kpi.thdPct < 5 ? '✓ Acceptable distortion' : '⚠ High harmonic distortion'}
                      </Typography>
                    </Paper>
                  ))}
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No harmonic distortion data available. Run power quality tests to analyze THD.
              </Typography>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
