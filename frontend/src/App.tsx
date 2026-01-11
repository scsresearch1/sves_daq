import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import KPIs from './pages/KPIs'
import TestData from './pages/TestData'
import Analytics from './pages/Analytics'
import Compliance from './pages/Compliance'
import Plugins from './pages/Plugins'
import ML from './pages/ML'
import Settings from './pages/Settings'
import Help from './pages/Help'
import Chassis from './pages/domain/Chassis'
import Brake from './pages/domain/Brake'
import NVH from './pages/domain/NVH'
import Ride from './pages/domain/Ride'
import Powertrain from './pages/domain/Powertrain'
import Environment from './pages/domain/Environment'
import Layout from './components/Layout'
import mainBg from './assets/images/1.jpg'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#0a0e27',
      paper: '#1a1f3a',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${mainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/kpis" element={<Layout><KPIs /></Layout>} />
          <Route path="/test-data" element={<Layout><TestData /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/compliance" element={<Layout><Compliance /></Layout>} />
          <Route path="/plugins" element={<Layout><Plugins /></Layout>} />
          <Route path="/ml" element={<Layout><ML /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/help" element={<Layout><Help /></Layout>} />
          <Route path="/domain/chassis" element={<Layout><Chassis /></Layout>} />
          <Route path="/domain/brake" element={<Layout><Brake /></Layout>} />
          <Route path="/domain/nvh" element={<Layout><NVH /></Layout>} />
          <Route path="/domain/ride" element={<Layout><Ride /></Layout>} />
          <Route path="/domain/powertrain" element={<Layout><Powertrain /></Layout>} />
          <Route path="/domain/environment" element={<Layout><Environment /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
