import React, { useEffect, useMemo, useState } from 'react';
import CoverHero from './components/CoverHero.jsx';
import IncomeForm from './components/IncomeForm.jsx';
import IncomeChart from './components/IncomeChart.jsx';
import IncomeTable from './components/IncomeTable.jsx';

function currency(amount) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

// Preview mode: local dummy data (no Supabase calls)
const DUMMY_DATA = [
  { id: 1, platform: 'YouTube', amount: 220.5, date: new Date().toISOString().slice(0, 10), notes: 'Adsense' },
  { id: 2, platform: 'Patreon', amount: 145.0, date: new Date(Date.now() - 86400000 * 1).toISOString().slice(0, 10), notes: 'Members' },
  { id: 3, platform: 'TikTok', amount: 80.25, date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10), notes: 'Creator Fund' },
  { id: 4, platform: 'Gumroad', amount: 59.99, date: new Date(Date.now() - 86400000 * 7).toISOString().slice(0, 10), notes: 'Course' },
];

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => items.reduce((sum, it) => sum + Number(it.amount || 0), 0), [items]);

  // Simulate fetching from API
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setItems([...DUMMY_DATA].sort((a, b) => new Date(a.date) - new Date(b.date)));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const addEntry = async (entry) => {
    // Simulate network call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = { id: Date.now(), ...entry };
        setItems((prev) => [...prev, newItem].sort((a, b) => new Date(a.date) - new Date(b.date)));
        resolve(newItem);
      }, 250);
    });
  };

  const deleteEntry = async (id) => {
    // Simulate network call
    return new Promise((resolve) => {
      setTimeout(() => {
        setItems((cur) => cur.filter((x) => x.id !== id));
        resolve(true);
      }, 200);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <CoverHero total={total} />

        <div className="mt-6 grid grid-cols-1 gap-6">
          <IncomeForm onAdd={addEntry} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <IncomeChart items={items} />
            </div>
            <div className="lg:col-span-2">
              <div className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Summary</h3>
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="text-gray-500">Total</div>
                    <div className="text-lg font-semibold text-gray-900">{currency(total)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="text-gray-500">Entries</div>
                    <div className="text-lg font-semibold text-gray-900">{items.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <IncomeTable items={items} onDelete={deleteEntry} />

          {loading && (
            <div className="text-center text-gray-500 text-sm">Loading data...</div>
          )}
        </div>
      </div>
    </div>
  );
}
