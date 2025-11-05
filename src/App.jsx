import React, { useEffect, useMemo, useState } from 'react';
import SummaryCard from './components/SummaryCard';
import IncomeForm from './components/IncomeForm';
import IncomeChart from './components/IncomeChart';
import IncomeTable from './components/IncomeTable';

// Preview mode dummy data (kept as-is; Supabase client remains available for live mode)
const DUMMY_DATA = [
  { id: '1', platform: 'YouTube', amount: 250.0, date: '2025-01-05', notes: 'Ad revenue' },
  { id: '2', platform: 'Patreon', amount: 120.0, date: '2025-01-10', notes: 'Monthly supporters' },
  { id: '3', platform: 'Gumroad', amount: 75.5, date: '2025-01-12', notes: 'Ebook sales' },
  { id: '4', platform: 'Twitch', amount: 90.0, date: '2025-01-18', notes: 'Subscriptions + bits' },
];

function useEntriesPreview() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // initial fetch simulation
  useEffect(() => {
    const t = setTimeout(() => {
      setEntries([...DUMMY_DATA].sort((a, b) => (a.date < b.date ? 1 : -1)));
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const addEntry = (payload) => {
    setAdding(true);
    setTimeout(() => {
      const newItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...payload,
      };
      setEntries((prev) => [newItem, ...prev].sort((a, b) => (a.date < b.date ? 1 : -1)));
      setAdding(false);
    }, 350);
  };

  const deleteEntry = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setDeletingId(null);
    }, 300);
  };

  return { entries, loading, adding, deletingId, addEntry, deleteEntry };
}

export default function App() {
  const { entries, loading, adding, deletingId, addEntry, deleteEntry } = useEntriesPreview();

  const total = useMemo(() => entries.reduce((sum, e) => sum + Number(e.amount || 0), 0), [entries]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Ambient gradient texture */}
      <div className="pointer-events-none fixed inset-0 opacity-60 mix-blend-multiply" aria-hidden>
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-300 blur-3xl" />
        <div className="absolute top-20 right-0 h-72 w-72 rounded-full bg-pink-300 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-300 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            CreatorPay Manual Income Tracker
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Track manual income across platforms with a clean, gradient-themed dashboard.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6">
          <SummaryCard total={total} count={entries.length} />

          <div className="rounded-2xl p-[1px] bg-gradient-to-tr from-purple-500/50 via-pink-500/50 to-blue-500/50">
            <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-5 sm:p-6">
              <IncomeForm onAdd={addEntry} loading={adding} />
            </div>
          </div>

          <IncomeChart entries={entries} />

          <div>
            {loading ? (
              <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-6 text-slate-600 dark:text-slate-300">
                Loading entries...
              </div>
            ) : entries.length === 0 ? (
              <div className="rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-6 text-slate-600 dark:text-slate-300">
                No entries yet. Add your first income above.
              </div>
            ) : (
              <IncomeTable entries={entries} onDelete={deleteEntry} deletingId={deletingId} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
