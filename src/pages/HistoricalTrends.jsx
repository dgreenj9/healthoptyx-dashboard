import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { getGlucose } from '../api';

export default function HistoricalTrends({ subjectId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('7d'); // 7d, 30d, 90d

  const fetchData = async () => {
    try {
      setLoading(true);
      const now = new Date();
      let start;

      switch (period) {
        case '7d':
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      }

      const response = await getGlucose(subjectId, start, now);
      
      // Aggregate data by day for longer periods
      const aggregatedData = {};
      response.data.forEach((point) => {
        const date = new Date(point.timestamp);
        const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        if (!aggregatedData[dateKey]) {
          aggregatedData[dateKey] = { date: dateKey, min: Infinity, max: -Infinity, avg: 0, count: 0, sum: 0 };
        }
        
        aggregatedData[dateKey].min = Math.min(aggregatedData[dateKey].min, point.value_mg_dl);
        aggregatedData[dateKey].max = Math.max(aggregatedData[dateKey].max, point.value_mg_dl);
        aggregatedData[dateKey].sum += point.value_mg_dl;
        aggregatedData[dateKey].count += 1;
      });

      const formattedData = Object.values(aggregatedData).map((day) => ({
        ...day,
        avg: (day.sum / day.count).toFixed(1),
      }));

      setData(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching historical data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subjectId, period]);

  const stats = {
    avgMin: data.length > 0 ? (data.reduce((sum, d) => sum + parseFloat(d.min), 0) / data.length).toFixed(1) : '—',
    avgMax: data.length > 0 ? (data.reduce((sum, d) => sum + parseFloat(d.max), 0) / data.length).toFixed(1) : '—',
    avgAvg: data.length > 0 ? (data.reduce((sum, d) => sum + parseFloat(d.avg), 0) / data.length).toFixed(1) : '—',
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-semibold">Error Loading Data</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex gap-2">
        {['7d', '30d', '90d'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              period === p
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Average Daily Low</p>
          <p className="text-green-600 text-3xl font-bold mt-2">{stats.avgMin}</p>
          <p className="text-gray-500 text-xs mt-1">mg/dL</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Average Daily Mean</p>
          <p className="text-blue-600 text-3xl font-bold mt-2">{stats.avgAvg}</p>
          <p className="text-gray-500 text-xs mt-1">mg/dL</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm font-semibold">Average Daily High</p>
          <p className="text-orange-600 text-3xl font-bold mt-2">{stats.avgMax}</p>
          <p className="text-gray-500 text-xs mt-1">mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Range & Average</h3>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading trend data...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No data available for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
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
                formatter={(value) => `${value} mg/dL`}
              />
              <Legend />
              <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target (100)', position: 'right', fontSize: 11, fill: '#10b981' }} />
              <ReferenceLine y={180} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'High (180)', position: 'right', fontSize: 11, fill: '#f97316' }} />
              <Line type="monotone" dataKey="max" stroke="#f97316" dot={false} strokeWidth={1.5} name="Daily High" isAnimationActive={false} />
              <Line type="monotone" dataKey="avg" stroke="#3b82f6" dot={false} strokeWidth={2.5} name="Daily Average" isAnimationActive={false} />
              <Line type="monotone" dataKey="min" stroke="#10b981" dot={false} strokeWidth={1.5} name="Daily Low" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
