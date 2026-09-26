import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-[0.98]';

  const variants = {
    primary: 'bg-aura-charcoal text-white hover:bg-slate-800 shadow-md hover:shadow-lg focus:ring-aura-charcoal border border-slate-700/50',
    emerald: 'bg-aura-emerald text-white hover:bg-aura-emeraldHover shadow-md hover:shadow-lg focus:ring-aura-emerald',
    secondary: 'bg-aura-card text-aura-charcoal hover:bg-slate-200 border border-aura-border focus:ring-slate-300',
    outline: 'border border-slate-300 text-aura-charcoal hover:bg-slate-100 hover:border-slate-400 focus:ring-slate-400',
    ghost: 'text-slate-600 hover:text-aura-charcoal hover:bg-slate-100 focus:ring-slate-300'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
};

export default Button;
