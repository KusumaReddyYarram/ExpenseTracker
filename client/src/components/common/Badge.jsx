import React from 'react';

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    income: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    expense: 'bg-rose-50 text-rose-700 border-rose-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    emerald: 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        variants[variant] || variants.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
