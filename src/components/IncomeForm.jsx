import React, { useState } from 'react';

export default function IncomeForm({ onAdd, loading }) {
  const [platform, setPlatform] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!platform || !amount || !date) return;
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return;
    onAdd({ platform, amount: parsedAmount, date, notes });
    setPlatform('');
    setAmount('');
    setDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full rounded-xl border border-white/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-xl border border-white/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-white/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl border border-white/30 bg-white/60 dark:bg-slate-900/40 backdrop-blur placeholder:text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="relative inline-flex items-center gap-2 rounded-xl px-5 py-3 text-white transition focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600" />
          <span className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-600/30 blur-md" aria-hidden />
          <span className="relative font-medium">{loading ? 'Adding...' : 'Add Entry'}</span>
        </button>
      </div>
    </form>
  );
}
