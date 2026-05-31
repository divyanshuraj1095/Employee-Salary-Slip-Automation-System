import { api } from './client'
import type { Employee } from '../types/employee'

export async function fetchEmployees(): Promise<Employee[]> {
  const { data } = await api.get<{ employees: Employee[] }>('/employees')
  return data.employees
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

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<string>('/login', {
    eMail: email,
    password,
  })
  return data
}
