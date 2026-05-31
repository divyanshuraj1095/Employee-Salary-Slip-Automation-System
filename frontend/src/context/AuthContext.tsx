import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { env } from '../config/env'
import { loginRequest } from '../api/payrollApi'

interface AuthContextValue {
  isAuthenticated: boolean
  adminName: string
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AUTH_KEY = 'payrollpro_auth'

function readAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? (JSON.parse(raw) as { email: string; name: string }) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(readAuth)

  const login = useCallback(async (email: string, password: string) => {
    if (env.useDemoAuth) {
      if (email === env.demoEmail && password === env.demoPassword) {
        const next = { email, name: 'Admin' }
        localStorage.setItem(AUTH_KEY, JSON.stringify(next))
        setSession(next)
        return
      }
      throw new Error('Invalid email or password')
    }

    await loginRequest(email, password)
    const next = { email, name: 'Admin' }
    localStorage.setItem(AUTH_KEY, JSON.stringify(next))
    setSession(next)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      adminName: session?.name ?? 'Admin',
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
