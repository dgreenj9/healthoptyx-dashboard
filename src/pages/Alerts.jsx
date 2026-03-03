import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

export default function Alerts() {
  return (
    <div className="space-y-6">
      {/* Placeholder Notice */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg flex gap-3">
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Placeholder: Algorithm Alerts Pending</p>
          <p className="text-sm">
            Alert generation requires GPIP, CRI, AMC, IDS, and other algorithms to be implemented and receiving real wearable data (VivaLink ECG + Dexcom CGM). 
            Once integrated, real-time alerts will appear here.
          </p>
        </div>
      </div>

      {/* Expected Alert Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Expected Alert Types</h3>

        {/* GPIP Alert */}
        <div className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow">
          <div className="flex gap-3">
            <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">GPIP Alert (Glucose-Perfusion Inflection)</h4>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Trigger:</strong> Glucose trend shifts from rising to falling while HRV remains suppressed or heart rate elevated.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Significance:</strong> Potential transition from compensated to decompensating shock (10–30 min before vital sign collapse).
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Recommended Action:</strong> Aggressive fluid resuscitation, hemorrhage control check, prepare blood products.
              </p>
            </div>
          </div>
        </div>

        {/* CRI Alert */}
        <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4 shadow">
          <div className="flex gap-3">
            <AlertTriangle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">CRI Alert (Compensatory Reserve Low)</h4>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Trigger:</strong> Compensatory Reserve Index drops below 40 (critical threshold from Convertino et al. 2023).
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Significance:</strong> Body's compensatory mechanisms (tachycardia, vasoconstriction, catecholamine release) are near exhaustion.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Recommended Action:</strong> Immediate fluid resuscitation, expedite MEDEVAC, prepare for hemodynamic instability.
              </p>
            </div>
          </div>
        </div>

        {/* AMC Alert */}
        <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-4 shadow">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">AMC Alert (Autonomic-Metabolic Decoupling)</h4>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Trigger:</strong> Autonomic and metabolic systems are not responding as expected together (e.g., sympathetic activation without glucose rise).
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Significance:</strong> Signals hidden pathology—perfusion failure, hepatic hypoperfusion, or occult hemorrhage.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Recommended Action:</strong> Investigate source of decoupling; reassess hemorrhage control and perfusion status.
              </p>
            </div>
          </div>
        </div>

        {/* Sepsis Alert */}
        <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4 shadow">
          <div className="flex gap-3">
            <AlertTriangle size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Sepsis Alert (Trajectory Predictor)</h4>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Trigger:</strong> At 12+ hours post-injury, 3+ parameters show worsening trajectory (HRV not improving, HR persistent, glucose rising, temperature drifting).
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Significance:</strong> Detects deviation from normal post-trauma recovery toward sepsis development.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Recommended Action:</strong> Empiric broad-spectrum antibiotics, abdominal reassessment, increased fluid resuscitation.
              </p>
            </div>
          </div>
        </div>

        {/* ORI Alert */}
        <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow">
          <div className="flex gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">ORI Alert (Low Readiness Index)</h4>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Trigger:</strong> Operator Readiness Index drops below 60 (inadequate recovery, high fatigue, or illness).
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Significance:</strong> Operator may not be optimally prepared for mission or training.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Recommended Action:</strong> Additional rest, medical evaluation if persistent, potential mission delay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Status */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Implementation Timeline</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <span className="inline-block w-24 font-semibold">Week 1:</span>
            Core GPIP, CRI, AMC algorithms implemented with test data
          </li>
          <li>
            <span className="inline-block w-24 font-semibold">Week 2:</span>
            IDS aggregation + dashboard alert rendering
          </li>
          <li>
            <span className="inline-block w-24 font-semibold">Week 3:</span>
            VivaLink ECG integration + live algorithm evaluation
          </li>
          <li>
            <span className="inline-block w-24 font-semibold">Week 4:</span>
            ORI + garrison readiness features
          </li>
        </ul>
      </div>
    </div>
  );
}
