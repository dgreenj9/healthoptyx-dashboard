import React, { useState } from 'react';
import { Save, Info, Server } from 'lucide-react';

export default function Settings() {
  const [formData, setFormData] = useState({
    subjectId: 'daniel',
    glucoseLowThreshold: 70,
    glucoseHighThreshold: 180,
    refreshInterval: 5,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }));
  };

  const handleSave = () => {
    localStorage.setItem('healthoptyx-settings', JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Save Notification */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl flex items-center gap-3 animate-slide-in">
          <span className="text-lg">✓</span>
          <span className="font-medium">Settings saved successfully</span>
        </div>
      )}

      {/* Data Source Settings */}
      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Server size={20} className="text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Data & Connectivity</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Subject ID
            </label>
            <input
              type="text"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-slate-500 mt-2">Internal identifier for this patient</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              API Refresh Interval
            </label>
            <select
              name="refreshInterval"
              value={formData.refreshInterval}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={1}>Every 1 minute</option>
              <option value={5}>Every 5 minutes</option>
              <option value={10}>Every 10 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">How often the dashboard polls for new glucose data</p>
          </div>
        </div>
      </div>

      {/* Glucose Thresholds */}
      <div className="card p-6 md:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Glucose Thresholds</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Low Glucose Threshold
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="glucoseLowThreshold"
                value={formData.glucoseLowThreshold}
                onChange={handleChange}
                className="w-32 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="text-sm font-medium text-slate-600">mg/dL</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Readings below this value are marked as "Low"</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              High Glucose Threshold
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="glucoseHighThreshold"
                value={formData.glucoseHighThreshold}
                onChange={handleChange}
                className="w-32 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <span className="text-sm font-medium text-slate-600">mg/dL</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Readings above this value are marked as "High"</p>
          </div>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6 flex gap-3">
        <Info size={20} className="text-slate-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Current Configuration</h4>
          <div className="space-y-1 text-sm text-slate-700">
            <p><span className="font-medium">API Endpoint:</span> http://127.0.0.1:8000</p>
            <p><span className="font-medium">Subject:</span> {formData.subjectId}</p>
            <p><span className="font-medium">Data Source:</span> Dexcom Sandbox</p>
            <p className="text-xs text-slate-600 mt-2">
              When you deploy the FastAPI backend to production, update the API endpoint in environment variables.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
