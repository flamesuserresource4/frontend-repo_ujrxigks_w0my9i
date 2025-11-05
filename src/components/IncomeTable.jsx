import React from 'react';

function currency(amount) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

const IncomeTable = ({ items, onDelete }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">All Entries</h3>
      </div>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2">Platform</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Date</th>
            <th className="py-2">Notes</th>
            <th className="py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">No entries yet</td>
            </tr>
          ) : (
            items.map((it) => (
              <tr key={it.id} className="border-t border-gray-100">
                <td className="py-2 font-medium text-gray-900">{it.platform}</td>
                <td className="py-2">{currency(it.amount)}</td>
                <td className="py-2">{new Date(it.date).toLocaleDateString()}</td>
                <td className="py-2 text-gray-600">{it.notes || '-'}</td>
                <td className="py-2 text-right">
                  <button
                    onClick={() => onDelete(it.id)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
