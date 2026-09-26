import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Sparkles, PieChart, ShieldCheck } from 'lucide-react';

const HeroFinancialVisual = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Outer Glow Effect */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-aura-emerald/30 via-slate-800/20 to-emerald-400/20 rounded-3xl blur-xl opacity-75 animate-pulse"></div>

      {/* Main Container */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-fintech-lg p-6 sm:p-8 space-y-6">
        
        {/* Top Header Card Info */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-aura-charcoal text-white flex items-center justify-center font-bold text-sm shadow-md">
              <Wallet className="w-5 h-5 text-aura-emerald" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Net Balance</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-aura-charcoal">₹48,250</h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% this mo
          </span>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {/* Income Card */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 hover:bg-emerald-50/50 transition-colors">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <ArrowDownRight className="w-3.5 h-3.5 text-emerald-600" /> Income
            </div>
            <p className="text-base sm:text-lg font-bold text-aura-charcoal mt-1">₹35,000</p>
            <span className="text-[10px] text-emerald-600 font-medium">+8% from target</span>
          </div>

          {/* Expenses Card */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 hover:bg-rose-50/50 transition-colors">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" /> Expenses
            </div>
            <p className="text-base sm:text-lg font-bold text-aura-charcoal mt-1">₹21,450</p>
            <span className="text-[10px] text-slate-500 font-medium">61% of income</span>
          </div>

          {/* Savings Card */}
          <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200/70">
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Savings
            </div>
            <p className="text-base sm:text-lg font-bold text-emerald-950 mt-1">₹13,550</p>
            <span className="text-[10px] text-emerald-700 font-bold">39% Savings Rate</span>
          </div>
        </div>

        {/* Dynamic Category Spending Visualization */}
        <div className="bg-aura-bg rounded-2xl p-4 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-aura-emerald" />
              <span className="text-xs font-bold text-aura-charcoal uppercase tracking-wider">Top Spending Categories</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">September 2026</span>
          </div>

          {/* Category Progress Bars */}
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Food & Dining</span>
                <span>₹5,200 <span className="text-[10px] text-amber-600 font-normal">(+18% spike)</span></span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-aura-emerald h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Bills & Maintenance</span>
                <span>₹8,950</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-slate-700 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Shopping & Gear</span>
                <span>₹4,500</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Behavior Insight Chip */}
        <div className="bg-gradient-to-r from-slate-900 to-aura-charcoal text-white rounded-2xl p-4 flex items-start gap-3 shadow-md">
          <div className="w-8 h-8 rounded-xl bg-aura-emerald/20 text-aura-emerald flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-aura-emerald">Smart Behavior Observation</span>
              <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">AI Active</span>
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              "You spent <strong>18% more on food</strong> this month compared with your 3-month average. Reducing this by ₹1,000 saves ₹12,000 yearly."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroFinancialVisual;
