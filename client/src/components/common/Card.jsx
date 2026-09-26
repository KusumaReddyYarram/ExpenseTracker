import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-fintech p-6 transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-fintech-hover hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
