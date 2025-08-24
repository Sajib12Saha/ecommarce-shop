import { MapPin, Phone, UserPlus, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden lg:block">
      <div className="max-w-[120rem] mx-auto">
      {/* Top Bar */}
      <div className="backdrop-blur-lg shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm text-gray-600">
            {/* Location & Phone */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Maitranga Bazar, Khagrachari</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>09613821316</span>
              </div>
            </div>

            {/* Register & Sign In */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-900">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="backdrop-blur-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">ePahar</h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search your product"
                  className="w-full pl-4 pr-12 py-2 border-primary"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Track Order */}
            <Button variant="outline" className="bg-transparent" disabled>
              Track Order
            </Button>
          </div>
        </div>
      </div>
  </div>
    </header>
  )
}
