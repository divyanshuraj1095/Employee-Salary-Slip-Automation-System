export interface Employee {
  _id: string
  employeeId: string
  name: string
  email: string
  designation: string
  baseSalary: number
  hra: number
  allowances: number
  deductions: number
  month: string
  year: number
  createdAt?: string
  updatedAt?: string
}

export interface ActivityItem {
  id: string
  type: 'upload' | 'generate' | 'email'
  title: string
  detail: string
  timestamp: string
}

export interface DashboardStats {
  totalEmployees: number
  slipsGenerated: number
  emailsSent: number
}
