import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { env } from '../config/env'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(env.demoEmail)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo size="md" />
          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Sign in to manage payroll and salary slips.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/10"
                placeholder="admin@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/10"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-[#DC2626]">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign in
            </Button>
          </form>

          {env.useDemoAuth && (
            <p className="mt-6 text-center text-xs text-[#9CA3AF]">
              Demo: {env.demoEmail} / {env.demoPassword}
            </p>
          )}
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-[#F3F4F6] lg:flex">
        <div className="max-w-md px-12 text-center">
          <div className="mx-auto mb-8 flex h-48 w-48 items-center justify-center rounded-2xl bg-white shadow-[var(--shadow-card)]">
            <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
              <rect
                x="20"
                y="30"
                width="80"
                height="60"
                rx="8"
                fill="#F3F4F6"
                stroke="#E5E7EB"
              />
              <rect x="32" y="44" width="40" height="4" rx="2" fill="#DC2626" />
              <rect x="32" y="54" width="56" height="3" rx="1.5" fill="#E5E7EB" />
              <rect x="32" y="62" width="48" height="3" rx="1.5" fill="#E5E7EB" />
              <rect x="32" y="70" width="52" height="3" rx="1.5" fill="#E5E7EB" />
              <circle cx="88" cy="72" r="14" fill="#DC2626" fillOpacity="0.12" />
              <path
                d="M82 72l4 4 8-8"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Automate salary slips
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
            Upload employee data, generate PDF payslips, and email them — all from
            one clean dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
