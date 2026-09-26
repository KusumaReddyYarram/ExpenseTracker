import React from 'react';

const PasswordStrengthMeter = ({ password = '' }) => {
  const getStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'Moderate', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-1 space-y-1">
      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500">
        <span>Password Strength</span>
        <span className={`font-bold ${strength.label === 'Strong' ? 'text-emerald-600' : strength.label === 'Moderate' ? 'text-amber-600' : 'text-rose-600'}`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }}></div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
