import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#DC2626]">
        {icon}
      </div>
      <p className="text-sm font-medium text-[#6B7280]">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  )
}
