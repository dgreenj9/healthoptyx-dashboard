import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

export default function Baselines() {
  return (
    <div className="space-y-6">
      {/* Alert */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg flex gap-3">
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Placeholder: Algorithm Integration Pending</p>
          <p className="text-sm">
            Baselines require a 30+ minute calibration period with VivaLink ECG and Dexcom CGM data. 
            Once algorithms (GPIP, CRI, AMC) are implemented and receiving real wearable inputs, personalized baselines will be computed and displayed here.
          </p>
        </div>
      </div>

      {/* Expected Baseline Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Baseline Metrics</h3>
        <p className="text-gray-600 text-sm mb-4">
          When baseline calibration is complete, the dashboard will display your personalized ranges:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* HRV Baseline */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">HRV Baseline (SDNN)</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Baseline:</span> <span className="text-gray-400">— ms</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Zone:</span> <span className="text-gray-400">Not calibrated</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Quality:</span> <span className="text-gray-400">Waiting for VivaLink</span>
              </p>
            </div>
          </div>

          {/* Heart Rate Baseline */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Resting Heart Rate</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Baseline:</span> <span className="text-gray-400">— bpm</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Zone:</span> <span className="text-gray-400">Not calibrated</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Quality:</span> <span className="text-gray-400">Waiting for VivaLink</span>
              </p>
            </div>
          </div>

          {/* Glucose Baseline */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Fasting Glucose</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Baseline:</span> <span className="text-gray-400">— mg/dL</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Range:</span> <span className="text-gray-400">Not calibrated</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span> <span className="text-amber-600 font-semibold">Dexcom ✓</span>
              </p>
            </div>
          </div>

          {/* Temperature Baseline */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Core Temperature</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Baseline:</span> <span className="text-gray-400">— °C</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Gradient:</span> <span className="text-gray-400">Not calibrated</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Quality:</span> <span className="text-gray-400">Waiting for VivaLink</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calibration Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <Clock size={18} />
          How to Calibrate Baselines
        </h3>
        <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
          <li>Wear VivaLink ECG patch (when available)</li>
          <li>Ensure Dexcom CGM is active and syncing</li>
          <li>Perform a structured morning assessment:
            <ul className="list-disc list-inside ml-4 mt-1 text-xs">
              <li>Resting, seated, upon waking</li>
              <li>Fasted (no food for 2+ hours)</li>
              <li>5-minute stable recording for HRV</li>
            </ul>
          </li>
          <li>Dashboard will auto-compute baseline after first calibration</li>
          <li>Baselines will auto-update as more data accumulates</li>
        </ol>
      </div>

      {/* Algorithm Integration Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Algorithm Integration</h3>
        <p className="text-sm text-gray-700 mb-3">
          Once VivaLink ECG patch is integrated, the following algorithms will use these baselines:
        </p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>✓ <strong>GPIP</strong> — Glucose-Perfusion Inflection detection</li>
          <li>✓ <strong>CRI</strong> — Compensatory Reserve Index calculation</li>
          <li>✓ <strong>AMC</strong> — Autonomic-Metabolic Coherence analysis</li>
          <li>✓ <strong>IDS</strong> — Integrated Deterioration Score</li>
          <li>✓ <strong>ORI</strong> — Operator Readiness Index</li>
        </ul>
      </div>
    </div>
  );
}
