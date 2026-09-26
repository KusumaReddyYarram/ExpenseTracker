import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-aura-charcoal to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-aura-emerald/20 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-aura-emerald" />
          <span>Transform Your Financial Habits Today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Understand Where Your Money Goes?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
          Join thousands of smart individuals using Aura to track income, detect spending spikes, and simulate long-term wealth growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            variant="emerald"
            size="lg"
            onClick={() => navigate('/register')}
            icon={ArrowRight}
          >
            Create Your Free Account
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/about')}
            className="text-white border-slate-700 hover:bg-slate-800"
          >
            Learn About Our Approach
          </Button>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No credit card required. Instant access.</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
