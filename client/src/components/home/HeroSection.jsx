import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import Button from '../common/Button';
import HeroFinancialVisual from './HeroFinancialVisual';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-aura-bg to-slate-100/50 py-16 lg:py-24">
      {/* Background Subtle Mesh / Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-aura-emerald shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-aura-emerald" />
              <span>Next-Gen Personal Finance Management</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-aura-charcoal leading-[1.15]">
              Your Money, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura-charcoal via-slate-800 to-aura-emerald">
                Clearly Explained.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-lg sm:text-xl text-aura-muted font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Track your spending, understand your financial behavior, and build better financial habits with one intelligent finance platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                variant="emerald"
                size="lg"
                onClick={() => navigate('/register')}
                icon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Start Managing Money
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto"
              >
                Explore Features
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>JWT Secure Auth</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-aura-emerald" />
                <span>Health Score (82/100)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>What-If Simulator</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 flex justify-center">
            <HeroFinancialVisual />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
