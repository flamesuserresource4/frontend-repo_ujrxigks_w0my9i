import React from 'react';
import Spline from '@splinetool/react-spline';

function currency(amount) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount || 0);
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

const CoverHero = ({ total }) => {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white pointer-events-none" />

      <div className="relative h-full flex flex-col items-start justify-end p-6 md:p-10 gap-3">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 tracking-tight">
          CreatorPay — Manual Income Tracker
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl">
          Quickly log income from YouTube, TikTok, Patreon and more. See your totals and trends at a glance.
        </p>
        <div className="mt-2 inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-2 shadow-sm">
          <span className="text-xs font-medium text-gray-500">Total Income</span>
          <span className="text-lg md:text-2xl font-semibold text-gray-900">{currency(total)}</span>
        </div>
      </div>
    </section>
  );
};

export default CoverHero;
