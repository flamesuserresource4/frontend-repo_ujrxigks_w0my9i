import React from 'react';

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

export default function SummaryCard({ total, count }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)]">
      <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md p-6 sm:p-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Total Income</p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              {formatCurrency(total)}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm uppercase tracking-wide text-slate-500">Entries</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
