import { ReactNode } from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Science as ScienceIcon,
  Analytics as AnalyticsIcon,
  Gavel as ComplianceIcon,
  Settings as SettingsIcon,
  Psychology as MLIcon,
  Extension as PluginIcon,
  Assessment as KPIIcon,
  Engineering as ChassisIcon,
  LocalFireDepartment as BrakeIcon,
  VolumeUp as NVHIcon,
  DirectionsCar as RideIcon,
  Bolt as PowerIcon,
  AcUnit as EnvironmentIcon,
  Help as HelpIcon,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import sidebarBg from '@/assets/images/2.jpg'
import { useState } from 'react'
import { Collapse } from '@mui/material'

const drawerWidth = 280

interface LayoutProps {
  children: ReactNode
}

const mainMenuItems = [
  {
    text: 'Executive Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    tooltip: 'Platform-level overview: program status, compliance scores, and key metrics at a glance',
  },
  {
    text: 'KPIs & Metrics',
    icon: <KPIIcon />,
    path: '/kpis',
    tooltip: 'Hierarchical KPIs: executive, subsystem, and diagnostic metrics with trends and targets',
  },
]

const domainMenuItems = [
  {
    text: 'Chassis & Durability',
    icon: <ChassisIcon />,
    path: '/domain/chassis',
    tooltip: 'Strain analysis, fatigue damage, load paths, and remaining life estimation for structural components',
  },
  {
    text: 'Brake & Safety',
    icon: <BrakeIcon />,
    path: '/domain/brake',
    tooltip: 'Braking performance, fade analysis, ABS tracking, and regulatory compliance (FMVSS, ECE)',
  },
  {
    text: 'NVH & Acoustics',
    icon: <NVHIcon />,
    path: '/domain/nvh',
    tooltip: 'Noise, vibration, and harshness: FFT analysis, order tracking, squeal detection, and SPL compliance',
  },
  {
    text: 'Ride & Comfort',
    icon: <RideIcon />,
    path: '/domain/ride',
    tooltip: 'Human comfort metrics: ISO 2631 weighted vibration, harshness indices, and transfer path analysis',
  },
  {
    text: 'Powertrain',
    icon: <PowerIcon />,
    path: '/domain/powertrain',
    tooltip: 'Electrical and powertrain: AC/DC power analysis, efficiency maps, and harmonic distortion',
  },
  {
    text: 'Environment',
    icon: <EnvironmentIcon />,
    path: '/domain/environment',
    tooltip: 'Thermal analysis: temperature profiling, cold start behavior, and performance derating',
  },
]

const systemMenuItems = [
  {
    text: 'Plugins',
    icon: <PluginIcon />,
    path: '/plugins',
    tooltip: 'Standards compliance, analytics, and AI plugins: enable/configure modules for specialized analysis',
  },
  {
    text: 'ML Predictions',
    icon: <MLIcon />,
    path: '/ml',
    tooltip: 'AI-powered predictions: remaining life, failure risk, brake fade, and design optimization insights',
  },
  {
    text: 'Test Data',
    icon: <ScienceIcon />,
    path: '/test-data',
    tooltip: 'Manage test records: upload, view, and analyze multi-physics test data across all domains',
  },
  {
    text: 'Compliance',
    icon: <ComplianceIcon />,
    path: '/compliance',
    tooltip: 'Regulatory compliance tracking: standards evaluation, scores, and compliance status monitoring',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    tooltip: 'Configuration: sensor setup, user roles, calibration management, and traceability settings',
  },
  {
    text: 'Help',
    icon: <HelpIcon />,
    path: '/help',
    tooltip: 'Product manual, user guide, troubleshooting, and FAQ',
  },
]

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [domainsOpen, setDomainsOpen] = useState(true)

  const drawer = (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${sidebarBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: 0,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
          SVES-DAQ
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {mainMenuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={item.tooltip}
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(25, 118, 210, 0.95)',
                  color: 'white',
                  fontSize: '0.875rem',
                  maxWidth: 280,
                  padding: '12px 16px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(25, 118, 210, 0.95)',
                  },
                },
              },
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />
      <ListItemButton onClick={() => setDomainsOpen(!domainsOpen)}>
        <ListItemIcon>
          <AnalyticsIcon />
        </ListItemIcon>
        <ListItemText primary="Domain Analysis" />
        {domainsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={domainsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {domainMenuItems.map((item) => (
            <Tooltip
              key={item.text}
              title={item.tooltip}
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'rgba(156, 39, 176, 0.95)',
                    color: 'white',
                    fontSize: '0.875rem',
                    maxWidth: 300,
                    padding: '12px 16px',
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '& .MuiTooltip-arrow': {
                      color: 'rgba(156, 39, 176, 0.95)',
                    },
                  },
                },
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Collapse>

      <Divider sx={{ my: 1 }} />
      <List>
        {systemMenuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={item.tooltip}
            placement="right"
            arrow
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(46, 125, 50, 0.95)',
                  color: 'white',
                  fontSize: '0.875rem',
                  maxWidth: 300,
                  padding: '12px 16px',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '& .MuiTooltip-arrow': {
                    color: 'rgba(46, 125, 50, 0.95)',
                  },
                },
              },
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Scientific Vehicle Validation & Intelligence Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={false}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
