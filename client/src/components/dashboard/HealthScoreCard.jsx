import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Activity, ShieldCheck, Info } from 'lucide-react';

const HealthScoreCard = ({ health = {} }) => {
  const {
    score = 82,
    status = 'Excellent',
    breakdown = { savingsScore: 35, budgetScore: 30, stabilityScore: 17, savingsRatePercent: 39 }
  } = health;

  return (
    <Card className="relative overflow-hidden border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/20 to-white">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-aura-emerald flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-aura-charcoal">Financial Health Score</h3>
            <p className="text-xs text-slate-500">Multi-factor behavioral evaluation</p>
          </div>
        </div>
        <Badge variant="emerald">{status}</Badge>
      </div>

      <div className="py-6 flex flex-col sm:flex-row items-center gap-6 justify-around">
        
        {/* Big Ring Score */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke="#059669"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray="326.7"
              strokeDashoffset={326.7 - (326.7 * score) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-3xl font-extrabold text-aura-charcoal block leading-none">{score}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">/ 100</span>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="space-y-3 w-full max-w-xs text-xs">
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Savings Discipline</span>
              <span>{breakdown.savingsScore || 35}/40 pts</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-aura-emerald h-2 rounded-full" style={{ width: `${((breakdown.savingsScore || 35) / 40) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Budget Adherence</span>
              <span>{breakdown.budgetScore || 30}/35 pts</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((breakdown.budgetScore || 30) / 35) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Spending Stability</span>
              <span>{breakdown.stabilityScore || 17}/25 pts</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${((breakdown.stabilityScore || 17) / 25) * 100}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-aura-emerald shrink-0" />
        <span>Scores above 75 indicate strong financial resiliency and goal momentum.</span>
      </div>
    </Card>
  );
};

export default HealthScoreCard;
