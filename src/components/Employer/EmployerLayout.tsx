import React, { useState } from 'react';
import { LogOut, Building, Menu, X, Bell, User } from 'lucide-react';
import { useEmployer } from '../../contexts/EmployerContext';
import EmployerDashboard from './EmployerDashboard';

export default function EmployerLayout() {
  const { state, dispatch } = useEmployer();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_EMPLOYER' });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white w-64 shadow-md fixed z-40 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <Building className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-purple-700">ShePath Employer</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-800 font-semibold">{state.employer?.companyName}</p>
          <p className="text-sm text-gray-500">{state.employer?.industry}</p>
          <div className="text-xs text-gray-400">
            {state.employer?.verified ? (
              <span className="text-green-600">✔ Verified</span>
            ) : (
              <span className="text-yellow-500">⏳ Pending Verification</span>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-purple-700">Employer Dashboard</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-black">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-300 text-white rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium">{state.employer?.contactPerson}</p>
                <p className="text-xs text-gray-500">{state.employer?.companyName}</p>
              </div>
              <button onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-50">
          <EmployerDashboard />
        </main>
      </div>
    </div>
  );
}
