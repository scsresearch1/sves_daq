# Seed Data Guide

## Quick Start

To populate Firebase Firestore with comprehensive test data:

```bash
cd backend
export GOOGLE_APPLICATION_CREDENTIALS="./config/firebase-service-account.json"
export FIREBASE_PROJECT_ID="sves-daq"
npm run seed
```

Or on Windows PowerShell:
```powershell
cd backend
$env:GOOGLE_APPLICATION_CREDENTIALS="./config/firebase-service-account.json"
$env:FIREBASE_PROJECT_ID="sves-daq"
npm run seed
```

## Environment Variables Required

- `GOOGLE_APPLICATION_CREDENTIALS`: Path to Firebase service account JSON file
- `FIREBASE_PROJECT_ID`: Your Firebase project ID (e.g., "sves-daq")

## What Gets Created

### 1. Programs Collection (3 programs)
- **baja_2026**: Baja SAE 2026 program (Off-road, 265kg, RWD)
- **formula_2025**: Formula SAE 2025 program (Racing, 185kg, RWD)
- **ev_prototype_2026**: EV Prototype 2026 program (Electric, 320kg, AWD)

### 2. Vehicles Collection (6 vehicles)
- **baja_001** & **baja_002**: Baja vehicles (Endurance & Acceleration specs)
- **formula_001** & **formula_002**: Formula vehicles (Aero & Base packages)
- **ev_001** & **ev_002**: EV prototypes (Performance & Efficiency variants)

### 3. Tests Collection (32+ tests)
Comprehensive test runs across all programs:
- **Baja 2026**: 12 tests (Endurance, Brake, NVH, Ride, Durability, Thermal, Split-µ, ABS)
- **Formula 2025**: 10 tests (Aerodynamic, Brake, Handling, Powertrain, Endurance, Thermal, NVH, Compliance)
- **EV Prototype**: 10 tests (Range, Power, Thermal, Regeneration, NVH, Comfort, Environmental, Durability)
- Tests span 30 days of historical data with realistic timestamps
- Multiple operators, tracks, and test statuses

### 4. Sensors Collection (40+ sensors)
Comprehensive sensor suite including:
- **Chassis & Suspension**: Strain gauges (FLCA, RLCA L/R), Force sensors (Strut mounts), Wheel travel sensors
- **Brake & Safety**: Brake pressure, Brake temperature (FL/FR), Wheel speeds (all 4), ABS flags, Deceleration
- **NVH & Acoustics**: Microphones (Wheel well, Cabin), Dominant frequency, RPM, Order tracking (1.0, 2.5)
- **Ride & Comfort**: Accelerometers (Seat X/Y/Z, Steering X, Floor Z)
- **Powertrain & Electrical**: DC/AC Voltage & Current, Power, THD
- **Thermal & Environment**: Temperature sensors (Strut, Ambient, Engine, Battery)

### 5. Streams Collection (500+ stream chunks)
High-resolution time-series data:
- **Sampling Rate**: 10 Hz (100ms intervals)
- **Duration**: 30-90 minutes per test
- **Data Points**: 100-1000+ points per stream (chunked for Firestore)
- **Realistic Patterns**: 
  - Sinusoidal patterns for RPM, speed, orders
  - Trend-based data for temperature, strain
  - Event-tagged spikes for shocks, squeals, high strain
- **Event Tags**: Landing, BottomOut, Washboard, BrakeApplication, Squeal, Shock, HighStrain
- **Coverage**: All sensors active per test type with domain-specific relevance

### 6. Events Collection (50+ events)
Automatically detected and tagged events:
- **Endurance/Durability**: Landing, BottomOut, Washboard, RockCrawl, GOut, HighStrain
- **Brake**: BrakeStop, ABSActivation
- **NVH**: BrakeSqueal
- **Environmental**: WinterSoak, DesertSoak
- Events linked to related sensors and timestamps

### 7. KPIs Collection (100+ KPIs)
Domain-specific KPIs for every test:
- **Suspension**: Peak strain utilization, L-R asymmetry, Bottom-out count, Load sharing
- **Fatigue**: Rainflow bins, Miner damage, Remaining life hours
- **Brakes**: Stopping distance, MFDD, ABS activation rate, Fade slope
- **NVH**: SPL max, LAeq, Squeal occurrences, Dominant order
- **Ride**: ISO 2631 weighted RMS, Exposure hours, Comfort status
- **Electrical**: Average efficiency, Peak power, Energy per km, THD
- **Thermal**: Peak temperature, Temperature gradient, Heat soak detection
- **Environment**: Winter/Desert temperature range, Performance drift, Derating flags
- **Executive**: Safety compliance, Durability margin, NVH compliance, Ride comfort, Energy efficiency, Environmental robustness, Warranty risk

### 8. ML Predictions Collection (20+ predictions)
AI-powered predictions for major tests:
- Remaining life hours
- Failure risk scores
- Brake fade risk (Low/Medium/High)
- Fastener loosening risk
- Ride discomfort probability
- Squeal likelihood
- Recommended design actions

## Data Structure Highlights

- **Event Tags**: Streams include event tags (Washboard, Landing, GOut, RockCrawl, BrakeSqueal, etc.)
- **Time-series Data**: Realistic sensor data with timestamps
- **Standards Compliance**: Tests linked to ISO, FMVSS, ECE, VDA standards
- **Multi-domain Coverage**: All 6 domains represented (Safety, Durability, NVH, Ride, Powertrain, Environment)
- **Realistic Values**: Sensor data matches real-world ranges

## Running the Script

The script uses `upsertDoc` which means:
- If documents exist, they will be updated (merged)
- If documents don't exist, they will be created
- Safe to run multiple times

## Data Volume Summary

The expanded seed script creates:
- **3 Programs** across different vehicle types
- **6 Vehicles** with various configurations
- **32+ Tests** spanning 30 days of history
- **40+ Sensors** covering all domains
- **500+ Stream Chunks** with high-resolution time-series data
- **50+ Events** with automatic detection
- **100+ KPIs** covering all domains and tests
- **20+ ML Predictions** with actionable insights

## Example Document IDs

After running, you can query:
- `programs/baja_2026`, `programs/formula_2025`, `programs/ev_prototype_2026`
- `vehicles/baja_001`, `vehicles/formula_001`, `vehicles/ev_001`
- `tests/baja_endurance_01`, `tests/formula_test_01`, `tests/ev_test_01`
- `streams/baja_endurance_01_strain_FLCA_L_c01` (and many more)
- `kpis/baja_endurance_01_executive` (and domain-specific KPIs)
- `events/ev_baja_endurance_01_001` (and many more)
- `ml_predictions/baja_endurance_01` (and others)

## Performance Notes

- The seed script processes data in batches (500 documents per batch) for optimal Firestore performance
- Stream data is automatically chunked (max 1000 points per chunk) to stay within Firestore document size limits
- Total seed time: ~2-5 minutes depending on network speed
- Safe to run multiple times (uses upsert/merge operations)
