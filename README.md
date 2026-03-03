# HealthOptyx Dashboard

Real-time physiological monitoring dashboard for wearable glucose, ECG, and cardiac data.

## Features

- **Glucose Overview** — Real-time glucose readings, 24-hour trends, min/max/average
- **Historical Trends** — 7-day, 30-day, 90-day aggregated glucose patterns
- **Baselines** — Personalized baseline management (placeholder for algorithm integration)
- **Alerts** — Alert system for detected physiological anomalies (placeholder for GPIP, CRI, AMC, IDS)
- **Settings** — User preferences, data source configuration

## Tech Stack

- **Frontend:** React 18 + Vite
- **Charting:** Recharts
- **Styling:** Tailwind CSS
- **API Client:** Axios
- **Icons:** Lucide React
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Local Development (`.env.local`)
```
VITE_API_URL=http://127.0.0.1:8000
```

### Production (`.env.production`)
Update `VITE_API_URL` to point to your deployed backend:
```
VITE_API_URL=https://your-api-domain.com
```

## API Integration

The dashboard fetches data from the HealthOptyx FastAPI backend:

- `GET /subjects/{external_id}` — Get subject info
- `GET /signals/{external_id}/glucose?start=...&end=...` — Fetch glucose readings
- `GET /signals/{external_id}/glucose/latest` — Get latest glucose reading
- `GET /auth/dexcom/status?subject_id=...` — Check Dexcom connection status

## Deployment to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial dashboard commit"
   git branch -M main
   git remote add origin https://github.com/your-username/healthoptyx-dashboard.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Set environment variable: `VITE_API_URL` → your deployed API URL
   - Deploy

3. **Configure API Endpoint:**
   - Once your FastAPI backend is deployed (Heroku, Railway, AWS, etc.), update the `VITE_API_URL` environment variable in Vercel project settings

## Algorithm Placeholders

The following sections are placeholders awaiting algorithm implementation:

- **Baselines Page** — Waits for GPIP, CRI, AMC, IDS implementation
- **Alerts Page** — Will display real-time algorithm alerts once models are integrated
- **Settings Page** — Algorithm threshold configuration (future)

## Current Data Source

- **Dexcom:** Sandbox CGM data (real patient data will replace when available)
- **VivaLink:** Not yet integrated (placeholder for ECG/HRV)

## Future Enhancements

- WebSocket support for real-time glucose updates
- xDrip+ integration via Nightscout
- Algorithm outputs (GPIP, CRI, AMC, IDS, ORI)
- PDF export of trend reports
- Mobile-responsive design optimization
- Dark mode support
- Multi-subject management

## Support

For issues or feature requests, reach out to the development team.
