import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material'
import { apiClient } from '../services/api'
import complianceBg from '@/assets/images/4.jpg'

interface ComplianceRecord {
  id: string
  standard: string
  testName: string
  status: 'compliant' | 'non-compliant' | 'pending'
  score: number
  threshold: number
  lastUpdated: string
}

export default function Compliance() {
  const [records, setRecords] = useState<ComplianceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompliance = async () => {
      try {
        const data = await apiClient.get('/compliance')
        // Sort by lastUpdated descending to show newest first
        const sortedData = (data as ComplianceRecord[]).sort((a, b) => 
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        )
        setRecords(sortedData)
      } catch (error) {
        console.error('Failed to fetch compliance data:', error)
        // Return empty array if API fails
        setRecords([])
      } finally {
        setLoading(false)
      }
    }

    fetchCompliance()
    
    // Refresh compliance data every 5 seconds to catch new uploads
    const interval = setInterval(fetchCompliance, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'success'
      case 'non-compliant':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  const complianceRate =
    records.length > 0
      ? (records.filter((r) => r.status === 'compliant').length /
          records.length) *
        100
      : 0

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          position: 'relative',
          p: 2,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(237, 108, 2, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${complianceBg})`,
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
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Compliance Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track regulatory standards and compliance metrics
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {records.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No compliance records found. Upload test data to generate compliance records.
            </Alert>
          ) : complianceRate < 100 ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              Overall compliance rate: {complianceRate.toFixed(1)}%. Some tests
              require attention.
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mb: 3 }}>
              Overall compliance rate: {complianceRate.toFixed(1)}%. All tests are compliant.
            </Alert>
          )}

          <TableContainer
        component={Paper}
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${complianceBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.03,
            zIndex: 0,
            pointerEvents: 'none',
          },
          '& > *': {
            position: 'relative',
            zIndex: 1,
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Standard</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Threshold</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.standard}</TableCell>
                <TableCell>{record.testName}</TableCell>
                <TableCell>
                  <Chip
                    label={record.status}
                    color={getStatusColor(record.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{record.score.toFixed(1)}</TableCell>
                <TableCell align="right">
                  {record.threshold.toFixed(1)}
                </TableCell>
                <TableCell>
                  {new Date(record.lastUpdated).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </>
      )}
    </Box>
  )
}
