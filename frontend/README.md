# Toyoroll — Frontend

React dashboard for the Employee Salary Slip Automation System.

> **Full setup guide:** see the [root README](../README.md) for requirements, folder structure, and step-by-step instructions.

## Quick setup

```bash
cd frontend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
npm run dev
```

App runs at **http://localhost:5173**

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend URL (default: `http://localhost:7777`) |
| `VITE_APP_NAME` | Product name in sidebar (default: `Toyoroll`) |

Login credentials come from the **backend** `.env` (`EMAIL` and `EMAIL_PASSWORD`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Production build

```bash
npm run build
```

Set `VITE_API_BASE_URL` to your deployed API **before** building. See [Deployment](../README.md#deployment) in the root README.
