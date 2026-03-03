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
      action: 'Aggressive fluid resuscitation, hemorrhage control check, prepare blood products',
      icon: AlertTriangle,
    },
    {
      id: 'cri',
      name: 'CRI Alert',
      subtitle: 'Compensatory Reserve Index Low',
      severity: 'warning',
      trigger: 'Compensatory Reserve Index drops below 40 (critical threshold)',
      significance: "Body's compensatory mechanisms (tachycardia, vasoconstriction) near exhaustion",
      action: 'Immediate fluid resuscitation, expedite MEDEVAC, prepare for hemodynamic instability',
      icon: AlertTriangle,
    },
    {
      id: 'amc',
      name: 'AMC Alert',
      subtitle: 'Autonomic-Metabolic Decoupling',
      severity: 'warning',
      trigger: 'Autonomic and metabolic systems not responding together as expected',
      significance: 'Signals hidden pathology—perfusion failure, hepatic hypoperfusion, occult hemorrhage',
      action: 'Investigate source of decoupling; reassess hemorrhage control and perfusion status',
      icon: AlertCircle,
    },
    {
      id: 'sepsis',
      name: 'Sepsis Alert',
      subtitle: 'Trajectory Predictor',
      severity: 'critical',
      trigger: 'At 12+ hours post-injury, 3+ parameters show worsening trajectory',
      significance: 'Detects deviation from normal post-trauma recovery toward sepsis development',
      action: 'Empiric broad-spectrum antibiotics, abdominal reassessment, increased fluid resuscitation',
      icon: AlertTriangle,
    },
    {
      id: 'ori',
      name: 'ORI Alert',
      subtitle: 'Low Operator Readiness Index',
      severity: 'info',
      trigger: 'Operator Readiness Index drops below 60',
      significance: 'Operator may not be optimally prepared for mission or training',
      action: 'Additional rest, medical evaluation if persistent, potential mission delay',
      icon: Info,
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' };
      case 'warning':
        return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' };
      case 'info':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Placeholder Notice */}
      <div className={`card border rounded-xl p-4 flex gap-3 bg-yellow-50 border-yellow-200`}>
        <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-yellow-900">Placeholder: Algorithm Alerts Pending</p>
          <p className="text-sm text-yellow-800 mt-1">
            Once VivaLink ECG + algorithms are implemented, real-time alerts will appear here.
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
            <div key={alert.id} className={`card border-l-4 rounded-xl overflow-hidden hover:shadow-md transition-all ${colors.bg} ${colors.border}`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 bg-white rounded-lg mt-1`}>
                      <Icon size={20} className={colors.text} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${colors.text}`}>{alert.name}</h4>
                      <p className={`text-sm ${colors.text} opacity-80`}>{alert.subtitle}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">Trigger</p>
                    <p className="text-slate-700 mt-1">{alert.trigger}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Significance</p>
                    <p className="text-slate-700 mt-1">{alert.significance}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Recommended Action</p>
                    <p className="text-slate-700 mt-1">{alert.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Timeline */}
      <div className="card p-6 md:p-8">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock size={20} />
          Implementation Timeline
        </h3>
        <div className="space-y-3">
          {[
            { week: 'Week 1', task: 'Core GPIP, CRI, AMC algorithms with test data' },
            { week: 'Week 2', task: 'IDS aggregation + dashboard alert rendering' },
            { week: 'Week 3', task: 'VivaLink ECG integration + live algorithm evaluation' },
            { week: 'Week 4', task: 'ORI + garrison readiness features' },
          ].map((item) => (
            <div key={item.week} className="flex gap-4 p-3 bg-slate-50 rounded-lg">
              <span className="font-semibold text-blue-600 min-w-fit">{item.week}</span>
              <span className="text-slate-700">{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
