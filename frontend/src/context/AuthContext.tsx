import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loginRequest,
  logoutRequest,
  verifySession,
} from '../api/payrollApi'
import { setUnauthorizedHandler } from '../api/client'

interface Session {
  email: string
  name: string
}

interface AuthContextValue {
  isAuthenticated: boolean
  bootstrapping: boolean
  adminName: string
  adminEmail: string
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [bootstrapping, setBootstrapping] = useState(true)

  const clearSession = useCallback(() => {
    setSession(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      clearSession()
      navigate('/login', { replace: true })
    })
  }, [clearSession, navigate])

  useEffect(() => {
    verifySession()
      .then((user) => setSession(user))
      .catch(() => setSession(null))
      .finally(() => setBootstrapping(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const user = await loginRequest(email, password)
    setSession({ email: user.email, name: user.name })
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutRequest()
    } catch {
      // Cookie may already be cleared
    }
    clearSession()
  }, [clearSession])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      bootstrapping,
      adminName: session?.name ?? 'Admin',
      adminEmail: session?.email ?? '',
      login,
      logout,
    }),
    [session, bootstrapping, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
