import React from 'react';
import { AlertCircle, Clock, Activity, Heart, Thermometer } from 'lucide-react';

export default function Baselines() {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 px-6 py-4 rounded-xl flex gap-3">
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-amber-600" />
        <div>
          <p className="font-semibold">Algorithm Integration Pending</p>
          <p className="text-sm mt-1 text-amber-800">
            Baselines require VivaLink ECG + Dexcom CGM. Once algorithms are implemented, personalized baselines will auto-compute here.
          </p>
        </div>
      </div>

      {/* Expected Baseline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* HRV Baseline */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Heart size={20} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">HRV Baseline</h4>
              <p className="text-xs text-slate-500">Heart Rate Variability (SDNN)</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Status</p>
              <p className="text-sm text-slate-500 mt-1">Waiting for VivaLink ECG patch</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-slate-600">
                <span className="font-semibold">Baseline:</span>
                <p className="text-slate-400">— ms</p>
              </div>
              <div className="text-slate-600">
                <span className="font-semibold">Zone:</span>
                <p className="text-slate-400">Not calibrated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Heart Rate Baseline */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Activity size={20} className="text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Resting Heart Rate</h4>
              <p className="text-xs text-slate-500">Beats per minute</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Status</p>
              <p className="text-sm text-slate-500 mt-1">Waiting for VivaLink ECG patch</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-slate-600">
                <span className="font-semibold">Baseline:</span>
                <p className="text-slate-400">— bpm</p>
              </div>
              <div className="text-slate-600">
                <span className="font-semibold">Range:</span>
                <p className="text-slate-400">Not calibrated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glucose Baseline */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Fasting Glucose</h4>
              <p className="text-xs text-slate-500">Baseline blood sugar</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium">✓ Active</p>
              <p className="text-sm text-green-700 mt-1">Dexcom CGM connected</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-slate-600">
                <span className="font-semibold">Baseline:</span>
                <p className="text-slate-400">— mg/dL</p>
              </div>
              <div className="text-slate-600">
                <span className="font-semibold">Range:</span>
                <p className="text-slate-400">Not calibrated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Baseline */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Thermometer size={20} className="text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Core Temperature</h4>
              <p className="text-xs text-slate-500">Body temperature</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 font-medium">Status</p>
              <p className="text-sm text-slate-500 mt-1">Waiting for VivaLink sensor</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-slate-600">
                <span className="font-semibold">Baseline:</span>
                <p className="text-slate-400">— °C</p>
              </div>
              <div className="text-slate-600">
                <span className="font-semibold">Gradient:</span>
                <p className="text-slate-400">Not calibrated</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calibration Instructions */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Clock size={20} />
          How to Calibrate Baselines
        </h3>
        <ol className="space-y-3 text-sm text-blue-900 list-decimal list-inside">
          <li className="font-medium">Wear VivaLink ECG patch (when available)</li>
          <li className="font-medium">Ensure Dexcom CGM is active and syncing</li>
          <li className="font-medium">
            Perform structured morning assessment:
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 font-normal">
              <li>Resting, seated, upon waking</li>
              <li>Fasted (no food for 2+ hours)</li>
              <li>5-minute stable recording</li>
            </ul>
          </li>
          <li className="font-medium">Dashboard auto-computes baselines</li>
        </ol>
      </div>

      {/* Algorithm Integration */}
      <div className="card p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Algorithm Integration Roadmap</h3>
        <div className="space-y-3">
          {[
            { name: 'GPIP', desc: 'Glucose-Perfusion Inflection Point' },
            { name: 'CRI', desc: 'Compensatory Reserve Index' },
            { name: 'AMC', desc: 'Autonomic-Metabolic Coherence' },
            { name: 'IDS', desc: 'Integrated Deterioration Score' },
            { name: 'ORI', desc: 'Operator Readiness Index' },
          ].map((algo) => (
            <div key={algo.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              <div>
                <p className="font-medium text-slate-900">{algo.name}</p>
                <p className="text-xs text-slate-500">{algo.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
