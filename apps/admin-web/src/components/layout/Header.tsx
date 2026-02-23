import { Bell, Search, Menu } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'

interface HeaderProps {
  toggleSidebar?: () => void
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section - Mobile Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          {toggleSidebar && (
            <Button 
              variant="ghost" 
              size="icon"
              className="sm:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {/* Mobile Logo */}
         <h2 className="text-lg font-normal sm:hidden">Admin</h2>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:block flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 sm:pl-10 border-gray-300 h-9 sm:h-10 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Mobile Search Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          className="sm:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          {/* Profile - Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <p className="font-medium text-sm">Admin</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          
          {/* Profile - Mobile (Avatar only) */}
          <div className="sm:hidden w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {showMobileSearch && (
        <div className="sm:hidden mt-3 pt-3 border-t">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 border-gray-300 h-10 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header