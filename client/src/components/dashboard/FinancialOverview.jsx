import React from 'react';
import Card from '../common/Card';
import { Wallet, ArrowDownRight, ArrowUpRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const FinancialOverview = ({ summary = {} }) => {
  const {
    balance = 48250,
    totalIncome = 35000,
    totalExpenses = 21450,
    savings = 13550,
    savingsRate = 39
  } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-aura-charcoal to-slate-900 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Net Balance</span>
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-aura-emerald flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-white">
            {formatCurrency(balance)}
          </h3>
          <p className="text-xs text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Calculated surplus balance
          </p>
        </div>
      </Card>

      {/* Income Card */}
      <Card>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly Income</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-aura-charcoal">
            {formatCurrency(totalIncome)}
          </h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
            +8% vs last month
          </span>
        </div>
      </Card>

      {/* Expense Card */}
      <Card>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Expenses</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-aura-charcoal">
            {formatCurrency(totalExpenses)}
          </h3>
          <span className="text-xs text-slate-500 font-medium mt-1 inline-block">
            {totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : 61}% of income used
          </span>
        </div>
      </Card>

      {/* Savings Card */}
      <Card className="bg-emerald-50/70 border-emerald-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Net Savings</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-extrabold tracking-tight text-emerald-950">
            {formatCurrency(savings)}
          </h3>
          <span className="text-xs text-emerald-800 font-bold mt-1 inline-block">
            {savingsRate}% Savings Rate
          </span>
        </div>
      </Card>

    </div>
  );
};

export default FinancialOverview;
