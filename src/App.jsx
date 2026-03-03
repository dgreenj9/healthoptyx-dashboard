import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Settings as SettingsIcon, Home } from 'lucide-react';
import GlucoseOverview from './pages/GlucoseOverview';
import HistoricalTrends from './pages/HistoricalTrends';
import Baselines from './pages/Baselines';
import Alerts from './pages/Alerts';
import SettingsPage from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [subjectId, setSubjectId] = useState('daniel');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pages = {
    overview: { label: 'Overview', icon: Home, component: GlucoseOverview },
    trends: { label: 'Trends', icon: TrendingUp, component: HistoricalTrends },
    baselines: { label: 'Baselines', icon: BarChart3, component: Baselines },
    alerts: { label: 'Alerts', icon: AlertCircle, component: Alerts },
    settings: { label: 'Settings', icon: SettingsIcon, component: SettingsPage },
  };

  const CurrentPage = pages[currentPage].component;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                🧬
              </div>
              <h1 className="text-xl font-bold text-gray-900">HealthOptyx</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {Object.entries(pages).map(([key, page]) => {
            const Icon = page.icon;
            return (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === key
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{page.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Subject Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 font-semibold">SUBJECT</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{subjectId}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <h2 className="text-2xl font-bold text-gray-900">{pages[currentPage].label}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {currentPage === 'overview' && 'Real-time glucose monitoring and status'}
            {currentPage === 'trends' && '7-day, 30-day, and 90-day glucose trends'}
            {currentPage === 'baselines' && 'Personalized baseline ranges and targets'}
            {currentPage === 'alerts' && 'Alerts and warnings (placeholder for algorithm integration)'}
            {currentPage === 'settings' && 'Dashboard and data preferences'}
          </p>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          <CurrentPage subjectId={subjectId} />
        </div>
      </div>
    </div>
  );
}
