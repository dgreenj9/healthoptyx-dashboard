import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import { getGlucose } from '../api';

export default function HistoricalTrends({ subjectId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('7d');

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
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        <p className="font-semibold">Error Loading Data</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex gap-3">
        {[
          { value: '7d', label: '7 Days' },
          { value: '30d', label: '30 Days' },
          { value: '90d', label: '90 Days' },
        ].map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              period === p.value
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-6 border-l-4 border-l-green-500 hover:shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Avg Daily Low</p>
            <TrendingUp size={18} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.avgMin}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>
        <div className="card p-6 border-l-4 border-l-blue-500 hover:shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Avg Daily Mean</p>
            <Calendar size={18} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.avgAvg}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>
        <div className="card p-6 border-l-4 border-l-amber-500 hover:shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600 text-sm font-medium">Avg Daily High</p>
            <TrendingUp size={18} className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.avgMax}</p>
          <p className="text-xs text-slate-500 mt-1">mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-6 md:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Daily Range & Average</h3>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No data available for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
              <defs>
                <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066cc" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0066cc" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
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
                formatter={(value) => `${value} mg/dL`}
              />
              <Legend />
              <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" opacity={0.5} />
              <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.5} />
              <Line type="monotone" dataKey="max" stroke="#f59e0b" dot={false} strokeWidth={2} name="Daily High" isAnimationActive={false} />
              <Line type="monotone" dataKey="avg" stroke="#0066cc" dot={false} strokeWidth={3} name="Daily Average" isAnimationActive={false} fill="url(#avgGradient)" />
              <Line type="monotone" dataKey="min" stroke="#10b981" dot={false} strokeWidth={2} name="Daily Low" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
