import React from 'react';

const SectionHeading = ({ badge, title, subtitle, centered = false, className = '' }) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-aura-emerald bg-emerald-50 border border-emerald-200/60 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-aura-charcoal">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-aura-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
