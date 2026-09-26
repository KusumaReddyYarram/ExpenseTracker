import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Sparkles, ShieldCheck, TrendingUp, Brain } from 'lucide-react';
import HeroFinancialVisual from '../components/home/HeroFinancialVisual';

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-aura-bg">
      
      {/* Left Visual Branding Panel (Hidden on small screens, 5 cols on lg) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-aura-charcoal to-slate-950 text-white p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Top Logo */}
        <Link to="/" className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-aura-emerald text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AURA <span className="text-aura-emerald text-xs uppercase font-semibold">FINANCE</span>
          </span>
        </Link>

        {/* Center Visual & Tagline */}
        <div className="space-y-6 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-aura-emerald bg-slate-800/80 border border-slate-700">
            <Brain className="w-3.5 h-3.5" /> Behavioral Intelligence
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
            "Understand where your money goes."
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Log in to access your Health Score (82/100), automated spending spike alerts, and interactive What-If financial simulations.
          </p>

          <div className="scale-95 origin-top-left pt-2">
            <HeroFinancialVisual />
          </div>
        </div>

        {/* Bottom Encryption Note */}
        <div className="pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 z-10">
          <ShieldCheck className="w-4 h-4 text-aura-emerald" />
          <span>256-bit SSL encrypted secure authentication</span>
        </div>

      </div>

      {/* Right Form Container (12 cols mobile, 7 cols lg) */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12">
        <div className="lg:hidden flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-aura-charcoal text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-aura-emerald" />
            </div>
            <span className="font-extrabold text-aura-charcoal">AURA</span>
          </Link>
          <Link to="/" className="text-xs font-semibold text-aura-emerald">Back to Home</Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto py-8">
          <Outlet />
        </div>

        <div className="text-center text-xs text-slate-400 pt-6">
          © {new Date().getFullYear()} AURA Personal Finance Management System
        </div>
      </div>

    </div>
  );
};

export default AuthLayout;
