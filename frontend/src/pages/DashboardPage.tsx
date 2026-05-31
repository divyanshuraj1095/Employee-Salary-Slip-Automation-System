import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiFileText, FiMail, FiUpload, FiZap } from 'react-icons/fi'
import { StatCard } from '../components/StatCard'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import {
  fetchActivities,
  fetchDashboardStats,
  generateSlips,
  sendSlipEmails,
} from '../api/payrollApi'
import type { ActivityItem, DashboardStats } from '../types/employee'

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const activityIcon: Record<ActivityItem['type'], string> = {
  upload: 'bg-blue-50 text-blue-600',
  generate: 'bg-red-50 text-[#DC2626]',
  email: 'bg-gray-100 text-gray-600',
}

export function DashboardPage() {
  const { adminName } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    slipsGenerated: 0,
    emailsSent: 0,
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState('')

  useEffect(() => {
    let active = true

    Promise.all([fetchDashboardStats(), fetchActivities()])
      .then(([statsData, activityData]) => {
        if (!active) return
        setStats(statsData)
        setActivities(activityData)
      })
      .catch(() => {
        if (!active) return
        setActionMessage('Could not load dashboard data. Check backend connection.')
      })

    return () => {
      active = false
    }
  }, [])

  const loadDashboard = async () => {
    const [statsData, activityData] = await Promise.all([
      fetchDashboardStats(),
      fetchActivities(),
    ])
    setStats(statsData)
    setActivities(activityData)
  }

  const handleGenerate = async () => {
    setActionLoading('generate')
    setActionMessage('')
    try {
      const res = await generateSlips()
      await loadDashboard()
      setActionMessage(res.message)
    } catch {
      setActionMessage('Could not generate slips. Upload employees first.')
    } finally {
      setActionLoading(null)
    }
  }

  const handleSendEmails = async () => {
    setActionLoading('email')
    setActionMessage('')
    try {
      const res = await sendSlipEmails()
      await loadDashboard()
      setActionMessage(
        `Sent ${res.emailSend} email(s) successfully. ${res.emailFailed} failed.`,
      )
    } catch {
      setActionMessage('Could not send emails. Generate PDFs first.')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium text-[#6B7280]">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
          Welcome back, {adminName}
        </h1>
      </div>

      <div className="mb-10 grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Total Employees"
          value={stats.totalEmployees}
          icon={<FiUsers className="h-5 w-5" />}
        />
        <StatCard
          label="Salary Slips Generated"
          value={stats.slipsGenerated}
          icon={<FiFileText className="h-5 w-5" />}
        />
        <StatCard
          label="Emails Sent"
          value={stats.emailsSent}
          icon={<FiMail className="h-5 w-5" />}
        />
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/upload">
            <Button variant="primary" className="gap-2">
              <FiUpload className="h-4 w-4" />
              Upload Excel File
            </Button>
          </Link>
          <Button
            variant="secondary"
            loading={actionLoading === 'generate'}
            onClick={handleGenerate}
            className="gap-2"
          >
            <FiZap className="h-4 w-4" />
            Generate Salary Slips
          </Button>
          <Button
            variant="secondary"
            loading={actionLoading === 'email'}
            onClick={handleSendEmails}
            className="gap-2"
          >
            <FiMail className="h-4 w-4" />
            Send Emails
          </Button>
        </div>
        {actionMessage && (
          <p className="mt-3 text-sm text-[#6B7280]">{actionMessage}</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
          Recent Activity
        </h2>
        <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-[var(--shadow-soft)]">
          {activities.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[#9CA3AF]">
              No activity yet. Upload a file or generate slips to get started.
            </p>
          ) : (
            <ul className="divide-y divide-[#F3F4F6]">
              {activities.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${activityIcon[item.type]}`}
                  >
                    {item.type === 'upload' && 'UP'}
                    {item.type === 'generate' && 'PDF'}
                    {item.type === 'email' && '@'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="truncate text-sm text-[#6B7280]">
                      {item.detail}
                    </p>
                  </div>
                  <time className="shrink-0 text-xs text-[#9CA3AF]">
                    {formatTime(item.timestamp)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
