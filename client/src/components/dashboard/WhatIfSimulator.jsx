import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { Calculator, TrendingUp, Sparkles, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { simulateWhatIf } from '../../services/insightService';

const WhatIfSimulator = () => {
  const [saveBoost, setSaveBoost] = useState(2000);
  const [reduceCategory, setReduceCategory] = useState('Food');
  const [reduceAmount, setReduceAmount] = useState(1000);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulateWhatIf({
        monthlySaveBoost: saveBoost,
        reduceCategory,
        reduceAmount
      });
      if (res.success) {
        setResult(res.simulation);
      }
    } catch (err) {
      console.warn('Simulation error fallback:', err);
      // Fallback calculation
      const total = Number(saveBoost) + Number(reduceAmount);
      const annual = total * 12;
      const r = 0.075 / 12;
      const n = 60;
      const fv = total * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      setResult({
        monthlySavings: total,
        annualSavings: annual,
        threeYearSavings: annual * 3,
        fiveYearSavings: annual * 5,
        investedFutureValue5Years: Math.round(fv),
        recommendation: `By saving an extra ₹${total.toLocaleString('en-IN')}/month, you accumulate ₹${annual.toLocaleString('en-IN')} in 1 year and up to ₹${Math.round(fv).toLocaleString('en-IN')} in 5 years!`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSimulate();
  }, [saveBoost, reduceAmount]);

  return (
    <Card className="border-slate-200 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-aura-charcoal to-slate-800 text-white flex items-center justify-center shadow-xs">
            <Calculator className="w-4 h-4 text-aura-emerald" />
          </div>
          <div>
            <h3 className="text-base font-bold text-aura-charcoal">What-If Financial Simulator</h3>
            <p className="text-xs text-slate-500">Model scenario outcomes and long-term wealth trajectories</p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-aura-emerald px-2.5 py-1 rounded-full border border-emerald-200">
          Unique Module
        </span>
      </div>

      {/* Simulator Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            "What if I save extra per month?"
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={saveBoost}
              onChange={(e) => setSaveBoost(e.target.value)}
              className="w-full accent-aura-emerald cursor-pointer"
            />
            <span className="text-xs font-bold text-aura-charcoal shrink-0 min-w-[70px] text-right">
              ₹{Number(saveBoost).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            "What if I cut {reduceCategory} spending?"
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="5000"
              step="250"
              value={reduceAmount}
              onChange={(e) => setReduceAmount(e.target.value)}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-aura-charcoal shrink-0 min-w-[70px] text-right">
              ₹{Number(reduceAmount).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Output Projection Cards */}
      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Monthly Additional</span>
              <p className="text-lg font-extrabold text-aura-charcoal mt-0.5">
                {formatCurrency(result.monthlySavings)}
              </p>
            </div>

            <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase">1-Year Capital</span>
              <p className="text-lg font-extrabold text-aura-charcoal mt-0.5">
                {formatCurrency(result.annualSavings)}
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">3-Year Capital</span>
              <p className="text-lg font-extrabold text-emerald-950 mt-0.5">
                {formatCurrency(result.threeYearSavings)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-aura-charcoal to-slate-900 text-white p-3 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">5-Yr Invested (7.5%)</span>
              <p className="text-lg font-extrabold text-white mt-0.5">
                {formatCurrency(result.investedFutureValue5Years)}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-aura-emerald shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 font-medium leading-relaxed">
              {result.recommendation}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default WhatIfSimulator;
