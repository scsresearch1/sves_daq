import { Box, Typography, Button, Grid, Card, CardContent, Container, Fade, Slide, Zoom } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  Dashboard,
  Analytics,
  Psychology,
  Extension,
  Security,
  Speed,
  Assessment,
  Engineering,
  LocalFireDepartment,
  VolumeUp,
  DirectionsCar,
  Bolt,
  AcUnit,
  ArrowForward,
  CheckCircle,
  AutoAwesome,
  ShowChart,
  PrecisionManufacturing,
} from '@mui/icons-material'
import { AreaChart, Area, BarChart as ReBarChart, Bar, PieChart as RePieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import landingBg1 from '@/assets/images/1.jpg'
import landingBg2 from '@/assets/images/2.jpg'
import landingBg3 from '@/assets/images/3.jpg'
import landingBg4 from '@/assets/images/4.jpg'

export default function Landing() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Mock chart data for previews
  const chartData = [
    { name: 'Mon', value: 85, kpi: 92 },
    { name: 'Tue', value: 87, kpi: 94 },
    { name: 'Wed', value: 86, kpi: 91 },
    { name: 'Thu', value: 89, kpi: 95 },
    { name: 'Fri', value: 88, kpi: 93 },
  ]

  const pieData = [
    { name: 'Safety', value: 35, color: '#d32f2f' },
    { name: 'Durability', value: 25, color: '#1976d2' },
    { name: 'NVH', value: 20, color: '#9c27b0' },
    { name: 'Ride', value: 12, color: '#2e7d32' },
    { name: 'Power', value: 5, color: '#ed6c02' },
    { name: 'Env', value: 3, color: '#0288d1' },
  ]

  const features = [
    {
      icon: <Dashboard sx={{ fontSize: 48 }} />,
      title: 'Executive Dashboard',
      description: 'Real-time platform-level insights and program status at a glance',
      color: '#1976d2',
    },
    {
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: 'Multi-Physics Analysis',
      description: 'Unified platform for safety, durability, NVH, ride, power, and environmental domains',
      color: '#9c27b0',
    },
    {
      icon: <Psychology sx={{ fontSize: 48 }} />,
      title: 'AI-Powered Predictions',
      description: 'ML models for remaining life, failure risk, and design optimization',
      color: '#2e7d32',
    },
    {
      icon: <Extension sx={{ fontSize: 48 }} />,
      title: 'Plugin Architecture',
      description: 'Standards compliance, analytics, and predictive AI plugins',
      color: '#ed6c02',
    },
    {
      icon: <Security sx={{ fontSize: 48 }} />,
      title: 'Regulatory Compliance',
      description: 'Automated evaluation for ISO, SAE, ECE, FMVSS, and VDA standards',
      color: '#d32f2f',
    },
    {
      icon: <Speed sx={{ fontSize: 48 }} />,
      title: 'Real-Time Analytics',
      description: 'Live KPI calculations and performance monitoring across all domains',
      color: '#0288d1',
    },
  ]

  const domains = [
    { icon: <Engineering />, name: 'Chassis & Durability', color: '#1976d2' },
    { icon: <LocalFireDepartment />, name: 'Brake & Safety', color: '#d32f2f' },
    { icon: <VolumeUp />, name: 'NVH & Acoustics', color: '#9c27b0' },
    { icon: <DirectionsCar />, name: 'Ride & Comfort', color: '#2e7d32' },
    { icon: <Bolt />, name: 'Powertrain', color: '#ed6c02' },
    { icon: <AcUnit />, name: 'Environment', color: '#0288d1' },
  ]

  const benefits = [
    'Convert raw sensor signals into standardized KPIs',
    'Predictive insights for design optimization',
    'Real-time compliance and risk evaluation',
    'Multi-run comparison and overlay analysis',
    'Enterprise-scale data handling',
    'Test-to-decision operating system',
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${landingBg1})`,
          backgroundSize: 'cover',
          backgroundPosition: `center ${scrollY * 0.3}px`,
          backgroundAttachment: 'fixed',
          opacity: 0.25,
          zIndex: 0,
          animation: 'fadeIn 2s ease-in, parallax 20s ease-in-out infinite',
          '@keyframes parallax': {
            '0%, 100%': { transform: 'scale(1) translateY(0)' },
            '50%': { transform: 'scale(1.05) translateY(-20px)' },
          },
        },
        '&::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(25, 118, 210, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(156, 39, 176, 0.2) 0%, transparent 50%)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.8 },
          },
        },
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 0.25 },
        },
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          ref={heroRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
            position: 'relative',
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Animated background elements with images */}
          <Box
            sx={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              width: 400,
              height: 400,
              borderRadius: '50%',
              backgroundImage: `url(${landingBg2})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              filter: 'blur(40px)',
              animation: 'float 8s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
                '33%': { transform: 'translate(30px, -30px) scale(1.1) rotate(5deg)' },
                '66%': { transform: 'translate(-20px, 20px) scale(0.95) rotate(-5deg)' },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              backgroundImage: `url(${landingBg3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.15,
              filter: 'blur(50px)',
              animation: 'float 10s ease-in-out infinite reverse',
            }}
          />
          
          {/* Particle-like elements */}
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: i % 3 === 0 ? '#1976d2' : i % 3 === 1 ? '#9c27b0' : '#2e7d32',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.6,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.5)' },
                },
              }}
            />
          ))}

          <Fade in={isVisible} timeout={1000}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <AutoAwesome sx={{ fontSize: 48, color: '#1976d2', mr: 2, animation: 'sparkle 2s ease-in-out infinite' }} />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '3rem', md: '5rem', lg: '6.5rem' },
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 50%, #2e7d32 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #1976d2, #9c27b0, #2e7d32)',
                      borderRadius: 2,
                      opacity: 0.6,
                    },
                    '@keyframes sparkle': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.7, transform: 'scale(1.1)' },
                    },
                  }}
                >
                  SVES-DAQ
                </Typography>
                <AutoAwesome sx={{ fontSize: 48, color: '#9c27b0', ml: 2, animation: 'sparkle 2s ease-in-out infinite 0.5s' }} />
              </Box>
              
              <Slide direction="down" in={isVisible} timeout={1200}>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2.25rem' },
                    fontWeight: 300,
                    color: 'rgba(255, 255, 255, 0.95)',
                    mb: 1,
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  Scientific Vehicle Validation & Intelligence Dashboard
                </Typography>
              </Slide>
              
              <Fade in={isVisible} timeout={1500}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.35rem' },
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.75)',
                    maxWidth: '900px',
                    mb: 6,
                    lineHeight: 1.8,
                    px: 2,
                  }}
                >
                  A corporate-grade platform that unifies multi-physics test data across safety, durability, NVH, ride, power, and environmental domains into a single decision platform.
                </Typography>
              </Fade>
            </Box>
          </Fade>

          <Fade in={isVisible} timeout={1800}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 8, mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<Dashboard />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  boxShadow: '0 8px 32px rgba(25, 118, 210, 0.5)',
                  borderRadius: 3,
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                    boxShadow: '0 12px 48px rgba(25, 118, 210, 0.7)',
                    transform: 'translateY(-3px) scale(1.02)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Enter Dashboard
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<Assessment />}
                onClick={() => navigate('/kpis')}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 3,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': {
                    borderColor: 'rgba(156, 39, 176, 0.9)',
                    background: 'rgba(156, 39, 176, 0.15)',
                    color: 'rgba(255, 255, 255, 1)',
                    transform: 'translateY(-3px) scale(1.02)',
                    boxShadow: '0 12px 48px rgba(156, 39, 176, 0.4)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                View KPIs
              </Button>
            </Box>
          </Fade>
        </Box>

        {/* Dashboard Preview Section */}
        <Box
          sx={{
            py: 12,
            mb: 8,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${landingBg4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
              filter: 'blur(20px)',
              transform: `scale(${1 + scrollY * 0.0001})`,
            },
          }}
        >
          <Fade in={isVisible} timeout={2000}>
            <Container>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 800,
                  mb: 1,
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Interactive Dashboard Preview
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 6,
                  fontWeight: 300,
                }}
              >
                Real-time data visualization and analytics
              </Typography>

              <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={6}>
                  <Zoom in={isVisible} timeout={2500}>
                    <Card
                      sx={{
                        background: 'rgba(26, 31, 58, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(25, 118, 210, 0.3)',
                        borderRadius: 3,
                        p: 3,
                        height: 300,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 20px 60px rgba(25, 118, 210, 0.4)',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                        Performance Trends
                      </Typography>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="value" stroke="#1976d2" fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Card>
                  </Zoom>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Zoom in={isVisible} timeout={2800}>
                    <Card
                      sx={{
                        background: 'rgba(26, 31, 58, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(156, 39, 176, 0.3)',
                        borderRadius: 3,
                        p: 3,
                        height: 300,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 20px 60px rgba(156, 39, 176, 0.4)',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                        Domain Distribution
                      </Typography>
                      <ResponsiveContainer width="100%" height={200}>
                        <RePieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1500}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </RePieChart>
                      </ResponsiveContainer>
                    </Card>
                  </Zoom>
                </Grid>
                <Grid item xs={12}>
                  <Zoom in={isVisible} timeout={3000}>
                    <Card
                      sx={{
                        background: 'rgba(26, 31, 58, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(46, 125, 50, 0.3)',
                        borderRadius: 3,
                        p: 3,
                        height: 300,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 20px 60px rgba(46, 125, 50, 0.4)',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
                        KPI Overview
                      </Typography>
                      <ResponsiveContainer width="100%" height={200}>
                        <ReBarChart data={chartData}>
                          <Bar dataKey="kpi" fill="#2e7d32" radius={[8, 8, 0, 0]} animationDuration={1500} />
                        </ReBarChart>
                      </ResponsiveContainer>
                    </Card>
                  </Zoom>
                </Grid>
              </Grid>
            </Container>
          </Fade>
        </Box>

        {/* Stats Section */}
        <Fade in={isVisible} timeout={2000}>
          <Box
            sx={{
              py: 6,
              mb: 8,
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${landingBg2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.05,
                filter: 'blur(30px)',
              },
            }}
          >
            <Grid container spacing={4}>
              {[
                { number: '6', label: 'Multi-Physics Domains', icon: <PrecisionManufacturing /> },
                { number: '17+', label: 'Plugin Modules', icon: <Extension /> },
                { number: '28+', label: 'KPIs Tracked', icon: <ShowChart /> },
                { number: '9', label: 'ML Predictions', icon: <Psychology /> },
              ].map((stat, idx) => (
                <Grid item xs={6} md={3} key={idx}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        color: idx % 2 === 0 ? '#1976d2' : '#9c27b0',
                        mb: 1,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        background: idx % 2 === 0
                          ? 'linear-gradient(135deg, #1976d2, #42a5f5)'
                          : 'linear-gradient(135deg, #9c27b0, #ba68c8)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 0.5,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Features Section */}
        <Box
          ref={featuresRef}
          sx={{
            py: 12,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${landingBg3})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
              filter: 'blur(40px)',
              transform: `translateY(${scrollY * 0.1}px)`,
            },
          }}
        >
          <Fade in={isVisible} timeout={2200}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontWeight: 800,
                  mb: 1,
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Platform Capabilities
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 8,
                  fontWeight: 300,
                }}
              >
                Enterprise-grade features for vehicle validation and intelligence
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
            {features.map((feature, idx) => (
              <Grid item xs={12} md={6} lg={4} key={idx}>
                <Zoom
                  in={isVisible}
                  timeout={1000 + idx * 200}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(26, 31, 58, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${feature.color}30`,
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: 0,
                        height: 0,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${feature.color}20, transparent)`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'width 0.6s, height 0.6s',
                      },
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02) rotateY(5deg)',
                        boxShadow: `0 20px 60px ${feature.color}50`,
                        borderColor: `${feature.color}80`,
                        '&::before': {
                          opacity: 1,
                        },
                        '&::after': {
                          width: '200%',
                          height: '200%',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                      <Box
                        sx={{
                          color: feature.color,
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          animation: `iconFloat ${3 + idx}s ease-in-out infinite`,
                          '@keyframes iconFloat': {
                            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                            '50%': { transform: 'translateY(-10px) rotate(5deg)' },
                          },
                          '&:hover': {
                            transform: 'scale(1.2) rotate(360deg)',
                            filter: `drop-shadow(0 0 20px ${feature.color})`,
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: 'rgba(255, 255, 255, 0.95)',
                          textAlign: 'center',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.75)',
                          textAlign: 'center',
                          lineHeight: 1.8,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Domain Coverage */}
        <Fade in={isVisible} timeout={2500}>
          <Box
            sx={{
              py: 10,
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
              borderRadius: 4,
              mb: 8,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${landingBg4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.08,
                filter: 'blur(30px)',
                transform: `scale(${1 + scrollY * 0.00005}) rotate(${scrollY * 0.01}deg)`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(156, 39, 176, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'pulse 4s ease-in-out infinite',
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 1,
                background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Multi-Physics Domain Coverage
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 6,
                fontWeight: 300,
              }}
            >
              Comprehensive analysis across all vehicle validation domains
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: '1000px', mx: 'auto' }}>
              {domains.map((domain, idx) => (
                <Grid item xs={6} sm={4} md={4} key={idx}>
                  <Zoom in={isVisible} timeout={1500 + idx * 150}>
                    <Card
                      sx={{
                        background: 'rgba(26, 31, 58, 0.9)',
                        border: `2px solid ${domain.color}40`,
                        borderRadius: 3,
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(15px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${domain.color}15, transparent)`,
                          opacity: 0,
                          transition: 'opacity 0.4s',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 0,
                          height: 0,
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${domain.color}30, transparent)`,
                          transform: 'translate(-50%, -50%)',
                          transition: 'all 0.6s',
                        },
                        '&:hover': {
                          transform: 'scale(1.1) translateY(-8px) rotateY(5deg)',
                          borderColor: `${domain.color}90`,
                          boxShadow: `0 20px 60px ${domain.color}50`,
                          '&::before': {
                            opacity: 1,
                          },
                          '&::after': {
                            width: '300%',
                            height: '300%',
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                        <Box
                          sx={{
                            color: domain.color,
                            mb: 2,
                            transition: 'all 0.5s',
                            display: 'inline-block',
                            animation: `iconPulse ${2 + idx * 0.5}s ease-in-out infinite`,
                            '@keyframes iconPulse': {
                              '0%, 100%': { transform: 'scale(1)' },
                              '50%': { transform: 'scale(1.1)' },
                            },
                            '&:hover': {
                              transform: 'scale(1.3) rotate(360deg)',
                              filter: `drop-shadow(0 0 15px ${domain.color})`,
                            },
                          }}
                        >
                          {domain.icon}
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                          }}
                        >
                          {domain.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Benefits Section */}
        <Fade in={isVisible} timeout={2800}>
          <Box sx={{ py: 10 }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontWeight: 800,
                mb: 1,
                background: 'linear-gradient(135deg, #2e7d32 0%, #1976d2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Key Benefits
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 8,
                fontWeight: 300,
              }}
            >
              Transform test data into actionable insights
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: '900px', mx: 'auto' }}>
              {benefits.map((benefit, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Slide direction="left" in={isVisible} timeout={2000 + idx * 200}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        gap: 2.5,
                        p: 3,
                        background: 'rgba(26, 31, 58, 0.6)',
                        borderRadius: 3,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        backdropFilter: 'blur(10px)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          background: 'linear-gradient(180deg, #2e7d32, #1976d2)',
                          transform: 'scaleY(0)',
                          transition: 'transform 0.3s',
                        },
                        '&:hover': {
                          background: 'rgba(26, 31, 58, 0.8)',
                          borderColor: 'rgba(46, 125, 50, 0.6)',
                          transform: 'translateX(12px) scale(1.02)',
                          boxShadow: '0 8px 32px rgba(46, 125, 50, 0.2)',
                          '&::before': {
                            transform: 'scaleY(1)',
                          },
                        },
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: '#2e7d32',
                          mt: 0.5,
                          flexShrink: 0,
                          fontSize: 28,
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.2) rotate(360deg)',
                          },
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontWeight: 500,
                          lineHeight: 1.8,
                          fontSize: '1.05rem',
                        }}
                      >
                        {benefit}
                      </Typography>
                    </Box>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* CTA Section */}
        <Fade in={isVisible} timeout={3000}>
          <Box
            sx={{
              py: 10,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.15) 0%, rgba(156, 39, 176, 0.15) 100%)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              mb: 8,
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -100,
                left: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'pulse 4s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                  '50%': { opacity: 0.8, transform: 'scale(1.2)' },
                },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(156, 39, 176, 0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'pulse 4s ease-in-out infinite 2s',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 50%, #2e7d32 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Ready to Transform Your Vehicle Validation Process?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 6,
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                Start making data-driven decisions with SVES-DAQ today
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  px: 8,
                  py: 2.5,
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
                  boxShadow: '0 12px 48px rgba(25, 118, 210, 0.5)',
                  borderRadius: 4,
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.6s',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1565c0 0%, #7b1fa2 100%)',
                    boxShadow: '0 16px 64px rgba(25, 118, 210, 0.7)',
                    transform: 'translateY(-4px) scale(1.05)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}
