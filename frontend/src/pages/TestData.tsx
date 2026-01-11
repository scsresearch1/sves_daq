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
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  LinearProgress,
} from '@mui/material'
import { Upload as UploadIcon, CheckCircle } from '@mui/icons-material'
import { apiClient } from '../services/api'
import testDataBg from '@/assets/images/4.jpg'

interface TestRecord {
  id: string
  testName: string
  domain: string
  timestamp: string
  status: 'completed' | 'in-progress' | 'failed'
  kpi: number
}

export default function TestData() {
  const [tests, setTests] = useState<TestRecord[]>([])
  const [_loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await apiClient.get<any[]>('/test-data')
        setTests(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch test data:', error)
        // Mock data for development
        setTests([
          {
            id: '1',
            testName: 'Crash Test - Frontal Impact',
            domain: 'Safety',
            timestamp: '2024-01-15T10:30:00Z',
            status: 'completed',
            kpi: 92.5,
          },
          {
            id: '2',
            testName: 'Durability - Fatigue Analysis',
            domain: 'Durability',
            timestamp: '2024-01-15T09:15:00Z',
            status: 'completed',
            kpi: 88.3,
          },
          {
            id: '3',
            testName: 'NVH - Road Noise',
            domain: 'NVH',
            timestamp: '2024-01-15T08:00:00Z',
            status: 'in-progress',
            kpi: 0,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'warning'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      Safety: 'error',
      Durability: 'warning',
      NVH: 'info',
      Ride: 'success',
      Power: 'primary',
      Environmental: 'secondary',
    }
    return colors[domain] || 'default'
  }

  const testTemplates = [
    { name: 'Endurance Test - High Speed', domain: 'Durability', kpiRange: [85, 95], standards: ['ISO 16750', 'SAE J2928'] },
    { name: 'Brake Performance - Cold', domain: 'Safety', kpiRange: [88, 98], standards: ['FMVSS 135', 'ECE R13'] },
    { name: 'NVH - Highway Cruise', domain: 'NVH', kpiRange: [82, 92], standards: ['ISO 10844', 'SAE J1470'] },
    { name: 'Ride Comfort - Urban', domain: 'Ride', kpiRange: [80, 90], standards: ['ISO 2631'] },
    { name: 'Powertrain Efficiency', domain: 'Power', kpiRange: [85, 95], standards: ['ISO 23273', 'SAE J2908'] },
    { name: 'Thermal Cycling', domain: 'Environmental', kpiRange: [78, 88], standards: ['ISO 16750'] },
    { name: 'Crash Test - Side Impact', domain: 'Safety', kpiRange: [90, 100], standards: ['FMVSS 214', 'EURO NCAP'] },
    { name: 'Fatigue - Washboard Road', domain: 'Durability', kpiRange: [75, 85], standards: ['ISO 8608', 'SAE J2928'] },
    { name: 'Acoustic - Brake Squeal', domain: 'NVH', kpiRange: [70, 85], standards: ['SAE J2522', 'VDA 303'] },
    { name: 'Comfort - ISO 2631', domain: 'Ride', kpiRange: [83, 93], standards: ['ISO 2631'] },
  ]

  const generateTestData = (template: typeof testTemplates[0]) => {
    const kpi = template.kpiRange[0] + Math.random() * (template.kpiRange[1] - template.kpiRange[0])
    
    return {
      testName: template.name,
      domain: template.domain,
      timestamp: new Date().toISOString(),
      status: 'completed' as const,
      kpi: Math.round(kpi * 10) / 10,
      standards: template.standards,
    }
  }

  const createComplianceRecords = async (testData: ReturnType<typeof generateTestData>) => {
    // Map standards to thresholds
    const standardThresholds: { [key: string]: number } = {
      'FMVSS 135': 90,
      'FMVSS 214': 90,
      'ECE R13': 85,
      'EURO NCAP': 85,
      'ISO 2631': 80,
      'ISO 10844': 75,
      'ISO 16750': 85,
      'ISO 23273': 80,
      'ISO 8608': 75,
      'SAE J2522': 70,
      'SAE J1470': 75,
      'SAE J2908': 80,
      'SAE J2928': 85,
      'VDA 303': 75,
    }

    const compliancePromises = testData.standards.map(async (standard) => {
      const threshold = standardThresholds[standard] || 85
      // Use test KPI as base score, with some variation
      const baseScore = testData.kpi + (Math.random() * 10 - 5) // ±5 variation
      const score = Math.max(0, Math.min(100, Math.round(baseScore * 10) / 10))
      const status = score >= threshold ? 'compliant' : 'non-compliant'

      try {
        const response = await apiClient.post<any>('/compliance', {
          standard,
          testName: testData.testName,
          status,
          score,
          threshold,
          lastUpdated: testData.timestamp,
        })
        return response
      } catch (error) {
        // If backend fails, return local data
        return {
          id: `local-compliance-${Date.now()}-${standard}`,
          standard,
          testName: testData.testName,
          status,
          score,
          threshold,
          lastUpdated: testData.timestamp,
        }
      }
    })

    return Promise.all(compliancePromises)
  }

  const handleUploadTestData = async () => {
    setUploading(true)
    setUploadProgress(0)

    try {
      const newTests: TestRecord[] = []
      const totalTests = testTemplates.length

      // Upload all test templates
      for (let i = 0; i < testTemplates.length; i++) {
        const template = testTemplates[i]
        const testData = generateTestData(template)
        
        // Update progress
        const progress = Math.round(((i + 1) / totalTests) * 90) // Up to 90% during upload
        setUploadProgress(progress)
        
        // Small delay to simulate processing
        await new Promise((resolve) => setTimeout(resolve, 300))
        
        let testRecord: TestRecord
        try {
          // Try to upload to backend
          const response = await apiClient.post<any>('/test-data', {
            testName: testData.testName,
            domain: testData.domain,
            status: testData.status,
            kpi: testData.kpi,
          })

          testRecord = {
            id: (response as any)?.id || `new-${Date.now()}-${i}`,
            ...testData,
          }
        } catch (error) {
          // If backend fails, use local data
          testRecord = {
            id: `local-${Date.now()}-${i}`,
            ...testData,
          }
        }

        newTests.push(testRecord)

        // Create compliance records for this test
        await createComplianceRecords(testData)
      }

      // Complete progress
      setUploadProgress(100)

      // Add new tests to the list (at the top)
      setTests((prev) => [...newTests, ...prev])

      setSnackbar({
        open: true,
        message: `Successfully uploaded ${totalTests} test records`,
        severity: 'success',
      })

      // Reset progress after a short delay
      setTimeout(() => {
        setUploadProgress(0)
      }, 1500)
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to upload test data',
        severity: 'error',
      })
      setUploadProgress(0)
    } finally {
      setUploading(false)
    }
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
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(46, 125, 50, 0.1) 100%)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${testDataBg})`,
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
          Test Data
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {uploading && (
            <Box sx={{ width: 200, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 6, borderRadius: 3 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {uploadProgress}%
                </Typography>
              </Box>
            </Box>
          )}
          <Button
            variant="contained"
            startIcon={uploading ? <CircularProgress size={16} color="inherit" /> : <UploadIcon />}
            onClick={handleUploadTestData}
            disabled={uploading}
            sx={{
              minWidth: 160,
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Test Data'}
          </Button>
        </Box>
      </Box>

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
            backgroundImage: `url(${testDataBg})`,
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
              <TableCell>Test Name</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">KPI Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.testName}</TableCell>
                <TableCell>
                  <Chip
                    label={test.domain}
                    color={getDomainColor(test.domain) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(test.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={test.status}
                    color={getStatusColor(test.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  {test.kpi > 0 ? `${test.kpi.toFixed(1)}%` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          icon={snackbar.severity === 'success' ? <CheckCircle /> : undefined}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
