import React from 'react';
import { ArrowRight, CheckCircle2, XCircle, Brain, Sparkles, TrendingUp } from 'lucide-react';

const ConceptShowcase = () => {
  return (
    <section className="py-20 bg-aura-charcoal text-white relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-aura-emerald/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Tagline Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-aura-emerald bg-emerald-950/80 border border-emerald-800/60">
            <Brain className="w-3.5 h-3.5" /> Core Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            "Don't just track your money. <br />
            <span className="text-aura-emerald">Understand your financial behavior."</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional expense trackers show static raw lists. Aura transforms raw data into actionable behavioral intelligence.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Basic Expense Tracker */}
          <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Basic College CRUD App
                </span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full">Static Output</span>
              </div>
              <h3 className="text-xl font-bold text-slate-300">Basic Expense Listing</h3>
              <p className="text-xs text-slate-400 mt-2">Just logs numbers into a database table without context.</p>

              {/* Sample output */}
              <div className="mt-6 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3 font-mono text-xs text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Category: Food</span>
                  <span className="text-slate-200">₹5,200</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Category: Shopping</span>
                  <span className="text-slate-200">₹4,500</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Category: Transport</span>
                  <span className="text-slate-200">₹2,800</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">No guidance, no trend velocity, no actionable coaching.</p>
          </div>

          {/* Aura Behavioral Intelligence */}
          <div className="bg-gradient-to-br from-slate-900 via-aura-charcoal to-slate-900 rounded-3xl p-8 border border-emerald-500/30 shadow-fintech-lg space-y-6 flex flex-col justify-between relative">
            <div className="absolute top-4 right-4">
              <Sparkles className="w-5 h-5 text-aura-emerald animate-pulse" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Aura Financial Intelligence
                </span>
                <span className="text-xs bg-aura-emerald/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">Behavior Engine</span>
              </div>
              <h3 className="text-xl font-bold text-white">Actionable Behavioral Insights</h3>
              <p className="text-xs text-slate-300 mt-2">Analyzes patterns, calculates health score, and suggests micro-adjustments.</p>

              {/* Sample output */}
              <div className="mt-6 bg-slate-950 p-5 rounded-2xl border border-emerald-900/60 space-y-3">
                <div className="bg-emerald-950/70 p-3.5 rounded-xl border border-emerald-500/30">
                  <p className="text-xs font-semibold text-emerald-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    "You spent 18% more on food this month compared with your previous average."
                  </p>
                </div>

                <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/30">
                  <p className="text-xs font-semibold text-amber-200">
                    "Your weekend spending is 35% higher than your weekday spending. Save ₹2,400/mo by capping weekend dining."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-400 font-medium pt-2 border-t border-slate-800">
              <span>Financial Health Score: 82/100</span>
              <span className="flex items-center gap-1">Empowers Wealth Growth <ArrowRight className="w-3.5 h-3.5" /></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConceptShowcase;
