import { env } from '../config/env'

interface LogoProps {
  compact?: boolean
  size?: 'sm' | 'md'
}

export function Logo({ compact = false, size = 'sm' }: LogoProps) {
  const dimension = size === 'md' ? 'h-10 w-10' : 'h-8 w-8'

  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/toyota-logo.png"
        alt="Toyota"
        className={`${dimension} shrink-0 object-contain`}
      />
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight text-gray-900">
          {env.appName}
        </span>
      )}
    </div>
  )
}
