# SVES-DAQ

**Scientific Vehicle Validation and Intelligence Dashboard**

A corporate-grade scientific vehicle validation and intelligence dashboard that unifies multi-physics test data across safety, durability, NVH, ride, power, and environmental domains into a single decision platform.

## Overview

SVES-DAQ converts raw sensor signals and regulatory test results into standardized KPIs, predictive insights, and design-ready recommendations, enabling engineering, CAE, and management teams to evaluate compliance, performance, and risk in real time.

## Features

- **Multi-Physics Data Integration**: Unified platform for safety, durability, NVH, ride, power, and environmental test data
- **Real-Time Analytics**: Live KPI calculations and performance monitoring
- **Predictive Intelligence**: ML-powered insights for design optimization and risk assessment
- **Compliance Management**: Automated regulatory test result evaluation
- **Enterprise Scalability**: Built for corporate-grade deployment and data handling

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Material-UI / Ant Design for UI components
- Recharts / D3.js for data visualization
- Firebase SDK for real-time data

### Backend
- Node.js with Express and TypeScript
- Firebase Admin SDK
- TensorFlow.js / ML libraries for predictive analytics
- RESTful API architecture

## Project Structure

```
SVES-DAQ/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── shared/            # Shared types and utilities
└── docs/              # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project configured
- Firebase service account key

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both `frontend/` and `backend/`
   - Configure Firebase credentials and API keys

3. Start development servers:
```bash
npm run dev
```

This will start both frontend (typically on http://localhost:5173) and backend (typically on http://localhost:3000) concurrently.

## Development

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend

## License

MIT
