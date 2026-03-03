import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Settings as SettingsIcon, Home, Menu, X } from 'lucide-react';
import GlucoseOverview from './pages/GlucoseOverview';
import HistoricalTrends from './pages/HistoricalTrends';
import Baselines from './pages/Baselines';
import Alerts from './pages/Alerts';
import SettingsPage from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [subjectId, setSubjectId] = useState('daniel');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages = {
    overview: { label: 'Overview', icon: Home, component: GlucoseOverview },
    trends: { label: 'Trends', icon: TrendingUp, component: HistoricalTrends },
    baselines: { label: 'Baselines', icon: BarChart3, component: Baselines },
    alerts: { label: 'Alerts', icon: AlertCircle, component: Alerts },
    settings: { label: 'Settings', icon: SettingsIcon, component: SettingsPage },
  };

  const CurrentPage = pages[currentPage].component;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-72' : 'w-20'
      } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl hidden md:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
                🧬
              </div>
              <div>
                <h1 className="text-xl font-bold">HealthOptyx</h1>
                <p className="text-xs text-slate-400">v0.1.0</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {Object.entries(pages).map(([key, page]) => {
            const Icon = page.icon;
            const isActive = currentPage === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setCurrentPage(key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm">{page.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Subject Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</p>
            <p className="text-sm font-semibold text-white mt-2 truncate">{subjectId}</p>
            <div className="mt-3 px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-lg text-xs text-blue-300">
              ✓ Connected
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden lg:block"
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{pages[currentPage].label}</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {currentPage === 'overview' && 'Real-time glucose monitoring'}
                {currentPage === 'trends' && 'Historical patterns and analytics'}
                {currentPage === 'baselines' && 'Personalized baseline management'}
                {currentPage === 'alerts' && 'Predictive alerts and notifications'}
                {currentPage === 'settings' && 'Configuration and preferences'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-700">Live Data</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2">
            {Object.entries(pages).map(([key, page]) => {
              const Icon = page.icon;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentPage(key);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === key
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="animate-slide-in">
            <CurrentPage subjectId={subjectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
