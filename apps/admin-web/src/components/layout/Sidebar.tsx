import { NavLink } from 'react-router-dom'
import {
  Home,
  Image,
  Package,
  Star,
  CreditCard,
  Users,
  LogOut,
  X
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/button'

interface SidebarProps {
  closeSidebar?: () => void
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const { logout } = useAuth()
  
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/banners', icon: Image, label: 'Banners' },
    { to: '/reviews', icon: Star, label: 'Reviews' },
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/vendors', icon: Users, label: 'Vendors' },
  ]

  const handleNavClick = () => {
    if (closeSidebar) {
      closeSidebar()
    }
  }

  const handleLogout = () => {
    logout()
    if (closeSidebar) {
      closeSidebar()
    }
  }

  return (
    <div className="w-64 sm:w-64 bg-blue-900 text-blue flex flex-col h-full">
      {/* Header with White Square Card for Logo and Name */}
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-lg p-3 shadow-md">
          <div className="flex items-center gap-2">
            {/* Logo Image */}
            <img 
              src="/logo-for-web-blue.png" 
              alt="VYOMA Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">VYOMA</h1>
          </div>
        </div>
        
        {closeSidebar && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 sm:hidden text-white hover:bg-gray-800"
            onClick={closeSidebar}
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 sm:px-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : ' text-gray-300'
              }`
            }
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button */}
      <div className="p-3 sm:p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center justify-start w-full h-auto px-3 sm:px-4 py-2.5 sm:py-3 text-gray-300 hover:bg-gray-800 hover:text-white text-sm sm:text-base"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar