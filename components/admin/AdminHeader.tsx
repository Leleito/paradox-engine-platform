'use client'

import { signOut } from 'next-auth/react'
import { Bell, LogOut, User, Settings } from 'lucide-react'
import { useState } from 'react'

interface AdminHeaderProps {
  session: any
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-palette-deepest text-palette-light shadow-lg z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="diamond-symbol bg-palette-warm scale-75"></div>
            <h1 className="text-xl font-bold">Paradox Engine Admin</h1>
          </div>
          <div className="hidden md:block text-sm text-palette-medium">
            Welcome back, {session?.user?.name || 'Admin'}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-palette-dark transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-palette-dark transition-colors"
            >
              <div className="w-8 h-8 bg-palette-warm rounded-full flex items-center justify-center">
                {session?.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt="User" 
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4 text-palette-deepest" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{session?.user?.name || 'Admin'}</div>
                <div className="text-xs text-palette-medium">{session?.user?.email}</div>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-palette-light text-palette-deepest rounded-lg shadow-lg border border-palette-medium">
                <div className="p-3 border-b border-palette-medium">
                  <div className="font-medium">{session?.user?.name || 'Admin'}</div>
                  <div className="text-sm text-palette-dark">{session?.user?.email}</div>
                  <div className="text-xs text-palette-medium mt-1">
                    Role: {session?.user?.role || 'Admin'}
                  </div>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full p-2 rounded hover:bg-palette-medium/20 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 w-full p-2 rounded hover:bg-palette-medium/20 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2 border-palette-medium" />
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 w-full p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 