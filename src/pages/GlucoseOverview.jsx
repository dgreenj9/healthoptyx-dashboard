import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, TrendingUp, Clock } from 'lucide-react';
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
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours

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
      console.error('Error fetching glucose data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Poll every 5 minutes
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
    if (value < 70) return { label: 'Low', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    if (value < 100) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (value < 180) return { label: 'Normal', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    return { label: 'High', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error Loading Data</p>
        <p className="text-sm">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading glucose data...</div>;
  }

  const status = latest ? getGlucoseStatus(latest.value_mg_dl) : null;
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const avg = (data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Current Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Current Reading */}
        {latest && (
          <div className={`${status.bg} ${status.border} border-2 rounded-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-semibold">Current Glucose</p>
                <p className={`${status.color} text-3xl font-bold mt-2`}>{latest.value_mg_dl}</p>
                <p className="text-gray-600 text-xs mt-1">mg/dL</p>
              </div>
              <div className={`${status.color} text-4xl`}>{getTrendEmoji(latest.trend_arrow)}</div>
            </div>
            <p className={`${status.color} text-xs font-semibold mt-3`}>{status.label}</p>
          </div>
        )}

        {/* Average */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm font-semibold">24h Average</p>
          <p className="text-blue-600 text-3xl font-bold mt-2">{avg}</p>
          <p className="text-gray-600 text-xs mt-1">mg/dL</p>
        </div>

        {/* Min */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm font-semibold">24h Low</p>
          <p className="text-green-600 text-3xl font-bold mt-2">{min}</p>
          <p className="text-gray-600 text-xs mt-1">mg/dL</p>
        </div>

        {/* Max */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm font-semibold">24h High</p>
          <p className="text-orange-600 text-3xl font-bold mt-2">{max}</p>
          <p className="text-gray-600 text-xs mt-1">mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">24-Hour Glucose Trend</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={14} />
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval={Math.floor(data.length / 6)}
            />
            <YAxis
              domain={[60, 200]}
              label={{ value: 'mg/dL', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '8px',
              }}
              formatter={(value) => [`${value} mg/dL`, 'Glucose']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            {/* Reference lines for zones */}
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Low (70)', position: 'right', fontSize: 11, fill: '#ef4444' }} />
            <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target (100)', position: 'right', fontSize: 11, fill: '#10b981' }} />
            <ReferenceLine y={180} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'High (180)', position: 'right', fontSize: 11, fill: '#f97316' }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data Quality Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>📊 Data:</strong> Displaying {data.length} glucose readings from the past 24 hours (sandbox Dexcom data).
          All readings marked as "{latest?.quality || 'good'}" quality.
        </p>
      </div>
    </div>
  );
}
