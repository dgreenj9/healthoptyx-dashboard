import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Clock, Zap, Activity } from 'lucide-react';
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
    if (value < 70) return { label: 'Low', color: 'from-red-500 to-red-600', textColor: 'text-red-700', bgColor: 'bg-red-50', icon: '⚠️' };
    if (value < 100) return { label: 'Good', color: 'from-green-500 to-green-600', textColor: 'text-green-700', bgColor: 'bg-green-50', icon: '✓' };
    if (value < 180) return { label: 'Normal', color: 'from-blue-500 to-blue-600', textColor: 'text-blue-700', bgColor: 'bg-blue-50', icon: '●' };
    return { label: 'High', color: 'from-amber-500 to-amber-600', textColor: 'text-amber-700', bgColor: 'bg-amber-50', icon: '⚠️' };
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">Error Loading Data</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  const status = latest ? getGlucoseStatus(latest.value_mg_dl) : null;
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const avg = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Current Status - Large Card */}
      {latest && (
        <div className={`card bg-gradient-to-br ${status.color} p-8 text-white shadow-lg border-0`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">Current Glucose</p>
              <p className="text-6xl font-bold mb-2">{latest.value_mg_dl}</p>
              <p className="text-white/70 text-sm">mg/dL • {status.label}</p>
            </div>
            <div className="text-5xl text-white/80 animate-bounce">{getTrendEmoji(latest.trend_arrow)}</div>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={16} />
              <span>Quality: {latest.quality}</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Min */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-600 text-sm font-medium">24h Low</p>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp size={18} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{min}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>

        {/* Average */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-600 text-sm font-medium">24h Average</p>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity size={18} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{avg}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>

        {/* Max */}
        <div className="card p-6 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-600 text-sm font-medium">24h High</p>
            <div className="p-2 bg-amber-100 rounded-lg">
              <TrendingUp size={18} className="text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{max}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">24-Hour Trend</h3>
          <p className="text-sm text-slate-500 mt-1">{data.length} readings • Updated {lastUpdate.toLocaleTimeString()}</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066cc" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0066cc" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: '#64748b' }}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              domain={[60, 200]}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
              cursor={{ strokeDasharray: '3 3', stroke: '#64748b' }}
              formatter={(value) => [`${value} mg/dL`, 'Glucose']}
            />
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.5} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0066cc"
              dot={false}
              strokeWidth={3}
              isAnimationActive={false}
              fill="url(#glucoseGradient)"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-6 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span className="text-slate-600">Low (70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-slate-600">Target (100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-amber-500"></div>
            <span className="text-slate-600">High (180)</span>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-blue-700">📊 Data:</span> {data.length} glucose readings from sandbox Dexcom. All readings marked as "{latest?.quality}" quality.
        </p>
      </div>
    </div>
  );
}
