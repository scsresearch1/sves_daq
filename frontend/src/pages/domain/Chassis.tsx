import { Box, Typography, Grid, Paper, Tabs, Tab, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'
import GlobalFilters from '../../components/GlobalFilters'
import KPICard from '../../components/KPICard'
import dashboardBg from '@/assets/images/3.jpg'
import { apiClient } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>
}

export default function Chassis() {
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
          apiClient.get('/domain/chassis'),
          apiClient.get('/domain/chassis/streams?limit=10')
        ])

        console.log('Chassis domain data:', domainData)
        console.log('Chassis streams data:', streamsData)

        setKpis(domainData.kpis || [])
        setEvents(domainData.events || [])
        setStreams(streamsData || [])
      } catch (error: any) {
        console.error('Failed to fetch chassis data:', error)
        setError(error.message || 'Failed to fetch chassis data')
        // Set empty arrays on error
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
    if (kpi.domain === 'suspension') {
      return [
        { title: 'Peak Strain Utilization', value: Math.round((kpi.peakStrainUtilizationPct || 0) * 10) / 10, unit: '%', status: (kpi.peakStrainUtilizationPct || 0) < 80 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Load Asymmetry L-R', value: Math.round((kpi.leftRightAsymmetryPct || 0) * 10) / 10, unit: '%', status: (kpi.leftRightAsymmetryPct || 0) < 15 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Bottom-out Frequency', value: kpi.bottomOutCount || 0, unit: 'events', status: (kpi.bottomOutCount || 0) < 5 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Load Sharing Ratio', value: Math.round((kpi.loadSharingArmVsStrut || 0) * 100) / 100, status: 'good' as const, level: 'subsystem' as const },
      ]
    } else if (kpi.domain === 'fatigue') {
      return [
        { title: 'Fatigue Damage / 100km', value: Math.round((kpi.minerDamageTotal || 0) * 1000) / 1000, status: (kpi.minerDamageTotal || 0) < 1 ? 'good' : 'warning' as const, level: 'subsystem' as const },
        { title: 'Remaining Life', value: Math.round((kpi.remainingLifeHours || 0) * 10) / 10, unit: 'hours', status: (kpi.remainingLifeHours || 0) > 50 ? 'good' : (kpi.remainingLifeHours || 0) > 20 ? 'warning' : 'error' as const, level: 'subsystem' as const },
      ]
    }
    return []
  }).flat()

  // Prepare strain data for chart
  const strainData = streams
    .filter(s => s.sensorId?.includes('strain'))
    .flatMap(s => s.points?.slice(0, 50) || [])
    .map((p: any, i: number) => ({
      time: i,
      value: p.value || 0,
      timestamp: new Date(p.ts).toLocaleTimeString()
    }))

  // Prepare fatigue rainflow data
  const fatigueKpi = kpis.find((k: any) => k.domain === 'fatigue')
  const rainflowData = fatigueKpi?.rainflowBins?.map((bin: any) => ({
    range: bin.rangeMPa,
    cycles: bin.cycles,
    damage: Math.round((bin.damage || 0) * 1000) / 1000
  })) || []

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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Please check that Firebase is configured and the seed data has been loaded.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <GlobalFilters />
      
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(46, 125, 50, 0.1) 100%)',
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
          Chassis, Suspension & Durability
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Strain & force visualization, fatigue analysis, load path dominance, remaining life estimation
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
          <Tab label="KPIs" />
          <Tab label="Strain & Forces" />
          <Tab label="Fatigue Analysis" />
          <Tab label="Load Paths" />
          <Tab label="Hotspots" />
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
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary" gutterBottom>
                    No KPIs available for this domain
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {kpis.length === 0 
                      ? 'No KPIs found in Firebase. Please run the seed script to populate data.'
                      : 'KPIs found but no matching domain data. Check domain mapping.'}
                  </Typography>
                  {kpis.length > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Found {kpis.length} KPI(s) with domains: {[...new Set(kpis.map((k: any) => k.domain))].join(', ')}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Strain & Force Visualization</Typography>
            {strainData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={strainData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: 'Strain (με)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} name="Strain" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No strain data available. Select a test to view time-domain strain histories.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Fatigue Damage Accumulation</Typography>
            {rainflowData.length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rainflowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cycles" fill="#1976d2" name="Cycles" />
                    </BarChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Rainflow Bins</Typography>
                    {rainflowData.map((bin, idx) => (
                      <Box key={idx} sx={{ mb: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <Typography variant="body2"><strong>{bin.range}</strong></Typography>
                        <Typography variant="body2">Cycles: {bin.cycles?.toLocaleString()}</Typography>
                        <Typography variant="body2">Damage: {bin.damage}</Typography>
                      </Box>
                    ))}
                    {fatigueKpi && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                        <Typography variant="subtitle2">Total Miner Damage: {Math.round((fatigueKpi.minerDamageTotal || 0) * 100) / 100}</Typography>
                        <Typography variant="subtitle2">Remaining Life: {Math.round((fatigueKpi.remainingLifeHours || 0) * 10) / 10} hours</Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No fatigue data available. Run endurance tests to generate rainflow analysis.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Load Path Dominance Analysis</Typography>
            {kpis.filter((k: any) => k.domain === 'suspension').length > 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Left-Right Asymmetry</Typography>
                    {kpis.filter((k: any) => k.domain === 'suspension').map((kpi: any, idx: number) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Typography variant="body2">
                          Asymmetry: {Math.round((kpi.leftRightAsymmetryPct || 0) * 10) / 10}%
                        </Typography>
                        <Typography variant="body2" color={kpi.leftRightAsymmetryPct > 15 ? 'error.main' : 'success.main'}>
                          {kpi.leftRightAsymmetryPct > 15 ? '⚠️ High asymmetry detected' : '✓ Balanced load distribution'}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>Load Sharing</Typography>
                    {kpis.filter((k: any) => k.domain === 'suspension').map((kpi: any, idx: number) => (
                      <Box key={idx}>
                        <Typography variant="body2">
                          Arm vs Strut Ratio: {Math.round((kpi.loadSharingArmVsStrut || 0) * 100) / 100}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {kpi.loadSharingArmVsStrut > 0.7 ? 'Strut dominant' : kpi.loadSharingArmVsStrut < 0.5 ? 'Arm dominant' : 'Balanced'}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                No load path data available. Run suspension tests to analyze load distribution.
              </Typography>
            )}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Hotspot Ranking</Typography>
            {events.length > 0 ? (
              <Grid container spacing={2}>
                {events
                  .filter((e: any) => ['HighStrain', 'Landing', 'BottomOut'].includes(e.eventType))
                  .slice(0, 10)
                  .map((event: any, idx: number) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: event.severity === 'High' ? 'error.dark' : 'warning.dark' }}>
                        <Typography variant="subtitle2">{event.eventType}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Severity: {event.severity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.timestamp).toLocaleString()}
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
                No hotspot events detected. Critical events will appear here when detected.
              </Typography>
            )}
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  )
}
