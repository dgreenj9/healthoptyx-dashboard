import React from 'react';
import { AlertCircle, AlertTriangle, Info, Clock } from 'lucide-react';

export default function Alerts() {
  const alertTypes = [
    {
      id: 'gpip',
      name: 'GPIP Alert',
      subtitle: 'Glucose-Perfusion Inflection Point',
      severity: 'critical',
      trigger: 'Glucose trend shifts from rising to falling while HRV suppressed or HR elevated',
      significance: 'Potential transition from compensated to decompensating shock (10–30 min early warning)',
      icon: AlertTriangle,
    },
    {
      id: 'cri',
      name: 'CRI Alert',
      subtitle: 'Compensatory Reserve Index Low',
      severity: 'warning',
      trigger: 'Compensatory Reserve Index drops below 40 (critical threshold)',
      significance: "Body's compensatory mechanisms near exhaustion",
      icon: AlertTriangle,
    },
    {
      id: 'amc',
      name: 'AMC Alert',
      subtitle: 'Autonomic-Metabolic Decoupling',
      severity: 'warning',
      trigger: 'Autonomic and metabolic systems not responding together as expected',
      significance: 'Signals hidden pathology—perfusion failure or occult hemorrhage',
      icon: AlertCircle,
    },
    {
      id: 'sepsis',
      name: 'Sepsis Alert',
      subtitle: 'Trajectory Predictor',
      severity: 'critical',
      trigger: 'At 12+ hours post-injury, 3+ parameters show worsening trajectory',
      significance: 'Detects deviation from normal post-trauma recovery toward sepsis',
      icon: AlertTriangle,
    },
    {
      id: 'ori',
      name: 'ORI Alert',
      subtitle: 'Low Operator Readiness Index',
      severity: 'info',
      trigger: 'Operator Readiness Index drops below 60',
      significance: 'Operator may not be optimally prepared for mission or training',
      icon: Info,
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', badge: '#fee2e2', badgeText: '#991b1b' };
      case 'warning':
        return { bg: '#fffbeb', border: '#fde68a', text: '#92400e', badge: '#fef3c7', badgeText: '#92400e' };
      case 'info':
        return { bg: '#ecf9ff', border: '#a5f3fc', text: '#0c4a6e', badge: '#ecf9ff', badgeText: '#0c4a6e' };
      default:
        return { bg: '#f3f4f6', border: '#e5e7eb', text: '#374151', badge: '#f3f4f6', badgeText: '#374151' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Placeholder Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
        <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-900">Placeholder: Algorithm Alerts Pending</p>
          <p className="text-sm text-amber-800 mt-2">
            Once VivaLink ECG + algorithms are implemented, real-time alerts will appear here with live status updates and recommendations.
          </p>
        </div>
      </div>

      {/* Alert Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Expected Alert Types</h3>

        {alertTypes.map((alert) => {
          const Icon = alert.icon;
          const colors = getSeverityColor(alert.severity);
          return (
            <div key={alert.id} className="card overflow-hidden" style={{ borderColor: colors.border }}>
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div style={{ backgroundColor: colors.badge }} className="p-3 rounded-lg">
                      <Icon size={20} style={{ color: colors.text }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{alert.name}</h4>
                      <p style={{ color: colors.text }} className="text-sm">{alert.subtitle}</p>
                    </div>
                  </div>
                  <span style={{ backgroundColor: colors.badge, color: colors.badgeText }} className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    {alert.severity.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-600 tracking-wider">Trigger</p>
                    <p className="text-slate-700 text-sm mt-2">{alert.trigger}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-600 tracking-wider">Significance</p>
                    <p className="text-slate-700 text-sm mt-2">{alert.significance}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Timeline */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock size={20} className="text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-lg">Implementation Timeline</h3>
        </div>
        <div className="space-y-3">
          {[
            { week: 'Week 1', task: 'Core GPIP, CRI, AMC algorithms with test data' },
            { week: 'Week 2', task: 'IDS aggregation + dashboard alert rendering' },
            { week: 'Week 3', task: 'VivaLink ECG integration + live algorithm evaluation' },
            { week: 'Week 4', task: 'ORI + garrison readiness features' },
          ].map((item) => (
            <div key={item.week} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-indigo-600 min-w-fit">{item.week}</span>
              <span className="text-slate-700">{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
