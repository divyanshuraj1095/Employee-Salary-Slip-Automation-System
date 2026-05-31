# Toyoroll — Employee Salary Slip Automation System

A full-stack HR payroll application for uploading employee data from Excel, generating salary slip PDFs, and emailing them to employees. Built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Excel File Format](#excel-file-format)
- [Using the Application](#using-the-application)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Features

- Admin login with JWT (httpOnly cookie)
- Upload employee payroll data via Excel (`.xlsx` / `.xls`)
- View and search employee records
- Generate salary slip PDFs in bulk
- Email PDFs to employees via Gmail
- Dashboard with stats and recent activity

---

## Requirements

Install these before running the project:

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ recommended | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ (comes with Node) | Used for both frontend and backend |
| **MongoDB** | 6+ | Local install or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| **Gmail account** | — | Required only if you use **Send Emails** (with an [App Password](https://support.google.com/accounts/answer/185833)) |

---

## Project Structure

```
Employee Salary slip automation system/
│
├── backend/                    # Express API server (port 7777)
│   ├── config/
│   │   └── db.ts               # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.ts  # JWT cookie verification
│   │   └── multer.middleware.ts  # Excel file upload handler
│   ├── models/
│   │   ├── employee.ts         # Employee schema
│   │   └── activity.ts         # Dashboard activity log
│   ├── route/
│   │   ├── authRouter.ts       # Login, logout, session
│   │   ├── uploadRouter.ts     # POST /upload
│   │   ├── generateRouter.ts   # POST /generate
│   │   ├── sendEmailRouter.ts  # POST /sendEmail
│   │   ├── employeeRouter.ts   # GET /employees
│   │   └── dashboardRouter.ts  # Stats & activity
│   ├── utils/
│   │   ├── parseExcel.ts       # Excel → JSON
│   │   ├── generatePDF.ts      # PDF generation
│   │   ├── sendEmail.ts        # Nodemailer (Gmail)
│   │   └── logActivity.ts      # Activity logging helper
│   ├── pdfs/                   # Generated salary slip PDFs (auto-created)
│   ├── uploads/                # Uploaded Excel files (auto-created)
│   ├── server.ts               # App entry point
│   ├── .env.example            # Backend env template
│   └── package.json
│
├── frontend/                   # React dashboard (port 5173)
│   ├── public/
│   │   └── toyota-logo.png     # Brand logo
│   ├── src/
│   │   ├── api/                # Axios client & API calls
│   │   ├── components/         # UI components (Sidebar, Logo, etc.)
│   │   ├── context/            # Auth context
│   │   ├── pages/              # Login, Dashboard, Upload, Employees, Slips
│   │   ├── config/env.ts       # Reads VITE_* variables
│   │   └── App.tsx             # Routes
│   ├── .env.example            # Frontend env template
│   └── package.json
│
└── README.md                   # This file
```

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/divyanshuraj1095/Employee-Salary-Slip-Automation-System.git
cd Employee-Salary-Slip-Automation-System
```

### 2. Start MongoDB

**Local MongoDB:**
```bash
# Windows (if installed as a service, it may already be running)
net start MongoDB

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Or use MongoDB Atlas** — create a free cluster and copy your connection string into `MONGO_URI`.

### 3. Set up the backend

```bash
cd backend
npm install
```

Copy the environment template and edit it:

```bash
# Windows PowerShell
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Edit `backend/.env` with your values (see [Environment Variables](#environment-variables)).

Start the backend:

```bash
npm run dev
```

You should see:
```
Database Connected!!
Connected to port 7777
```

### 4. Set up the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

Copy the environment template:

```bash
# Windows PowerShell
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

The default `VITE_API_BASE_URL=http://localhost:7777` works for local development.

Start the frontend:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 5. Log in

Use the same credentials you set in `backend/.env`:

- **Email:** value of `EMAIL`
- **Password:** value of `EMAIL_PASSWORD`

---

## Environment Variables

### Backend (`backend/.env`)

Copy from `backend/.env.example`:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGO_URI` | Yes | MongoDB connection string | `mongodb://127.0.0.1:27017/payrollpro` |
| `JWT_SECRET` | Yes | Secret for signing login tokens | `my_super_secret_key_123` |
| `EMAIL` | Yes | Admin login email **and** Gmail sender address | `you@gmail.com` |
| `EMAIL_PASSWORD` | Yes | Admin login password **and** Gmail [App Password](https://support.google.com/accounts/answer/185833) | `xxxx xxxx xxxx xxxx` |
| `FRONTEND_URL` | Yes | Frontend origin for CORS | `http://localhost:5173` |

**Example `backend/.env`:**

```env
MONGO_URI=mongodb://127.0.0.1:27017/payrollpro
JWT_SECRET=change_this_to_a_long_random_string
EMAIL=admin@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> **Note:** `EMAIL` and `EMAIL_PASSWORD` are used for both admin login and sending emails via Gmail. Use a Gmail address and generate an App Password (not your regular Gmail password) if you plan to use **Send Emails**.

### Frontend (`frontend/.env`)

Copy from `frontend/.env.example`:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_BASE_URL` | Yes | Backend URL (no trailing slash) | `http://localhost:7777` |
| `VITE_APP_NAME` | No | Product name in the sidebar | `Toyoroll` |

**Example `frontend/.env`:**

```env
VITE_API_BASE_URL=http://localhost:7777
VITE_APP_NAME=Toyoroll
```

> Vite only reads variables prefixed with `VITE_`. Restart the dev server after changing `.env`.

---

## Excel File Format

Upload a `.xlsx` or `.xls` file with **exact column headers** (first row):

| Column | Type | Example |
|--------|------|---------|
| `employeeId` | String | `EMP101` |
| `name` | String | `John Doe` |
| `email` | String | `john@company.com` |
| `designation` | String | `Software Engineer` |
| `baseSalary` | Number | `50000` |
| `hra` | Number | `10000` |
| `allowances` | Number | `5000` |
| `deductions` | Number | `2000` |
| `month` | String | `June` |
| `year` | Number | `2026` |

Sample files are included in `backend/uploads/` for reference.

---

## Using the Application

1. **Login** — Sign in with your admin credentials.
2. **Upload Data** — Drag and drop or browse for an Excel file, then click **Upload File**.
3. **Employees** — View imported records; use search and **View Details**.
4. **Salary Slips** — Click **Generate PDFs**, then **Download PDF** per employee.
5. **Dashboard** — Quick actions for upload, generate, and send emails; view stats and recent activity.
6. **Send Emails** — From the dashboard, click **Send Emails** (requires generated PDFs and valid Gmail config).

**Recommended workflow:** Upload → Generate PDFs → Send Emails

---

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/login` | No | Admin login |
| `POST` | `/logout` | No | Clear session |
| `GET` | `/me` | Yes | Current session |
| `POST` | `/upload` | Yes | Upload Excel file |
| `GET` | `/employees` | Yes | List employees |
| `POST` | `/generate` | Yes | Generate all PDFs |
| `POST` | `/sendEmail` | Yes | Email slips to employees |
| `GET` | `/dashboard/stats` | Yes | Dashboard counts |
| `GET` | `/dashboard/activity` | Yes | Recent activity |
| `GET` | `/pdfs/:filename` | No | Download PDF |

---

## Deployment

### Frontend (Vercel, Netlify, etc.)

1. Set build environment variable: `VITE_API_BASE_URL=https://your-api-domain.com`
2. Build command: `npm run build`
3. Output directory: `dist`

### Backend (Railway, Render, VPS, etc.)

1. Set all variables from `backend/.env.example`
2. Set `FRONTEND_URL` to your deployed frontend URL (e.g. `https://toyoroll.vercel.app`)
3. Set `NODE_ENV=production`
4. Ensure MongoDB Atlas (or your DB) is reachable
5. Start command: `npm run dev` (or use `ts-node` / compile to JS for production)

**Important:** In production, frontend and backend must be on HTTPS, and `FRONTEND_URL` must match your frontend origin exactly for cookies and CORS to work.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| `Database Connected!!` never appears | MongoDB not running or wrong `MONGO_URI` | Start MongoDB or fix connection string |
| Login fails | Wrong `EMAIL` / `EMAIL_PASSWORD` | Match credentials in `backend/.env` |
| API calls fail / CORS errors | Backend not running or wrong URL | Check backend on port 7777; verify `VITE_API_BASE_URL` |
| Upload fails with duplicate key | Same `employeeId` already in DB | Clear collection or use new IDs |
| Emails not sending | Gmail App Password not set | Use Gmail + App Password in `EMAIL_PASSWORD` |
| PDF download 404 | PDFs not generated yet | Run **Generate PDFs** first |
| Session lost on refresh | Cookie / CORS mismatch | Ensure `FRONTEND_URL` matches frontend origin |

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express 5, TypeScript, MongoDB, Mongoose |
| Other | Multer, xlsx, PDFKit, Nodemailer, JWT, bcrypt |

---

## License

ISC
