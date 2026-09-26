import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  icon: Icon,
  endIcon,
  onEndIconClick,
  disabled = false
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-aura-muted uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-4 h-4" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`block w-full rounded-xl border bg-white text-aura-charcoal text-sm py-2.5 ${
            Icon ? 'pl-10' : 'pl-3.5'
          } ${endIcon ? 'pr-10' : 'pr-3.5'} ${
            error ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : 'border-slate-200 focus:ring-aura-emerald focus:border-aura-emerald'
          } focus:outline-none focus:ring-2 transition duration-150 disabled:bg-slate-50 disabled:text-slate-400`}
        />
        {endIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-aura-charcoal focus:outline-none"
          >
            {endIcon}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
