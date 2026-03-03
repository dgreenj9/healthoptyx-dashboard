import React, { useState } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  const [formData, setFormData] = useState({
    subjectId: 'daniel',
    glucoseLowThreshold: 70,
    glucoseHighThreshold: 180,
    refreshInterval: 5,
    theme: 'light',
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
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg flex items-center gap-2">
          <span>✓</span>
          <span className="text-sm font-semibold">Settings saved successfully</span>
        </div>
      )}

      {/* Data Source Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <SettingsIcon size={20} />
          Data & Connectivity
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject ID
            </label>
            <input
              type="text"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Internal identifier for this subject (e.g., "daniel", "patient-001")</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Refresh Interval
            </label>
            <select
              name="refreshInterval"
              value={formData.refreshInterval}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>Every 1 minute</option>
              <option value={5}>Every 5 minutes</option>
              <option value={10}>Every 10 minutes</option>
              <option value={15}>Every 15 minutes</option>
              <option value={30}>Every 30 minutes</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">How often the dashboard polls the API for new glucose data</p>
          </div>
        </div>
      </div>

      {/* Glucose Thresholds */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Glucose Thresholds</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Low Glucose Threshold
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="glucoseLowThreshold"
                value={formData.glucoseLowThreshold}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-600">mg/dL</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Readings below this value are marked as "Low"</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              High Glucose Threshold
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="glucoseHighThreshold"
                value={formData.glucoseHighThreshold}
                onChange={handleChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-sm text-gray-600">mg/dL</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Readings above this value are marked as "High"</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Theme
          </label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark (coming soon)</option>
            <option value="auto">Auto (system preference)</option>
          </select>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Data Source Information</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>API Endpoint:</strong> <code className="bg-white px-2 py-1 rounded text-xs">http://127.0.0.1:8000</code>
          </p>
          <p>
            <strong>Current Subject:</strong> <span className="font-semibold">{formData.subjectId}</span>
          </p>
          <p>
            <strong>Data Source:</strong> Dexcom Sandbox (for now)
          </p>
          <p className="text-xs mt-2">
            When deployed to Vercel, you'll need to update the API endpoint to point to a deployed backend (Heroku, Railway, AWS, etc.).
          </p>
        </div>
      </div>

      {/* Algorithm Placeholders */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Algorithm Configuration (Placeholder)</h3>
        <p className="text-sm text-gray-700 mb-4">
          Once algorithms are implemented, you'll be able to configure thresholds for:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✓ GPIP (Glucose-Perfusion Inflection) — confidence threshold</li>
          <li>✓ CRI (Compensatory Reserve Index) — critical reserve level</li>
          <li>✓ AMC (Autonomic-Metabolic Coherence) — coherence floor</li>
          <li>✓ IDS (Integrated Deterioration Score) — alert thresholds</li>
          <li>✓ ORI (Operator Readiness Index) — minimum acceptable readiness</li>
        </ul>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
