import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiGrid,
  FiUpload,
  FiUsers,
  FiFileText,
  FiLogOut,
} from 'react-icons/fi'
import { Logo } from './Logo'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/upload', label: 'Upload Data', icon: FiUpload },
  { to: '/employees', label: 'Employees', icon: FiUsers },
  { to: '/salary-slips', label: 'Salary Slips', icon: FiFileText },
]

export function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
      <div className="border-b border-[#E5E7EB] px-5 py-5">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#F3F4F6] text-gray-900'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-gray-900'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#E5E7EB] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] transition-colors hover:bg-[#F9FAFB] hover:text-gray-900"
        >
          <FiLogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  )
}
