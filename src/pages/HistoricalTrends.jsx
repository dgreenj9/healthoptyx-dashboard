import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
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
    <div className="space-y-8">
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
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              period === p.value
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">Avg Daily Low</span>
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <TrendingUp size={18} className="text-green-600" />
            </div>
          </div>
          <p className="stat-value text-green-600">{stats.avgMin}</p>
          <p className="text-muted">mg/dL</p>
        </div>
        <div className="stat-card border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">Avg Daily Mean</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <BarChart3 size={18} className="text-indigo-600" />
            </div>
          </div>
          <p className="stat-value text-indigo-600">{stats.avgAvg}</p>
          <p className="text-muted">mg/dL</p>
        </div>
        <div className="stat-card border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-3">
            <span className="stat-label">Avg Daily High</span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp size={18} className="text-amber-600" />
            </div>
          </div>
          <p className="stat-value text-amber-600">{stats.avgMax}</p>
          <p className="text-muted">mg/dL</p>
        </div>
      </div>

      {/* Chart */}
      <div className="card p-8 md:p-12">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Daily Range & Average</h3>
        <p className="text-slate-500 text-sm mb-8">Showing {period === '7d' ? 'last 7 days' : period === '30d' ? 'last 30 days' : 'last 90 days'}</p>
        
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500">Loading trend data...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No data available for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 10 }}>
              <defs>
                <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="date"
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
                formatter={(value) => `${value} mg/dL`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" opacity={0.3} />
              <ReferenceLine y={180} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} />
              <Line type="monotone" dataKey="max" stroke="#f59e0b" dot={false} strokeWidth={2} name="Daily High" isAnimationActive={false} />
              <Line type="monotone" dataKey="avg" stroke="#6366f1" dot={false} strokeWidth={3} name="Daily Average" isAnimationActive={false} fill="url(#avgGradient)" />
              <Line type="monotone" dataKey="min" stroke="#10b981" dot={false} strokeWidth={2} name="Daily Low" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
