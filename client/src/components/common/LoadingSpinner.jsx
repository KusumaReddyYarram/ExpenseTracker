import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading financial insights...' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div
        className={`${sizes[size]} border-aura-emerald/20 border-t-aura-emerald rounded-full animate-spin`}
      />
      {message && <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
