import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getOverview } from '../services/analyticsService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../utils/formatters';

const AnalyticsPage = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getOverview();
        if (res.success) {
          setOverview(res);
        }
      } catch (err) {
        setError('Failed to load financial analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner message="Generating analytical charts..." />;

  const monthlyData = overview?.monthlyData || [
    { month: 'May', income: 32000, expense: 19500 },
    { month: 'Jun', income: 32000, expense: 22100 },
    { month: 'Jul', income: 35000, expense: 20400 },
    { month: 'Aug', income: 35000, expense: 24800 },
    { month: 'Sep', income: 35000, expense: 21450 }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-aura-charcoal">Financial Analytics & Trends</h1>
        <p className="text-xs text-slate-500 mt-1">Multi-month comparative analytics and category velocity breakdown.</p>
      </div>

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      {/* Bar Chart: Monthly Income vs Expenses */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-aura-charcoal">Monthly Income vs Expenses Trend</h3>
          <span className="text-xs font-semibold bg-emerald-50 text-aura-emerald px-2.5 py-1 rounded-full border border-emerald-200">
            5-Month Stream
          </span>
        </div>

        <div className="h-72 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
              <Tooltip
                formatter={(val) => formatCurrency(val)}
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="income" name="Income" fill="#059669" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" name="Expenses" fill="#E11D48" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Pie Chart */}
      <div className="max-w-2xl">
        <CategoryPieChart categoryData={overview?.categoryBreakdown} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
