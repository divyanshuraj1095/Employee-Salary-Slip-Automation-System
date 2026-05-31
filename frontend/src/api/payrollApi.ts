import axios from 'axios'
import { api } from './client'
import type { ActivityItem, DashboardStats, Employee } from '../types/employee'

function getErrorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    if (typeof data === 'string') {
      return data.replace(/^Error:\s*/i, '')
    }
    if (data && typeof data === 'object' && 'message' in data) {
      return String((data as { message: string }).message)
    }
  }
  return fallback
}

export async function verifySession(): Promise<{ email: string; name: string }> {
  const { data } = await api.get<{ email: string; name: string }>('/me')
  return data
}

export async function loginRequest(email: string, password: string) {
  try {
    const { data } = await api.post<{ message: string; email: string; name: string }>(
      '/login',
      { eMail: email, password },
    )
    return data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Invalid email or password'), {
      cause: err,
    })
  }
}

export async function logoutRequest() {
  await api.post('/logout')
}

export async function fetchEmployees(): Promise<Employee[]> {
  const { data } = await api.get<{ employees: Employee[] }>('/employees')
  return data.employees
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get<DashboardStats>('/dashboard/stats')
  return data
}

export async function fetchActivities(): Promise<ActivityItem[]> {
  const { data } = await api.get<{ activities: ActivityItem[] }>(
    '/dashboard/activity',
  )
  return data.activities
}

export async function uploadExcel(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post<{
    message: string
    employees: Employee[]
  }>('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export async function generateSlips() {
  const { data } = await api.post<{ message: string }>('/generate')
  return data
}

export async function sendSlipEmails() {
  const { data } = await api.post<{
    message: string
    emailSend: number
    emailFailed: number
  }>('/sendEmail')
  return data
}
