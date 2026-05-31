# PayrollPro Frontend

Modern HR payroll dashboard for the Employee Salary Slip Automation System.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # if .env does not exist
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment variables

Copy `.env.example` to `.env` and adjust for your environment:

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Backend URL (no trailing slash), e.g. `http://localhost:7777` or `https://api.yourdomain.com` |
| `VITE_APP_NAME` | Product name shown in the sidebar (default: PayrollPro) |
| `VITE_USE_DEMO_AUTH` | `true` = local demo login without backend auth |
| `VITE_DEMO_EMAIL` | Demo login email |
| `VITE_DEMO_PASSWORD` | Demo login password |

Vite only exposes variables prefixed with `VITE_`. After changing `.env`, restart the dev server.

## Production build

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host. Set `VITE_API_BASE_URL` in your host’s environment variables at **build time**.

Ensure the backend allows your frontend origin via `FRONTEND_URL` in the backend `.env`.

## Demo login

With `VITE_USE_DEMO_AUTH=true` (default in `.env.example`):

- Email: `admin@payrollpro.com`
- Password: `admin123`
