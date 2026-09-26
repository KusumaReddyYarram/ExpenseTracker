import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Sliders, AlertCircle, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const BudgetProgressCard = ({ budgets = [] }) => {
  const defaultBudgets = [
    { category: 'Food', amount: 6000, spent: 5200, remaining: 800, percentUsed: 87 },
    { category: 'Shopping', amount: 5000, spent: 4500, remaining: 500, percentUsed: 90 },
    { category: 'Transport', amount: 3500, spent: 2800, remaining: 700, percentUsed: 80 }
  ];

  const list = budgets.length > 0 ? budgets : defaultBudgets;

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-aura-charcoal">Category Budget Status</h3>
            <p className="text-xs text-slate-500">Monthly budget thresholds & limits</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => {
          const isWarning = item.percentUsed >= 80 && item.percentUsed < 100;
          const isExceeded = item.percentUsed >= 100;

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-aura-charcoal">{item.category} Budget</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">
                    {formatCurrency(item.spent)} / {formatCurrency(item.amount)}
                  </span>
                  {isExceeded ? (
                    <Badge variant="expense">Exceeded</Badge>
                  ) : isWarning ? (
                    <Badge variant="warning">80%+ Used</Badge>
                  ) : (
                    <Badge variant="income">On Track</Badge>
                  )}
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isExceeded
                      ? 'bg-rose-500'
                      : isWarning
                      ? 'bg-amber-500'
                      : 'bg-aura-emerald'
                  }`}
                  style={{ width: `${Math.min(100, item.percentUsed)}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>{item.percentUsed}% utilized</span>
                <span>{formatCurrency(item.remaining)} remaining</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default BudgetProgressCard;
