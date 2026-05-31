import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { fetchEmployees, generateSlips } from '../api/payrollApi'
import { pdfUrl } from '../api/client'
import type { Employee } from '../types/employee'

export function SalarySlipsPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState('')

  const load = () => {
    setLoading(true)
    fetchEmployees()
      .then(setEmployees)
      .catch(() => setMessage('Could not load employees.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let active = true

    fetchEmployees()
      .then((data) => {
        if (active) setEmployees(data)
      })
      .catch(() => {
        if (active) setMessage('Could not load employees.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    setMessage('')
    try {
      const res = await generateSlips()
      setMessage(res.message)
      load()
    } catch {
      setMessage('Generation failed. Ensure employees are uploaded.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Salary Slips"
        description="Generate and download employee payslip PDFs."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Button loading={generating} onClick={handleGenerate}>
          Generate PDFs
        </Button>
      </div>

      {message && (
        <p className="mb-6 rounded-lg bg-[#F3F4F6] px-4 py-3 text-sm text-gray-700">
          {message}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[var(--shadow-soft)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">
                  Employee
                </th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">ID</th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">
                  Pay Period
                </th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]">
                  Slip File
                </th>
                <th className="px-5 py-3.5 font-medium text-[#6B7280]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#9CA3AF]">
                    Loading…
                  </td>
                </tr>
              )}
              {!loading && employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-[#9CA3AF]">
                    No employees yet. Upload data to generate slips.
                  </td>
                </tr>
              )}
              {employees.map((emp) => {
                const href = pdfUrl(emp.employeeId, emp.month, emp.year)
                const filename = `${emp.employeeId}-${emp.month}-${emp.year}.pdf`
                return (
                  <tr key={emp._id} className="hover:bg-[#FAFAFA]">
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {emp.name}
                    </td>
                    <td className="px-5 py-4 text-[#6B7280]">{emp.employeeId}</td>
                    <td className="px-5 py-4 text-[#6B7280]">
                      {emp.month} {emp.year}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-[#9CA3AF]">
                      {filename}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <Button
                          variant="secondary"
                          className="!py-1.5 !px-3 text-xs gap-1.5"
                        >
                          <FiDownload className="h-3.5 w-3.5" />
                          Download PDF
                        </Button>
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
