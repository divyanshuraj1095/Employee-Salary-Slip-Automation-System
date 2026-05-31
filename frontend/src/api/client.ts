import axios from 'axios'
import { env } from '../config/env'

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url as string | undefined
    const isAuthRoute =
      url?.includes('/login') || url?.includes('/me') || url?.includes('/logout')

    if (error.response?.status === 401 && !isAuthRoute) {
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

export function pdfUrl(employeeId: string, month: string, year: number) {
  return `${env.apiBaseUrl}/pdfs/${employeeId}-${month}-${year}.pdf`
}
