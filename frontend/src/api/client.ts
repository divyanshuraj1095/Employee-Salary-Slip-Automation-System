import axios from 'axios'
import { env } from '../config/env'

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function pdfUrl(employeeId: string, month: string, year: number) {
  return `${env.apiBaseUrl}/pdfs/${employeeId}-${month}-${year}.pdf`
}
