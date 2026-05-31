# Toyoroll — Backend

Express API for the Employee Salary Slip Automation System.

> **Full setup guide:** see the [root README](../README.md) for requirements, folder structure, and step-by-step instructions.

## Quick setup

```bash
cd backend
npm install
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
npm run dev
```

Server runs at **http://localhost:7777**

## Environment

See `backend/.env.example` and the [Environment Variables](../README.md#environment-variables) section in the root README.

## Key folders

| Folder | Purpose |
|--------|---------|
| `pdfs/` | Generated salary slip PDFs |
| `uploads/` | Uploaded Excel files |
| `route/` | API route handlers |
| `models/` | Mongoose schemas |
| `middlewares/` | Auth & file upload |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload (`ts-node-dev`) |
