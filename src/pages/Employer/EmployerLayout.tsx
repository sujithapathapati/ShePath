import React, { useState } from 'react';
import { LogOut, Building, Menu, X, Bell, User } from 'lucide-react';
import { useEmployer } from '../../contexts/EmployerContext'; // ✅ Correct context
import EmployerDashboard from './EmployerDashboard';

export default function EmployerLayout() {
  const { state, logoutEmployer } = useEmployer(); // ✅ Use correct context
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutEmployer(); // ✅ Logout properly
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-white to-plum-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lavender-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-charcoal-600 hover:text-charcoal-900 hover:bg-lavender-100 lg:hidden transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <div className="w-8 h-8 bg-gradient-to-br from-plum-500 to-ochre-500 rounded-lg flex items-center justify-center mr-3">
                  <Building className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-plum-600 to-ochre-600 bg-clip-text text-transparent">
                  ShePath Employer
                </h1>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 rounded-lg text-charcoal-600 hover:text-charcoal-900 hover:bg-lavender-100 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-ochre-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-charcoal-900">
                    {state.employer?.contactPerson || state.employer?.name}
                  </p>
                  <p className="text-xs text-charcoal-500">{state.employer?.companyName || 'Company'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-plum-400 to-lavender-400 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-charcoal-600 hover:text-charcoal-900 hover:bg-lavender-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-lavender-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-plum-500 to-ochre-500 rounded-lg flex items-center justify-center mr-3">
              <Building className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-plum-600 to-ochre-600 bg-clip-text text-transparent">
              ShePath Employer
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-charcoal-600 hover:bg-lavender-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-r from-plum-100 to-ochre-100 rounded-lg p-4">
            <h3 className="font-medium text-charcoal-900">{state.employer?.companyName || 'Your Company'}</h3>
            <p className="text-sm text-charcoal-600">{state.employer?.industry || 'Industry'}</p>
            <div className="flex items-center mt-2">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  state.employer?.verified ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
              <span className="text-xs text-charcoal-500">
                {state.employer?.verified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <EmployerDashboard />
        </div>
      </main>
    </div>
  );
}
