import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import {
  ExpandMore,
  Dashboard,
  Assessment,
  Engineering,
  LocalFireDepartment,
  VolumeUp,
  DirectionsCar,
  Bolt,
  AcUnit,
  Psychology,
  Science,
  Gavel,
  Analytics,
  Extension,
  Settings,
  Help as HelpIcon,
  CheckCircle,
  Warning,
  Info,
  PlayArrow,
  Upload,
  FileDownload,
} from '@mui/icons-material'
import GlobalFilters from '../components/GlobalFilters'
import dashboardBg from '@/assets/images/3.jpg'

export default function Help() {
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HelpIcon sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Product Manual & Help Guide
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive guide to using the Scientific Vehicle Validation & Intelligence Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><Info color="primary" /></ListItemIcon>
            <ListItemText primary="1. Introduction & Overview" />
          </ListItem>
          <ListItem>
            <ListItemIcon><PlayArrow color="primary" /></ListItemIcon>
            <ListItemText primary="2. Getting Started" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
            <ListItemText primary="3. Executive Dashboard" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Assessment color="primary" /></ListItemIcon>
            <ListItemText primary="4. KPIs & Metrics" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Engineering color="primary" /></ListItemIcon>
            <ListItemText primary="5. Domain Analysis Pages" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Psychology color="primary" /></ListItemIcon>
            <ListItemText primary="6. ML Predictions & AI" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Science color="primary" /></ListItemIcon>
            <ListItemText primary="7. Test Data Management" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Gavel color="primary" /></ListItemIcon>
            <ListItemText primary="8. Compliance Tracking" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Analytics color="primary" /></ListItemIcon>
            <ListItemText primary="9. Analytics & Reporting" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Extension color="primary" /></ListItemIcon>
            <ListItemText primary="10. Plugins & Extensions" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Settings color="primary" /></ListItemIcon>
            <ListItemText primary="11. Settings & Configuration" />
          </ListItem>
          <ListItem>
            <ListItemIcon><Warning color="warning" /></ListItemIcon>
            <ListItemText primary="12. Troubleshooting & FAQ" />
          </ListItem>
        </List>
      </Paper>

      {/* Section 1: Introduction */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Info color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              1. Introduction & Overview
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The <strong>Scientific Vehicle Validation & Intelligence Dashboard (SVES-DAQ)</strong> is a comprehensive 
            platform designed for vehicle validation engineers, test engineers, and program managers to monitor, 
            analyze, and optimize vehicle performance across multiple engineering domains.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Engineering Context & Purpose
          </Typography>
          <Typography variant="body2" paragraph>
            In modern automotive development, vehicle validation is a critical phase that bridges design engineering 
            and production release. This dashboard addresses the complex challenge of managing multi-physics test 
            data across diverse engineering domains simultaneously. Traditional validation workflows involve separate 
            analysis tools for each domain (structural analysis, brake testing, NVH, etc.), leading to data silos 
            and delayed decision-making.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>From an automotive engineering perspective:</strong> This platform enables integrated validation 
            by providing a unified view of vehicle performance metrics. It supports the concurrent engineering 
            approach required in modern vehicle development, where chassis durability, brake performance, NVH 
            characteristics, ride comfort, powertrain efficiency, and environmental robustness must be validated 
            simultaneously to meet aggressive development timelines.
          </Typography>
          <Typography variant="body2" paragraph>
            The dashboard implements a hierarchical KPI structure (Executive → Subsystem → Diagnostic) that 
            mirrors the organizational structure of automotive validation teams. Executive-level metrics enable 
            program managers to assess overall vehicle readiness, while subsystem KPIs allow domain engineers to 
            identify specific performance issues, and diagnostic metrics provide test engineers with detailed 
            signal-level insights for root cause analysis.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Key Features
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Real-Time Monitoring
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Live dashboard with real-time data from Firebase, displaying KPIs, metrics, and performance trends
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Multi-Domain Analysis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Comprehensive analysis across 6 engineering domains: Chassis, Brake, NVH, Ride, Powertrain, and Environment
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    AI-Powered Predictions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Machine learning models for remaining life estimation, failure risk assessment, and design optimization
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    <CheckCircle color="success" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Compliance Tracking
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Automated compliance monitoring for regulatory standards (FMVSS, ECE, ISO) with real-time status updates
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            System Architecture
          </Typography>
          <Typography variant="body2" paragraph>
            The dashboard consists of:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Frontend (React + TypeScript)"
                secondary="Modern web interface built with Material-UI, Recharts, and React Router"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Backend (Express + TypeScript)"
                secondary="RESTful API server providing data endpoints and ML prediction services"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Database (Firebase Firestore)"
                secondary="Cloud-based NoSQL database storing test data, KPIs, compliance records, and ML predictions"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 2: Getting Started */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PlayArrow color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              2. Getting Started
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            First Steps
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Navigate to Executive Dashboard"
                secondary="Start by viewing the Executive Dashboard to get an overview of your vehicle validation programs"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Review KPIs & Metrics"
                secondary="Check the KPIs & Metrics page to understand the hierarchical structure: Executive → Subsystem → Diagnostic"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Upload Test Data"
                secondary="Use the Test Data page to upload new test records. Each upload automatically creates compliance records"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Explore Domain Analysis"
                secondary="Navigate to Domain Analysis → Chassis & Durability to see detailed domain-specific metrics and events"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Navigation Structure
          </Typography>
          <Typography variant="body2" paragraph>
            The left sidebar provides access to all major sections:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Executive Dashboard"
                secondary="Platform-level overview with quick actions"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="KPIs & Metrics"
                secondary="Hierarchical KPI dashboard"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Domain Analysis (Expandable)"
                secondary="Six domain-specific analysis pages"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="System Tools"
                secondary="Plugins, ML Predictions, Test Data, Compliance, Analytics, Settings"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 3: Executive Dashboard */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Dashboard color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              3. Executive Dashboard
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Executive Dashboard provides a high-level overview of your vehicle validation programs, 
            displaying key metrics, executive KPIs, and performance trends.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Engineering Purpose & Context
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>From an automotive validation engineering perspective:</strong> The Executive Dashboard serves as 
            the primary decision-making interface for program managers and validation directors. In modern vehicle 
            development, validation programs typically span 18-36 months and involve thousands of individual tests 
            across multiple vehicle variants, powertrain configurations, and market regions. This dashboard aggregates 
            this complex test data into actionable insights that enable go/no-go decisions for production release.
          </Typography>
          <Typography variant="body2" paragraph>
            The metrics displayed are specifically designed to answer critical questions: <em>"Is the vehicle ready 
            for production?"</em>, <em>"What are the highest-risk areas requiring attention?"</em>, and 
            <em>"How does current performance compare to program targets?"</em> These questions must be answered 
            quickly and accurately, as delays in validation can cost millions in delayed market entry.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Key Metrics Cards - Detailed Engineering Explanation
          </Typography>
          
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Total Tests
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> The cumulative count of all test records executed across 
                all validation domains (Chassis, Brake, NVH, Ride, Powertrain, Environment) and all vehicle programs.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Why It Matters:</strong> In automotive validation, test volume directly correlates with 
                validation completeness and confidence. A typical passenger vehicle program requires 1,000-2,000 
                individual tests covering:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Durability Tests"
                    secondary="Fatigue tests (typically 100-200 hours), corrosion tests, thermal cycling"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Safety Tests"
                    secondary="Crash tests (frontal, side, rear, rollover), brake performance, ABS validation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="NVH Tests"
                    secondary="Road noise, wind noise, powertrain NVH, squeal and rattle detection"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Performance Tests"
                    secondary="Acceleration, braking, handling, fuel economy, emissions"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Interpretation:</strong> A low test count may indicate incomplete validation or delayed 
                test execution. A high count suggests thorough validation but may also indicate excessive 
                re-testing due to failures. Industry benchmarks: 1,200-1,500 tests for a typical passenger car.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Active Projects
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> The number of concurrent vehicle validation programs 
                currently in execution. A "project" typically represents a single vehicle platform, variant, 
                or powertrain configuration under validation.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Why It Matters:</strong> Modern automotive OEMs typically validate multiple vehicle 
                programs simultaneously to maximize test facility utilization and meet aggressive launch schedules. 
                Each project requires dedicated resources (test vehicles, test engineers, data analysts) and 
                has its own timeline and deliverables.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Resource Management:</strong> This metric helps validation managers understand resource 
                allocation. Each active project typically requires:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="2-5 Test Vehicles" secondary="Dedicated vehicles for different test types" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3-8 Test Engineers" secondary="Domain specialists (chassis, brake, NVH, etc.)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Test Facility Time" secondary="Proving grounds, labs, crash facilities" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Budget Allocation" secondary="Typically $5-15M per program depending on complexity" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Interpretation:</strong> Too many active projects may indicate resource over-allocation 
                and potential quality risks. Too few may indicate underutilization of test capacity. Optimal 
                range: 15-30 projects depending on OEM size.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Compliance Rate
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> The percentage of test records that meet all applicable 
                regulatory compliance standards (FMVSS, ECE, ISO, etc.). Calculated as: 
                (Compliant Tests / Total Tests) × 100%.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Why It Matters:</strong> Regulatory compliance is non-negotiable in automotive validation. 
                A single non-compliant test can block vehicle homologation and prevent market entry. This metric 
                provides early warning of compliance issues that could delay program milestones.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Regulatory Standards Covered:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="FMVSS (Federal Motor Vehicle Safety Standards)"
                    secondary="US regulations: FMVSS 135 (brakes), FMVSS 208 (occupant protection), FMVSS 301 (fuel system integrity)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="ECE Regulations"
                    secondary="European standards: ECE R13 (brakes), ECE R29 (cab strength), ECE R51 (noise)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="ISO Standards"
                    secondary="ISO 26262 (functional safety), ISO 2631 (vibration), ISO 14001 (environmental)"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Interpretation:</strong> Target compliance rate is ≥95%. Below 90% indicates significant 
                compliance issues requiring immediate attention. Below 85% may indicate fundamental design issues 
                requiring engineering changes.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Average Performance
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> A weighted average performance score across all validation 
                domains, normalized to a 0-100 scale. This metric aggregates performance from chassis durability, 
                brake performance, NVH characteristics, ride comfort, powertrain efficiency, and environmental 
                robustness.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Calculation Methodology:</strong> Each domain contributes to the average based on its 
                criticality and test volume. The formula typically weights safety-critical domains (brake, chassis) 
                more heavily than comfort domains (ride, NVH).
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Why It Matters:</strong> This single metric provides a quick assessment of overall vehicle 
                validation health. It enables program managers to compare performance across different vehicle 
                programs and identify programs requiring additional resources or engineering support.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Interpretation:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="≥90%"
                    secondary="Excellent performance, vehicle likely ready for production release"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="85-90%"
                    secondary="Good performance, minor issues may require resolution before release"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="80-85%"
                    secondary="Acceptable but requires attention, some engineering changes may be needed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="<80%"
                    secondary="Poor performance, significant engineering changes required, production release at risk"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Executive KPIs - Detailed Engineering Analysis
          </Typography>
          <Typography variant="body2" paragraph>
            Four critical executive-level KPIs are displayed. These metrics are specifically designed to provide 
            program managers with actionable insights into vehicle readiness for production release.
          </Typography>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Safety Compliance Index
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> A composite metric representing the percentage of safety-related 
                tests that meet all applicable regulatory requirements. This includes crash tests (FMVSS 208, ECE R94/R95), 
                brake performance (FMVSS 135, ECE R13), occupant protection, and active safety systems.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Technical Calculation:</strong> The index is calculated by aggregating pass/fail results from:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Crash Tests"
                    secondary="Frontal impact (56 km/h), side impact (50 km/h), rear impact, rollover protection"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Brake Performance"
                    secondary="Stopping distance, fade resistance, ABS functionality, parking brake hold"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Occupant Protection"
                    secondary="Airbag deployment, seatbelt effectiveness, head restraint performance"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Active Safety"
                    secondary="ESC (Electronic Stability Control), AEB (Autonomous Emergency Braking), lane keeping"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Engineering Significance:</strong> Safety compliance is the highest priority in vehicle validation. 
                A single failure can prevent vehicle homologation and market entry. This metric provides early warning of 
                safety issues that require immediate engineering attention.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Target & Interpretation:</strong> Target is ≥95%. Below 90% indicates critical safety issues 
                requiring immediate design changes. Below 85% may indicate fundamental safety design flaws that could 
                delay program by 6-12 months.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Durability Margin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> The percentage of remaining fatigue life in critical structural 
                components after completion of validation testing. This metric is derived from Miner's rule cumulative 
                damage analysis and represents the safety margin before component failure.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Technical Background:</strong> In automotive durability validation, components are subjected to 
                accelerated fatigue testing that simulates years of real-world usage. The durability margin indicates how 
                much additional life remains after the validation test cycle is complete.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Calculation Method:</strong>
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'background.paper', p: 1, borderRadius: 1, mb: 2 }}>
                Durability Margin = (1 - Miner Damage Accumulated) × 100%
              </Typography>
              <Typography variant="body2" paragraph>
                Where Miner Damage is calculated using:
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'background.paper', p: 1, borderRadius: 1, mb: 2 }}>
                D = Σ(ni / Ni)
              </Typography>
              <Typography variant="body2" paragraph>
                Where: ni = actual cycles at stress level i, Ni = cycles to failure at stress level i
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Critical Components Monitored:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Chassis & Frame" secondary="Main structural members, crossmembers, suspension mounting points" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Suspension Components" secondary="Control arms, springs, shock absorbers, bushings" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Body Structure" secondary="A-pillars, B-pillars, roof structure, floor pan" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Powertrain Mounts" secondary="Engine mounts, transmission mounts, driveline components" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Engineering Significance:</strong> A low durability margin indicates that components are operating 
                near their fatigue limits. This increases warranty risk and may require design changes (material upgrades, 
                geometry optimization, or increased section thickness) before production release.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Target & Interpretation:</strong> Target is ≥80%. Below 70% indicates high warranty risk and 
                likely requires design changes. Below 60% indicates critical durability issues that will likely result in 
                field failures.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                NVH Compliance Score
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> A composite score representing compliance with noise, vibration, 
                and harshness (NVH) requirements. This includes pass/fail results from road noise tests, powertrain NVH, 
                wind noise, squeal and rattle detection, and regulatory noise limits (ECE R51, ISO 362).
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Technical Components:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Exterior Noise"
                    secondary="Pass-by noise (ECE R51: ≤74 dBA for passenger cars), stationary noise"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Interior Noise"
                    secondary="Road noise (target: 65-70 dBA at 100 km/h), wind noise, powertrain noise"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Vibration"
                    secondary="Steering wheel vibration, seat vibration, floor vibration (ISO 2631 weighted RMS)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Harshness"
                    secondary="Impact harshness, road surface harshness, powertrain harshness"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Squeal & Rattle"
                    secondary="Brake squeal, interior trim rattle, suspension rattle"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Measurement Methodology:</strong> NVH testing involves:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Acoustic Testing" secondary="Microphones at multiple interior locations, exterior pass-by microphones" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Vibration Testing" secondary="Accelerometers on steering wheel, seats, floor, suspension components" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="FFT Analysis" secondary="Frequency domain analysis to identify noise sources and vibration modes" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Order Tracking" secondary="Engine order analysis to identify powertrain-related NVH issues" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Engineering Significance:</strong> NVH is a key differentiator in vehicle quality perception. 
                Poor NVH can lead to customer complaints, warranty claims, and negative brand perception. This metric 
                helps identify NVH issues early when they can be addressed through design changes (damping, isolation, 
                acoustic treatments).
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Target & Interpretation:</strong> Target is ≥90%. Below 85% indicates noticeable NVH issues 
                that may require countermeasures. Below 80% indicates significant NVH problems that could impact customer 
                satisfaction and brand perception.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Warranty Risk Index
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Engineering Definition:</strong> A predictive metric estimating the probability of warranty 
                claims based on validation test results, failure modes, and historical warranty data. This index 
                combines durability margins, failure rates, performance variability, and design robustness.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Calculation Factors:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Durability Margin"
                    secondary="Low durability margins increase warranty risk (fatigue failures, wear failures)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Failure Rate"
                    secondary="Frequency of failures during validation testing (higher failure rate = higher warranty risk)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Performance Variability"
                    secondary="High variability in test results indicates inconsistent quality and higher warranty risk"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Design Robustness"
                    secondary="Components operating near design limits have higher warranty risk"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Environmental Robustness"
                    secondary="Performance degradation in extreme conditions (hot, cold, humidity) increases warranty risk"
                  />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Common Warranty Failure Modes:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Fatigue Failures" secondary="Cracked components, broken springs, failed bushings" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Wear Failures" secondary="Brake pad wear, tire wear, bearing wear" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Electrical Failures" secondary="Sensor failures, ECU issues, wiring harness problems" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Seal Failures" secondary="Oil leaks, water leaks, air leaks" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="NVH Issues" secondary="Squeal, rattle, excessive noise" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph>
                <strong>Engineering Significance:</strong> Warranty costs directly impact profitability. A typical 
                passenger vehicle program budgets 2-4% of vehicle cost for warranty. This metric helps identify high-risk 
                areas before production release, enabling preventive design changes that reduce warranty costs.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Target & Interpretation:</strong> Target is ≤15%. Above 20% indicates high warranty risk 
                requiring design changes. Above 30% indicates critical warranty risk that could result in significant 
                financial losses and brand damage.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Financial Impact:</strong> For a vehicle program producing 100,000 units/year at $30,000 
                average price, a 1% increase in warranty risk can cost $3M annually. This metric helps justify 
                engineering changes that reduce warranty risk.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Performance Trends Chart
          </Typography>
          <Typography variant="body2" paragraph>
            A line chart displays performance trends over time, helping you identify patterns and anomalies 
            in validation performance.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><Upload color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Upload new test data"
                secondary="Navigate to Test Data page to upload new test records"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Psychology color="secondary" /></ListItemIcon>
              <ListItemText 
                primary="Run predictive analysis"
                secondary="Navigate to ML Predictions page to run AI-powered predictions"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Gavel color="success" /></ListItemIcon>
              <ListItemText 
                primary="Generate compliance report"
                secondary="Navigate to Compliance page to view compliance status"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><FileDownload color="info" /></ListItemIcon>
              <ListItemText 
                primary="Export KPI dashboard"
                secondary="Download executive KPIs as JSON file for reporting"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 4: KPIs & Metrics */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Assessment color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              4. KPIs & Metrics Dashboard
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The KPIs & Metrics page provides a hierarchical view of Key Performance Indicators across three levels: 
            Executive/Program, Subsystem Engineering, and Raw/Diagnostic.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Tab Structure
          </Typography>
          
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Executive / Program KPIs
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                High-level KPIs that executives and program managers use to track overall program health:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Safety Compliance Index" secondary="Overall safety performance (Target: ≥95%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Durability Margin" secondary="Remaining structural life percentage (Target: ≥80%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="NVH Compliance Score" secondary="Noise and vibration compliance (Target: ≥90%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ride Comfort Index" secondary="Passenger comfort metrics (Target: ≥85%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Energy Efficiency Index" secondary="Powertrain efficiency (Target: ≥85%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Environmental Robustness" secondary="Environmental performance (Target: ≥88%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Warranty Risk Index" secondary="Risk of warranty claims (Target: ≤15%)" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Subsystem Engineering KPIs
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Domain-specific KPIs for engineering teams:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Peak Strain Utilization" secondary="Suspension strain usage percentage" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fatigue Damage / 100km" secondary="Miner damage accumulation rate" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Stopping Distance" secondary="Brake performance metric (Target: ≤45m)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="SPL Max" secondary="Sound Pressure Level maximum (Target: <90 dBA)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Weighted RMS Acceleration" secondary="ISO 2631 comfort metric (Target: <0.8 m/s²)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Average Efficiency" secondary="Electrical/powertrain efficiency (Target: ≥85%)" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Raw / Diagnostic KPIs
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Low-level diagnostic metrics for detailed analysis:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Peak Strain" secondary="Maximum measured strain (με)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Force Spectrum Peak" secondary="Peak force in frequency domain (kN)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="FFT Magnitude" secondary="Fast Fourier Transform magnitude (g)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Order Amplitude" secondary="Order tracking amplitude (g)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Shock Velocity" secondary="Shock absorber velocity (m/s)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Clamp Load Trend" secondary="Fastener clamp load change rate (%/hr)" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            KPI Card Features
          </Typography>
          <Typography variant="body2" paragraph>
            Each KPI card displays:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Current Value" secondary="Real-time or latest measured value" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Unit" secondary="Measurement unit (%, hours, m, dBA, etc.)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Target Value" secondary="Target threshold (if applicable)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status Indicator" secondary="Color-coded: Green (good), Yellow (warning), Red (critical)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Trend Indicator" secondary="Percentage change from previous period" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Level Badge" secondary="Executive, Subsystem, or Diagnostic level indicator" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 5: Domain Analysis */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Engineering color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              5. Domain Analysis Pages
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Six domain-specific analysis pages provide detailed insights into vehicle validation across different 
            engineering disciplines. Each page displays domain-specific KPIs, test events, sensor streams, and 
            performance charts.
          </Typography>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Engineering color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Chassis & Durability
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Analyze structural integrity, fatigue life, and durability performance.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Peak Strain Utilization" secondary="Percentage of maximum allowable strain" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fatigue Damage" secondary="Miner damage accumulation per 100km" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Remaining Life" secondary="Estimated hours until failure" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Features:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Strain Distribution Histogram" secondary="Visualizes strain distribution across test cycles" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Fatigue Events Timeline" secondary="Chronological list of fatigue-related events" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Sensor Streams" secondary="Real-time data from strain gauges and load cells" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalFireDepartment color="error" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Brake & Safety
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Monitor braking performance, fade characteristics, and regulatory compliance.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Stopping Distance" secondary="Distance to stop from specified speed (Target: ≤45m)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Brake Fade Risk" secondary="Probability of brake fade occurrence" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="ABS Performance" secondary="Anti-lock braking system effectiveness" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Compliance Standards:</strong> FMVSS 135, ECE R13, ISO 26262
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VolumeUp color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  NVH & Acoustics
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Analyze noise, vibration, and harshness characteristics.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="SPL Max" secondary="Maximum Sound Pressure Level (Target: <90 dBA)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Dominant Frequency" secondary="Primary frequency component (Hz)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Order Amplitude" secondary="Order tracking amplitude (g)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Squeal Occurrences" secondary="Number of brake squeal events" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Analysis Tools:</strong> FFT analysis, order tracking, frequency domain visualization
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsCar color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Ride & Comfort
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Evaluate passenger comfort and ride quality.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="ISO 2631 Weighted RMS" secondary="Weighted vibration acceleration (Target: <0.8 m/s²)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Crest Factor" secondary="Peak-to-RMS ratio" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Seat Acceleration (Z, X, Y)" secondary="Multi-axis acceleration at seat" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Exposure Hours" secondary="Duration of exposure to vibration" />
                </ListItem>
              </List>
              <Typography variant="body2" paragraph sx={{ mt: 2 }}>
                <strong>Standards:</strong> ISO 2631 (Human exposure to whole-body vibration)
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Bolt color="warning" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Powertrain
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Monitor electrical and powertrain performance.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Average Efficiency" secondary="Overall powertrain efficiency (Target: ≥85%)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="AC/DC Power Analysis" secondary="Power conversion efficiency" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Harmonic Distortion" secondary="Total Harmonic Distortion (THD)" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AcUnit color="info" />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Environment
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Purpose:</strong> Analyze thermal performance and environmental robustness.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Key Metrics:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Temperature Profiles" secondary="Temperature distribution over time" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Cold Start Behavior" secondary="Performance during cold start conditions" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Performance Derating" secondary="Performance reduction due to temperature" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Common Features Across All Domain Pages
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Domain-Specific KPIs"
                secondary="Relevant KPIs displayed as cards with status indicators"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Performance Charts"
                secondary="Histograms, line charts, and distribution plots"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Test Events Timeline"
                secondary="Chronological list of domain-specific events"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Sensor Streams"
                secondary="Real-time or historical sensor data streams"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Loading States"
                secondary="Visual feedback while data is being fetched"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Empty States"
                secondary="Helpful messages when no data is available"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 6: ML Predictions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Psychology color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              6. ML Predictions & AI
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The ML Predictions page enables you to run AI-powered predictions for various vehicle validation scenarios. 
            The system uses heuristic-based models (with ML-ready architecture) to predict outcomes based on input features.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Available Prediction Types
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Remaining Fatigue Life"
                secondary="Predict remaining operational hours before fatigue failure (Unit: hours)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Failure Risk Score"
                secondary="Probability of component failure (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Brake Fade Onset"
                secondary="Distance until brake fade occurs (Unit: km)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Brake Squeal Likelihood"
                secondary="Probability of brake squeal occurrence (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Fastener Loosening Risk"
                secondary="Risk of fastener loosening (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Shock Bottom-out Probability"
                secondary="Probability of shock absorber bottoming out (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Ride Discomfort Probability"
                secondary="Likelihood of passenger discomfort (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="NVH Compliance Failure Risk"
                secondary="Risk of failing NVH compliance standards (Unit: %)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Warranty Claim Likelihood"
                secondary="Probability of warranty claim (Unit: %)"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            How to Run a Prediction
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Step 1: Select Prediction Type"
                secondary="Choose a prediction type from the dropdown menu"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Step 2: Review Sample Data"
                secondary="Sample JSON data is automatically populated based on the selected prediction type"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Step 3: Modify Input (Optional)"
                secondary="Edit the JSON input to match your specific test conditions"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Step 4: Run Prediction"
                secondary="Click 'Run Prediction' button. Results appear below with confidence score"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Prediction Situations
          </Typography>
          <Typography variant="body2" paragraph>
            Pre-configured prediction scenarios for common use cases. Click any situation card to automatically 
            configure and run a prediction:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Before endurance completion" secondary="Predict remaining life before test completion" />
            </ListItem>
            <ListItem>
              <ListItemText primary="After severe event clusters" secondary="Assess failure risk after extreme events" />
            </ListItem>
            <ListItem>
              <ListItemText primary="During design change simulation" secondary="Evaluate warranty claim risk for design changes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Across environment transitions" secondary="Predict NVH compliance across temperature changes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Between vehicle variants" secondary="Compare ride comfort across variants" />
            </ListItem>
            <ListItem>
              <ListItemText primary="For new terrain profiles" secondary="Predict bottom-out probability for new terrains" />
            </ListItem>
            <ListItem>
              <ListItemText primary="For cost-reduction proposals" secondary="Assess fastener loosening risk for cost reductions" />
            </ListItem>
            <ListItem>
              <ListItemText primary="For homologation readiness" secondary="Evaluate brake fade for regulatory approval" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Understanding Results
          </Typography>
          <Typography variant="body2" paragraph>
            Prediction results include:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Predicted Value"
                secondary="The main prediction output with appropriate units"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Confidence Score"
                secondary="Model confidence percentage (typically 80-95%)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Status Indicator"
                secondary="Color-coded: Green (good), Yellow (warning), Red (critical)"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Timestamp"
                secondary="When the prediction was generated"
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 7: Test Data */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Science color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              7. Test Data Management
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Test Data page allows you to view all test records and upload new test data. Each test record 
            is automatically linked to compliance tracking.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Viewing Test Records
          </Typography>
          <Typography variant="body2" paragraph>
            The test records table displays:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Test Name" secondary="Descriptive name of the test" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Domain" secondary="Engineering domain (Safety, Durability, NVH, etc.)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Timestamp" secondary="When the test was performed" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" secondary="Completed, In-Progress, or Failed" />
            </ListItem>
            <ListItem>
              <ListItemText primary="KPI Score" secondary="Key performance indicator value" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Uploading Test Data
          </Typography>
          <Typography variant="body2" paragraph>
            Click the <strong>"Upload Test Data"</strong> button to simulate uploading test records. The system will:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Upload 10 Predefined Test Types"
                secondary="Simulates uploading various test types across different domains"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Show Progress Bar"
                secondary="Visual feedback during upload process"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Create Compliance Records"
                secondary="Automatically generates corresponding compliance records"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText 
                primary="Display Success Notification"
                secondary="Snackbar notification confirms successful upload"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Test Types Included
          </Typography>
          <Typography variant="body2" paragraph>
            The upload simulation includes tests for:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Crash Tests" secondary="Frontal, side, and rear impact tests" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Durability Tests" secondary="Fatigue analysis and endurance tests" />
            </ListItem>
            <ListItem>
              <ListItemText primary="NVH Tests" secondary="Noise, vibration, and harshness measurements" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Brake Tests" secondary="Stopping distance and fade tests" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ride Quality Tests" secondary="Comfort and harshness evaluations" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Powertrain Tests" secondary="Efficiency and performance tests" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Environmental Tests" secondary="Thermal and cold start tests" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 8: Compliance */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Gavel color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              8. Compliance Tracking
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Compliance page tracks regulatory compliance status for all test records. Compliance records are 
            automatically created when test data is uploaded.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Compliance Record Fields
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Standard" secondary="Regulatory standard (FMVSS, ECE, ISO, etc.)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Test Name" secondary="Associated test record name" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" secondary="Compliant, Non-Compliant, or Pending" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Score" secondary="Compliance score (0-100)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Threshold" secondary="Required threshold for compliance" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Updated" secondary="Timestamp of last status update" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Auto-Refresh Feature
          </Typography>
          <Typography variant="body2" paragraph>
            The Compliance page automatically refreshes every 5 seconds to display newly created compliance records 
            from test data uploads. This ensures you always see the latest compliance status.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Compliance Rate Calculation
          </Typography>
          <Typography variant="body2" paragraph>
            The page displays an overall compliance rate calculated as:
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
            Compliance Rate = (Compliant Records / Total Records) × 100%
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Supported Standards
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="FMVSS" secondary="Federal Motor Vehicle Safety Standards (US)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="ECE" secondary="Economic Commission for Europe regulations" />
            </ListItem>
            <ListItem>
              <ListItemText primary="ISO" secondary="International Organization for Standardization standards" />
            </ListItem>
            <ListItem>
              <ListItemText primary="SAE" secondary="Society of Automotive Engineers standards" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Section 9: Analytics */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Analytics color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              9. Analytics & Reporting
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Analytics page provides aggregated insights across all domains, helping you understand test distribution 
            and performance patterns.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Domain Distribution Chart
          </Typography>
          <Typography variant="body2" paragraph>
            A pie chart displays the distribution of tests across different engineering domains:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Safety" secondary="Safety and crash test distribution" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Durability" secondary="Fatigue and endurance test distribution" />
            </ListItem>
            <ListItem>
              <ListItemText primary="NVH" secondary="Noise, vibration, and harshness test distribution" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ride" secondary="Comfort and ride quality test distribution" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Power" secondary="Powertrain and electrical test distribution" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Environmental" secondary="Thermal and environmental test distribution" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Performance by Domain Chart
          </Typography>
          <Typography variant="body2" paragraph>
            A bar chart shows average performance scores for each domain, allowing you to:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Identify Strong Domains" secondary="Domains with high performance scores" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Identify Weak Domains" secondary="Domains requiring attention" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Compare Performance" secondary="Compare performance across domains" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Track Trends" secondary="Monitor performance changes over time" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Domain Filter
          </Typography>
          <Typography variant="body2" paragraph>
            Use the domain dropdown filter to focus analytics on a specific domain or view "All" domains together.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Section 10: Plugins */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Extension color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              10. Plugins & Extensions
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Plugins page allows you to manage and configure specialized analysis modules and compliance plugins.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Available Plugin Types
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Standards Compliance Plugins"
                secondary="FMVSS, ECE, ISO compliance checking modules"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Analytics Plugins"
                secondary="Advanced statistical analysis and reporting tools"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="AI/ML Plugins"
                secondary="Machine learning model integration and prediction engines"
              />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Plugin Actions
          </Typography>
          <Typography variant="body2" paragraph>
            For each plugin, you can:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><PlayArrow color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Run Plugin"
                secondary="Execute the plugin with current configuration"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><Settings color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Configure Plugin"
                secondary="Adjust plugin settings and parameters"
              />
            </ListItem>
          </List>

          <Typography variant="body2" paragraph sx={{ mt: 2 }}>
            Clicking these buttons simulates plugin execution and displays success/error messages via snackbar notifications.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Section 11: Settings */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Settings color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              11. Settings & Configuration
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            The Settings page provides configuration options for sensors, user roles, and system traceability.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Sensor Configuration
          </Typography>
          <Typography variant="body2" paragraph>
            Toggle switches to enable/disable sensor types:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Strain Gauges" secondary="Enable/disable strain measurement sensors" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Accelerometers" secondary="Enable/disable acceleration sensors" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Microphones" secondary="Enable/disable acoustic sensors" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Temperature Sensors" secondary="Enable/disable thermal sensors" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Load Cells" secondary="Enable/disable force measurement sensors" />
            </ListItem>
          </List>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            <strong>Note:</strong> Settings are saved to browser localStorage and persist across sessions.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            User Roles & Permissions
          </Typography>
          <Typography variant="body2" paragraph>
            Configure user access levels:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Administrator" secondary="Full system access" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Engineer" secondary="Test data and analysis access" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Viewer" secondary="Read-only access" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Traceability Settings
          </Typography>
          <Typography variant="body2" paragraph>
            Enable/disable traceability features:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Data Logging" secondary="Log all data access and modifications" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Audit Trail" secondary="Maintain audit trail for compliance" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Version Control" secondary="Track data version history" />
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Save Configuration
          </Typography>
          <Typography variant="body2" paragraph>
            Click the <strong>"Save Configuration"</strong> button to save all settings. A success notification 
            confirms that settings have been saved.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Section 12: Troubleshooting */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Warning color="warning" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              12. Troubleshooting & FAQ
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Common Issues
          </Typography>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                "Error Loading Data" or 404 Errors
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Cause:</strong> Backend API is not accessible or Firebase is not configured.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Solutions:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Check Backend Status" secondary="Ensure the backend server is running" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Verify API URL" secondary="Check that VITE_API_BASE_URL environment variable is set correctly" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check Firebase Configuration" secondary="Verify Firebase service account credentials are configured" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Seed Data" secondary="Run the seed data script to populate initial data" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Domain Pages Show No Data
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Cause:</strong> No test data exists for that domain or Firebase query failed.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Solutions:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Upload Test Data" secondary="Use the Test Data page to upload test records" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check Domain Filtering" secondary="Verify domain names match expected values (chassis, brake, nvh, ride, powertrain, environment)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check Browser Console" secondary="Open browser DevTools to see error messages" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                ML Predictions Fail
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Cause:</strong> Invalid JSON input or backend prediction service unavailable.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Solutions:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Validate JSON" secondary="Ensure input JSON is properly formatted" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Use Sample Data" secondary="Select a prediction type to auto-populate sample data" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check Backend Logs" secondary="Review backend server logs for error details" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Compliance Records Not Appearing
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                <strong>Cause:</strong> Test data upload didn't create compliance records or auto-refresh hasn't triggered.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Solutions:</strong>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Wait for Auto-Refresh" secondary="Page refreshes every 5 seconds automatically" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Refresh Page Manually" secondary="Press F5 or click browser refresh button" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Check Backend Logs" secondary="Verify compliance record creation in backend logs" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 600 }}>
            Frequently Asked Questions
          </Typography>

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                How do I add new test data?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Navigate to the Test Data page and click the "Upload Test Data" button. This simulates uploading 
                10 predefined test types. In a production environment, you would upload actual test files through 
                this interface.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Can I export data from the dashboard?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Yes! On the Executive Dashboard, click "Export KPI dashboard" in Quick Actions to download executive 
                KPIs as a JSON file. Additional export features can be added through the Global Filters action buttons.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                How accurate are the ML predictions?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                The current system uses heuristic-based models with ML-ready architecture. Prediction confidence 
                scores (typically 80-95%) indicate model certainty. For production use, these models should be 
                trained on historical test data for improved accuracy.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                What browsers are supported?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                The dashboard supports modern browsers including Chrome, Firefox, Safari, and Edge (latest versions). 
                JavaScript must be enabled. For best performance, use Chrome or Firefox.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                How do I filter data by vehicle program or model?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Use the Global Filters component at the top of each page. Select vehicle program, model, campaign, 
                or test date range to filter displayed data. Note: Filter functionality is currently simulated and 
                can be connected to backend filtering in production.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      {/* Footer */}
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Need Additional Help?
        </Typography>
        <Typography variant="body2" paragraph>
          For technical support, feature requests, or bug reports, please contact your system administrator 
          or refer to the project documentation.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Version:</strong> 1.0.0 | <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  )
}
