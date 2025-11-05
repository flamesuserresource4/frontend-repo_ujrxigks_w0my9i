import React from 'react';

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(value);
  } catch {
    return `$${Number(value || 0).toFixed(2)}`;
  }
}

export default function IncomeTable({ entries, onDelete, deletingId }) {
  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-4 sm:p-6 shadow-[0_8px_30px_rgba(30,41,59,0.12)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-slate-600 dark:text-slate-300 text-sm">
              <th className="py-2">Platform</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Date</th>
              <th className="py-2">Notes</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-slate-200/50 dark:border-slate-700/50 text-slate-900 dark:text-slate-100">
                <td className="py-3 pr-4">{e.platform}</td>
                <td className="py-3 pr-4">{formatCurrency(e.amount)}</td>
                <td className="py-3 pr-4">{e.date}</td>
                <td className="py-3 pr-4 max-w-[280px] truncate" title={e.notes}>{e.notes}</td>
                <td className="py-3 pl-4">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onDelete(e.id)}
                      disabled={deletingId === e.id}
                      className="relative inline-flex items-center rounded-lg px-3 py-2 text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600" />
                      <span className="relative">{deletingId === e.id ? 'Deleting...' : 'Delete'}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
