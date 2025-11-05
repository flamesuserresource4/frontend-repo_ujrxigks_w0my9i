import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function groupByDate(entries) {
  const map = new Map();
  entries.forEach((e) => {
    const key = e.date;
    map.set(key, (map.get(key) || 0) + Number(e.amount || 0));
  });
  return Array.from(map.entries())
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));
}

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

export default function IncomeChart({ entries }) {
  const data = useMemo(() => groupByDate(entries), [entries]);

  return (
    <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-purple-500/60 via-pink-500/60 to-blue-500/60">
      <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Income Over Time</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
              <XAxis dataKey="date" stroke="rgba(71,85,105,0.9)" tick={{ fontSize: 12 }} />
              <YAxis stroke="rgba(71,85,105,0.9)" tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(v) => formatCurrency(v)}
                contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: 12, border: '1px solid rgba(148,163,184,0.3)' }}
              />
              <Line type="monotone" dataKey="total" stroke="url(#lineGradient)" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} fill="url(#fillGradient)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
