# Data Seeding Scripts

## Seed Test Data

This script populates Firestore with sample test data for development and testing.

### Usage

```bash
npm run seed
```

or

```bash
tsx scripts/seedData.ts
```

### What it does

1. **Clears existing data** (optional - can be commented out)
2. **Uploads test data records** - 8 sample test records across different domains
3. **Uploads compliance records** - 5 compliance records with various standards
4. **Uploads dashboard metrics** - Executive dashboard metrics and trends

### Data Structure

#### Test Data (`testData` collection)
- testName: Name of the test
- domain: Safety, Durability, NVH, Ride, Powertrain, Environment, Brake
- timestamp: ISO timestamp
- status: completed, in-progress, failed
- kpi: Performance score (0-100)
- vehicleProgram, model, testCampaign, track, environment, standard

#### Compliance (`compliance` collection)
- standard: FMVSS, ISO, SAE, EURO NCAP, etc.
- testName: Name of compliance test
- status: compliant, non-compliant, pending
- score: Test score
- threshold: Compliance threshold
- lastUpdated: ISO timestamp

#### Metrics (`metrics/dashboard` document)
- totalTests: Total number of tests
- activeProjects: Number of active projects
- complianceRate: Overall compliance percentage
- avgPerformance: Average performance score
- recentTrends: Array of date/value pairs

### Customization

Edit `scripts/seedData.ts` to:
- Add more test records
- Modify existing data
- Add new collections
- Change data structure

### Security Note

⚠️ **Important**: The `firebase-service-account.json` file contains sensitive credentials. Never commit this file to version control. It's already in `.gitignore`.
