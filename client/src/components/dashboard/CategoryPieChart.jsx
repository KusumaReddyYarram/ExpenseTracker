import React from 'react';
import Card from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CategoryPieChart = ({ categoryData = [] }) => {
  const defaultData = [
    { name: 'Food', value: 5200, color: '#059669' },
    { name: 'Bills', value: 8950, color: '#475569' },
    { name: 'Shopping', value: 4500, color: '#7C3AED' },
    { name: 'Transport', value: 2800, color: '#2563EB' }
  ];

  const data = categoryData.length > 0 ? categoryData : defaultData;

  const COLORS = ['#059669', '#475569', '#7C3AED', '#2563EB', '#D97706', '#E11D48', '#0284C7'];

  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-base font-bold text-aura-charcoal">Expense Category Distribution</h3>
        <span className="text-xs text-slate-500 font-medium">Current Cycle</span>
      </div>

      <div className="h-64 w-full my-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [formatCurrency(value), 'Spent']}
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
              itemStyle={{ color: '#10B981' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-xs font-semibold text-slate-700">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CategoryPieChart;
