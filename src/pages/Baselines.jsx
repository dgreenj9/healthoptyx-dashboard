import React from 'react';
import { AlertCircle, Heart, Activity, Thermometer, Clock, Zap } from 'lucide-react';

export default function Baselines() {
  const baselineCards = [
    {
      icon: Heart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'HRV Baseline',
      subtitle: 'Heart Rate Variability (SDNN)',
      status: 'Waiting for VivaLink ECG patch',
      metric: '— ms',
    },
    {
      icon: Activity,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      title: 'Resting Heart Rate',
      subtitle: 'Beats per minute',
      status: 'Waiting for VivaLink ECG patch',
      metric: '— bpm',
    },
    {
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Fasting Glucose',
      subtitle: 'Baseline blood sugar',
      status: '✓ Dexcom CGM connected',
      metric: '— mg/dL',
    },
    {
      icon: Thermometer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Core Temperature',
      subtitle: 'Body temperature',
      status: 'Waiting for VivaLink sensor',
      metric: '— °C',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
        <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900">Algorithm Integration Pending</p>
          <p className="text-sm text-amber-800 mt-2">
            Baselines require VivaLink ECG + Dexcom CGM. Once algorithms are implemented, personalized baselines will auto-compute here.
          </p>
        </div>
      </div>

      {/* Baseline Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {baselineCards.map((card, idx) => {
          const Icon = card.icon;
          const isConnected = card.status.includes('✓');
          return (
            <div key={idx} className="card p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                  <div className={`${card.bgColor} p-3 rounded-lg`}>
                    <Icon size={20} className={card.color} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{card.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{card.subtitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className={`p-3 rounded-lg ${isConnected ? 'bg-green-50' : 'bg-slate-50'}`}>
                  <p className={`text-xs font-semibold ${isConnected ? 'text-green-700' : 'text-slate-600'}`}>
                    {isConnected ? '✓ Connected' : 'Status'}
                  </p>
                  <p className={`text-sm mt-1 ${isConnected ? 'text-green-700' : 'text-slate-500'}`}>
                    {card.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Current Value</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{card.metric}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calibration Section */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <Clock size={24} className="text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-indigo-900 text-lg">Calibration Protocol</h3>
            <p className="text-sm text-indigo-800 mt-1">Follow these steps to establish your personal baselines</p>
          </div>
        </div>

        <ol className="space-y-3 text-sm text-indigo-900">
          {[
            'Wear VivaLink ECG patch (when available)',
            'Ensure Dexcom CGM is active and syncing',
            'Perform structured morning assessment (resting, seated, fasted)',
            'Dashboard auto-computes baselines after first calibration',
          ].map((step, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="font-bold flex-shrink-0 w-6 h-6 rounded-full bg-indigo-200 text-indigo-900 flex items-center justify-center text-xs">
                {idx + 1}
              </span>
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Algorithm Integration Roadmap */}
      <div className="card p-8">
        <h3 className="font-bold text-slate-900 text-lg mb-6">Algorithms Using Baselines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { code: 'GPIP', name: 'Glucose-Perfusion Inflection' },
            { code: 'CRI', name: 'Compensatory Reserve Index' },
            { code: 'AMC', name: 'Autonomic-Metabolic Coherence' },
            { code: 'IDS', name: 'Integrated Deterioration Score' },
            { code: 'ORI', name: 'Operator Readiness Index' },
          ].map((algo) => (
            <div key={algo.code} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <Zap size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{algo.code}</p>
                <p className="text-xs text-slate-500 mt-0.5">{algo.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
