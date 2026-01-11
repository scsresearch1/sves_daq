import { Card, CardContent, Box, Typography, LinearProgress, Chip } from '@mui/material'
import { TrendingUp, TrendingDown, Warning } from '@mui/icons-material'

interface KPICardProps {
  title: string
  value: number | string
  unit?: string
  target?: number
  status?: 'good' | 'warning' | 'critical'
  trend?: number
  subtitle?: string
  level?: 'executive' | 'subsystem' | 'diagnostic'
}

export default function KPICard({
  title,
  value,
  unit = '',
  target,
  status = 'good',
  trend,
  subtitle,
  level = 'executive',
}: KPICardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return '#2e7d32'
      case 'warning':
        return '#ed6c02'
      case 'critical':
        return '#d32f2f'
      default:
        return '#1976d2'
    }
  }

  const getLevelColor = () => {
    switch (level) {
      case 'executive':
        return '#1976d2'
      case 'subsystem':
        return '#9c27b0'
      case 'diagnostic':
        return '#757575'
      default:
        return '#1976d2'
    }
  }

  const progress = target ? (Number(value) / target) * 100 : 0

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Chip
            label={level}
            size="small"
            sx={{
              bgcolor: `${getLevelColor()}20`,
              color: getLevelColor(),
              fontSize: '0.65rem',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </Typography>
          {unit && (
            <Typography variant="body2" color="text.secondary">
              {unit}
            </Typography>
          )}
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              {trend > 0 ? (
                <TrendingUp sx={{ color: '#2e7d32', fontSize: 20 }} />
              ) : trend < 0 ? (
                <TrendingDown sx={{ color: '#d32f2f', fontSize: 20 }} />
              ) : null}
              <Typography
                variant="caption"
                sx={{ color: trend > 0 ? '#2e7d32' : trend < 0 ? '#d32f2f' : 'inherit' }}
              >
                {trend > 0 ? '+' : ''}
                {trend?.toFixed(1)}%
              </Typography>
            </Box>
          )}
        </Box>

        {target && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Target: {target} {unit}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {progress.toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(progress, 100)}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getStatusColor(),
                },
              }}
            />
          </Box>
        )}

        {status !== 'good' && (
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Warning sx={{ fontSize: 16, color: getStatusColor() }} />
            <Typography variant="caption" sx={{ color: getStatusColor() }}>
              {status === 'warning' ? 'Attention Required' : 'Critical Issue'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
