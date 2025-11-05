import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function currency(amount) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

function groupByDateSum(items) {
  const map = new Map();
  items.forEach((it) => {
    const d = new Date(it.date);
    const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
    map.set(key, (map.get(key) || 0) + Number(it.amount || 0));
  });
  const arr = Array.from(map.entries())
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, total]) => ({ date: new Date(date).toLocaleDateString(), total }));
  return arr;
}

const IncomeChart = ({ items }) => {
  const data = useMemo(() => groupByDateSum(items), [items]);
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Income Over Time</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => currency(v)} tick={{ fontSize: 12 }} width={80} />
            <Tooltip formatter={(v) => currency(v)} />
            <Line type="monotone" dataKey="total" stroke="#111827" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeChart;
