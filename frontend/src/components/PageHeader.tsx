interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
      )}
    </div>
  )
}
