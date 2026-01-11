import { useEffect, useState } from 'react'
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  TrendingUp,
  CheckCircle,
  Speed,
  Science,
  Upload,
  Psychology,
  Assessment,
  FileDownload,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { apiClient } from '../services/api'
import dashboardBg from '@/assets/images/3.jpg'
import GlobalFilters from '../components/GlobalFilters'
import KPICard from '../components/KPICard'

interface DashboardMetrics {
  totalTests: number
  activeProjects: number
  complianceRate: number
  avgPerformance: number
  recentTrends: Array<{ date: string; value: number }>
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [executiveKPIs, setExecutiveKPIs] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, kpisData] = await Promise.all([
          apiClient.get('/metrics/dashboard'),
          apiClient.get('/kpis?level=executive').catch(() => [])
        ])
        setMetrics(metricsData)
        // Aggregate executive KPIs from array
        const kpiMap: any = {}
        if (Array.isArray(kpisData)) {
          kpisData.forEach((kpi: any) => {
            if (kpi.safetyComplianceIndex !== undefined) kpiMap.safetyComplianceIndex = kpi.safetyComplianceIndex
            if (kpi.durabilityMarginPct !== undefined) kpiMap.durabilityMarginPct = kpi.durabilityMarginPct
            if (kpi.nvhComplianceScore !== undefined) kpiMap.nvhComplianceScore = kpi.nvhComplianceScore
            if (kpi.warrantyRiskIndex !== undefined) kpiMap.warrantyRiskIndex = kpi.warrantyRiskIndex
          })
        }
        setExecutiveKPIs(kpiMap)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        // Set mock data for development
        setMetrics({
          totalTests: 1247,
          activeProjects: 23,
          complianceRate: 94.5,
          avgPerformance: 87.2,
          recentTrends: [
            { date: '2024-01-01', value: 85 },
            { date: '2024-01-02', value: 87 },
            { date: '2024-01-03', value: 86 },
            { date: '2024-01-04', value: 89 },
            { date: '2024-01-05', value: 88 },
          ],
        })
        setExecutiveKPIs({})
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading || !metrics) {
    return <Typography>Loading dashboard...</Typography>
  }

  const statCards = [
    {
      title: 'Total Tests',
      value: metrics.totalTests.toLocaleString(),
      icon: <Science />,
      color: '#1976d2',
    },
    {
      title: 'Active Projects',
      value: metrics.activeProjects,
      icon: <TrendingUp />,
      color: '#2e7d32',
    },
    {
      title: 'Compliance Rate',
      value: `${metrics.complianceRate}%`,
      icon: <CheckCircle />,
      color: '#ed6c02',
    },
    {
      title: 'Avg Performance',
      value: `${metrics.avgPerformance}%`,
      icon: <Speed />,
      color: '#9c27b0',
    },
  ]

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
          Executive Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Platform-level overview of vehicle validation programs
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Safety Compliance Index"
            value={executiveKPIs.safetyComplianceIndex || 94.5}
            unit="%"
            target={95}
            status={(executiveKPIs.safetyComplianceIndex || 0) >= 0.9 ? 'good' : 'warning'}
            trend={1.2}
            level="executive"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Durability Margin"
            value={executiveKPIs.durabilityMarginPct || 78.3}
            unit="% life"
            target={80}
            status={(executiveKPIs.durabilityMarginPct || 0) >= 80 ? 'good' : 'warning'}
            trend={-2.1}
            level="executive"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="NVH Compliance"
            value={executiveKPIs.nvhComplianceScore || 91.2}
            unit="%"
            target={90}
            status={(executiveKPIs.nvhComplianceScore || 0) >= 0.9 ? 'good' : 'warning'}
            trend={3.4}
            level="executive"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Warranty Risk"
            value={executiveKPIs.warrantyRiskIndex || 12.3}
            unit="%"
            target={15}
            status={(executiveKPIs.warrantyRiskIndex || 0) <= 0.15 ? 'good' : 'warning'}
            trend={-0.5}
            level="executive"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '60%',
                  height: '100%',
                  backgroundImage: `url(${dashboardBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.05,
                  zIndex: 0,
                },
              }}
            >
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: `${card.color}20`,
                      color: card.color,
                      mr: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {card.value}
                  </Typography>
                </Box>
                <Typography color="text.secondary" variant="body2">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics.recentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1976d2"
                  strokeWidth={2}
                  name="Performance Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List sx={{ mt: 1 }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/test-data')}>
                  <ListItemIcon>
                    <Upload color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Upload new test data" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/ml')}>
                  <ListItemIcon>
                    <Psychology color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Run predictive analysis" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/compliance')}>
                  <ListItemIcon>
                    <Assessment color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Generate compliance report" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={async () => {
                  try {
                    const kpis = await apiClient.get<any>('/kpis?level=executive')
                    const dataStr = JSON.stringify(kpis, null, 2)
                    const dataBlob = new Blob([dataStr], { type: 'application/json' })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `kpi-dashboard-${new Date().toISOString().split('T')[0]}.json`
                    link.click()
                    URL.revokeObjectURL(url)
                  } catch (error) {
                    console.error('Failed to export KPIs:', error)
                  }
                }}>
                  <ListItemIcon>
                    <FileDownload color="info" />
                  </ListItemIcon>
                  <ListItemText primary="Export KPI dashboard" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
