import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Clock, Activity, Zap } from 'lucide-react';
import { getGlucose, getLatestGlucose } from '../api';

export default function GlucoseOverview({ subjectId }) {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const [glucoseRes, latestRes] = await Promise.all([
        getGlucose(subjectId, start, now),
        getLatestGlucose(subjectId),
      ]);

      const formattedData = glucoseRes.data.map((point) => ({
        timestamp: new Date(point.timestamp).getTime(),
        time: new Date(point.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        value: point.value_mg_dl,
        trend: point.trend_arrow,
        quality: point.quality,
      }));

      setData(formattedData);
      setLatest(latestRes.data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [subjectId]);

  const getTrendEmoji = (trend) => {
    const trendMap = {
      'DoubleUp': '⬆️⬆️',
      'SingleUp': '⬆️',
      'FortyFiveUp': '↗️',
      'Flat': '→',
      'FortyFiveDown': '↘️',
      'SingleDown': '⬇️',
      'DoubleDown': '⬇️⬇️',
      'None': '→',
    };
    return trendMap[trend] || '→';
  };

  const getGlucoseStatus = (value) => {
    if (value < 70) return { label: 'Low', color: '#ef4444', bgColor: '#fef2f2', textColor: '#991b1b' };
    if (value < 100) return { label: 'Good', color: '#10b981', bgColor: '#ecfdf5', textColor: '#065f46' };
    if (value < 180) return { label: 'Normal', color: '#6366f1', bgColor: '#eef2ff', textColor: '#3730a3' };
    return { label: 'High', color: '#f59e0b', bgColor: '#fffbeb', textColor: '#92400e' };
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">Error Loading Data</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading your glucose data...</p>
        </div>
      </div>
    );
  }

  const status = latest ? getGlucoseStatus(latest.value_mg_dl) : null;
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const avg = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Current Reading - Hero Card */}
      {latest && (
        <div className="card overflow-hidden" style={{ backgroundColor: status.bgColor, borderColor: status.color }}>
          <div className="p-8 md:p-12 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: status.textColor }}>Current Glucose</p>
              <div className="flex items-baseline gap-2 mt-4">
                <p className="text-5xl md:text-6xl font-bold" style={{ color: status.textColor }}>{latest.value_mg_dl}</p>
                <p className="text-2xl" style={{ color: status.textColor }}>mg/dL</p>
              </div>
              <p className="mt-4 font-semibold" style={{ color: status.textColor }}>{status.label}</p>
            </div>
            <div className="text-7xl opacity-80 animate-bounce">{getTrendEmoji(latest.trend_arrow)}</div>
          </div>
          <div className="px-8 md:px-12 pb-6 border-t" style={{ borderColor: status.color, opacity: 0.3 }}>
            <div className="flex items-center gap-6 text-sm" style={{ color: status.textColor }}>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} />
                <span>Quality: {latest.quality}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Min */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">24h Low</span>
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp size={18} className="text-green-600" />
            </div>
          </div>
          <p className="stat-value text-green-600">{min}</p>
          <p className="text-muted">mg/dL</p>
        </div>

        {/* Average */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">24h Average</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Activity size={18} className="text-indigo-600" />
            </div>
          </div>
          <p className="stat-value text-indigo-600">{avg}</p>
          <p className="text-muted">mg/dL</p>
        </div>

        {/* Max */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">24h High</span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp size={18} className="text-amber-600" />
            </div>
          </div>
          <p className="stat-value text-amber-600">{max}</p>
          <p className="text-muted">mg/dL</p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="card p-8 md:p-12">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900">Glucose Trend</h3>
          <p className="text-slate-500 text-sm mt-1">{data.length} readings across 24 hours</p>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              interval={Math.floor(data.length / 6)}
              stroke="#e5e7eb"
            />
            <YAxis
              domain={[60, 200]}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              stroke="#e5e7eb"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }}
              formatter={(value) => [`${value} mg/dL`, 'Glucose']}
            />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" opacity={0.3} />
            <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" opacity={0.3} />
            <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              dot={false}
              strokeWidth={3}
              isAnimationActive={false}
              fill="url(#glucoseGradient)"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-red-500"></div>
            <span className="text-slate-600">Low (70 mg/dL)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-green-500"></div>
            <span className="text-slate-600">Target (100 mg/dL)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-amber-500"></div>
            <span className="text-slate-600">High (180 mg/dL)</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Zap size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-900">
          <p className="font-semibold">Sandbox Data Active</p>
          <p className="text-blue-800 mt-1">{data.length} readings from Dexcom sandbox. Real wearable data integration coming soon.</p>
        </div>
      </div>
    </div>
  );
}
