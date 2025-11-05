import React, { useMemo, useState } from 'react';

const PLATFORMS = [
  'YouTube',
  'TikTok',
  'Patreon',
  'Twitch',
  'Instagram',
  'OnlyFans',
  'Ko-fi',
  'Gumroad',
  'Shopify',
  'Other',
];

const Input = ({ label, children }) => (
  <label className="flex flex-col gap-1 text-sm text-gray-700">
    <span className="font-medium">{label}</span>
    {children}
  </label>
);

const IncomeForm = ({ onAdd }) => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState({ platform: 'YouTube', amount: '', date: today, notes: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = Number(form.amount);
    if (!form.platform || !form.date || isNaN(amountNum) || amountNum <= 0) return;
    setLoading(true);
    try {
      await onAdd({ ...form, amount: amountNum });
      setForm({ platform: 'YouTube', amount: '', date: today, notes: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Add Income</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input label="Platform">
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </Input>
        <Input label="Amount">
          <input
            type="number"
            name="amount"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            required
          />
        </Input>
        <Input label="Date">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            required
          />
        </Input>
        <Input label="Notes">
          <input
            type="text"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional"
            className="h-10 rounded-lg border-gray-300 focus:border-gray-500 focus:ring-gray-500"
          />
        </Input>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-gray-900 text-white hover:bg-black disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Entry'}
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;
