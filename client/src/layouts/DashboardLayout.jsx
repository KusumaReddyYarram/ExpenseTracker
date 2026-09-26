import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Sparkles,
  LayoutDashboard,
  Receipt,
  Sliders,
  Target,
  BarChart3,
  LogOut,
  User,
  Brain
} from 'lucide-react';
import Button from '../components/common/Button';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/dashboard/transactions', icon: Receipt },
    { name: 'Budgets', path: '/dashboard/budgets', icon: Sliders },
    { name: 'Goals', path: '/dashboard/goals', icon: Target },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-aura-bg text-aura-charcoal flex flex-col">
      
      {/* App Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-aura-charcoal text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-aura-emerald" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-aura-charcoal">
                AURA <span className="text-aura-emerald text-xs font-bold">PLATFORM</span>
              </span>
            </NavLink>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-aura-emerald text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-semibold text-aura-charcoal">{user?.name}</span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto flex border-t border-slate-100">
          <div className="flex gap-1 py-1">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      isActive
                        ? 'bg-aura-charcoal text-white shadow-xs'
                        : 'text-slate-600 hover:text-aura-charcoal hover:bg-slate-100'
                    }`
                  }
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
