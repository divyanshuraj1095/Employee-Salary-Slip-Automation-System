import type { Employee } from '../types/employee'
import { FiX } from 'react-icons/fi'

interface EmployeeModalProps {
  employee: Employee | null
  onClose: () => void
}

export function EmployeeModal({ employee, onClose }: EmployeeModalProps) {
  if (!employee) return null

  const net =
    employee.baseSalary +
    employee.hra +
    employee.allowances -
    employee.deductions

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[var(--shadow-card)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="employee-detail-title"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2
              id="employee-detail-title"
              className="text-lg font-semibold text-gray-900"
            >
              {employee.name}
            </h2>
            <p className="text-sm text-[#6B7280]">{employee.employeeId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#6B7280] hover:bg-[#F3F4F6]"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <dl className="space-y-3 text-sm">
          {[
            ['Email', employee.email],
            ['Designation', employee.designation],
            ['Pay Period', `${employee.month} ${employee.year}`],
            ['Base Salary', `₹${employee.baseSalary.toLocaleString()}`],
            ['HRA', `₹${employee.hra.toLocaleString()}`],
            ['Allowances', `₹${employee.allowances.toLocaleString()}`],
            ['Deductions', `₹${employee.deductions.toLocaleString()}`],
            ['Net Pay', `₹${net.toLocaleString()}`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-b border-[#F3F4F6] pb-3 last:border-0"
            >
              <dt className="text-[#6B7280]">{label}</dt>
              <dd className="font-medium text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
