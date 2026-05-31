import { useEffect, useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { EmployeeModal } from '../components/EmployeeModal'
import { fetchEmployees } from '../api/payrollApi'
import type { Employee } from '../types/employee'

export function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Employee | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEmployees()
      .then(setEmployees)
      .catch(() => setError('Could not load employees. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return employees
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.employeeId.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.designation.toLowerCase().includes(q),
    )
  }, [employees, search])

  return (
    <div>
      <PageHeader
        title="Employees"
        description="View and search imported employee records."
      />

      <div className="mb-6 relative max-w-md">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="search"
          placeholder="Search by name, ID, email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/10"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">ID</th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">Name</th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">Email</th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">
                  Designation
                </th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">
                  Period
                </th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#9CA3AF]">
                    Loading employees…
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#DC2626]">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#9CA3AF]">
                    No employees found. Upload an Excel file first.
                  </td>
                </tr>
              )}
              {filtered.map((emp) => (
                <tr key={emp._id} className="hover:bg-[#FAFAFA]">
                  <td className="px-5 py-4 font-medium text-gray-900">
                    {emp.employeeId}
                  </td>
                  <td className="px-5 py-4 text-gray-900">{emp.name}</td>
                  <td className="px-5 py-4 text-[#6B7280]">{emp.email}</td>
                  <td className="px-5 py-4 text-[#6B7280]">{emp.designation}</td>
                  <td className="px-5 py-4 text-[#6B7280]">
                    {emp.month} {emp.year}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="secondary"
                      className="!py-1.5 !px-3 text-xs"
                      onClick={() => setSelected(emp)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
