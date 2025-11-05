import React, { useEffect, useMemo, useState } from 'react';
import CoverHero from './components/CoverHero.jsx';
import IncomeForm from './components/IncomeForm.jsx';
import IncomeChart from './components/IncomeChart.jsx';
import IncomeTable from './components/IncomeTable.jsx';
import { supabase } from './supabaseClient.js';

function currency(amount) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const total = useMemo(() => items.reduce((sum, it) => sum + Number(it.amount || 0), 0), [items]);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('income')
      .select('*')
      .order('date', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addEntry = async (entry) => {
    const { data, error } = await supabase
      .from('income')
      .insert([{ platform: entry.platform, amount: entry.amount, date: entry.date, notes: entry.notes }])
      .select();
    if (error) {
      setError(error.message);
    } else if (data && data.length) {
      setItems((prev) => [...prev, data[0]].sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
  };

  const deleteEntry = async (id) => {
    const prev = items;
    setItems((cur) => cur.filter((x) => x.id !== id));
    const { error } = await supabase.from('income').delete().eq('id', id);
    if (error) {
      setError(error.message);
      setItems(prev);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <CoverHero total={total} />

        <div className="mt-6 grid grid-cols-1 gap-6">
          <IncomeForm onAdd={addEntry} />

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 p-3 text-sm">{error}</div>
          )}

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
