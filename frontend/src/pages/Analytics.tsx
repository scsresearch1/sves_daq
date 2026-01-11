import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { apiClient } from '../services/api'
import analyticsBg from '@/assets/images/3.jpg'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

export default function Analytics() {
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiClient.get(`/analytics?domain=${selectedDomain}`)
        setAnalyticsData(data)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        // Mock data
        setAnalyticsData({
          domainDistribution: [
            { name: 'Safety', value: 35 },
            { name: 'Durability', value: 25 },
            { name: 'NVH', value: 20 },
            { name: 'Ride', value: 12 },
            { name: 'Power', value: 5 },
            { name: 'Environmental', value: 3 },
          ],
          performanceByDomain: [
            { domain: 'Safety', performance: 92.5 },
            { domain: 'Durability', performance: 88.3 },
            { domain: 'NVH', performance: 85.7 },
            { domain: 'Ride', performance: 90.1 },
            { domain: 'Power', performance: 87.9 },
            { domain: 'Environmental', performance: 91.2 },
          ],
        })
      }
    }

    fetchAnalytics()
  }, [selectedDomain])

  if (!analyticsData) {
    return <Typography>Loading analytics...</Typography>
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          position: 'relative',
          p: 2,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(25, 118, 210, 0.1) 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${analyticsBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            zIndex: 0,
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Analytics & Insights
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Domain Filter</InputLabel>
          <Select
            value={selectedDomain}
            label="Domain Filter"
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <MenuItem value="all">All Domains</MenuItem>
            <MenuItem value="safety">Safety</MenuItem>
            <MenuItem value="durability">Durability</MenuItem>
            <MenuItem value="nvh">NVH</MenuItem>
            <MenuItem value="ride">Ride</MenuItem>
            <MenuItem value="power">Power</MenuItem>
            <MenuItem value="environmental">Environmental</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40%',
                height: '100%',
                backgroundImage: `url(${analyticsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.04,
                zIndex: 0,
                pointerEvents: 'none',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Test Distribution by Domain
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.domainDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.domainDistribution.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40%',
                height: '100%',
                backgroundImage: `url(${analyticsBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.04,
                zIndex: 0,
                pointerEvents: 'none',
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Performance by Domain
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.performanceByDomain}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="domain" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#1976d2" name="Performance %" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
