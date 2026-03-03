import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Settings as SettingsIcon, Home, Menu, X, LogOut } from 'lucide-react';
import GlucoseOverview from './pages/GlucoseOverview';
import HistoricalTrends from './pages/HistoricalTrends';
import Baselines from './pages/Baselines';
import Alerts from './pages/Alerts';
import SettingsPage from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [subjectId, setSubjectId] = useState('daniel');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center font-bold text-xl text-white">
                🧬
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">HealthOptyx</h1>
                <p className="text-xs text-slate-500">Physiological Intelligence</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {Object.entries(pages).map(([key, page]) => {
                const Icon = page.icon;
                const isActive = currentPage === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden lg:inline">{page.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2">
                <div className="px-3 py-1.5 bg-green-50 rounded-full flex items-center gap-2 border border-green-200">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs font-medium text-green-700">Live</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-4 space-y-1">
              {Object.entries(pages).map(([key, page]) => {
                const Icon = page.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentPage(key);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      currentPage === key
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{page.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12 animate-slide-in">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-slate-900">{pages[currentPage].label}</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Subject:</span>
              <span className="font-semibold text-slate-900">{subjectId}</span>
            </div>
          </div>
          <p className="text-slate-600">
            {currentPage === 'overview' && 'Monitor your real-time glucose levels and health metrics'}
            {currentPage === 'trends' && 'Analyze your glucose patterns over time'}
            {currentPage === 'baselines' && 'Manage your personalized baseline ranges'}
            {currentPage === 'alerts' && 'Stay informed about health alerts and notifications'}
            {currentPage === 'settings' && 'Configure your dashboard and preferences'}
          </p>
        </div>

        {/* Page Content */}
        <div className="animate-fade-in">
          <CurrentPage subjectId={subjectId} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">HealthOptyx</span> v0.1.0 — Physiological Intelligence Platform
              </p>
              <p className="text-xs text-slate-500 mt-2">Real-time wearable data analytics and predictive insights</p>
            </div>
            <div className="text-xs text-slate-500">
              <p>© 2026 HealthOptyx. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
