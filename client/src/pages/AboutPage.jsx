import React from 'react';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import {
  Brain,
  Target,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';

const AboutPage = () => {
  const steps = [
    { num: '01', title: 'Track', desc: 'Capture income & expenses effortlessly across categories and payment channels.' },
    { num: '02', title: 'Analyze', desc: 'Compute monthly velocities, weekend spending spikes, and baseline deviations.' },
    { num: '03', title: 'Understand', desc: 'Receive human-readable insights and a 0-100 Financial Health Score.' },
    { num: '04', title: 'Improve', desc: 'Use What-If simulators to optimize savings and accelerate financial freedom.' }
  ];

  const differentiators = [
    { title: 'Smart Financial Insights', desc: 'Behavioral algorithms detect category spikes and weekend surges.' },
    { title: 'Financial Health Score (82/100)', desc: 'Holistic evaluation of savings rate, budget discipline, and spending stability.' },
    { title: 'What-If Financial Simulator', desc: 'Interactive financial modeling projecting 1-to-5 year wealth compounding.' },
    { title: 'Smart Budget Recommendations', desc: 'Calculates historical category baselines to propose realistic limits.' },
    { title: 'Unusual Spending Detection', desc: 'Flags purchases exceeding 2.2x your typical category mean.' },
    { title: 'Subscription Audit Engine', desc: 'Tracks OTT and SaaS recurring charges to calculate total annual cost impact.' }
  ];

  return (
    <div className="py-16 space-y-24">
      
      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-aura-emerald bg-emerald-50 border border-emerald-200">
          <Brain className="w-3.5 h-3.5" /> Our Mission & Vision
        </span>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-aura-charcoal tracking-tight leading-tight">
          Transforming Raw Expense Data Into <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aura-charcoal via-slate-800 to-aura-emerald">
            Financial Behavior Intelligence.
          </span>
        </h1>

        <p className="text-lg text-aura-muted max-w-3xl mx-auto leading-relaxed">
          Traditional tools record transactions. Aura illuminates financial behavior, empowering individuals to build sustainable, long-term wealth.
        </p>
      </section>

      {/* The Problem vs Our Purpose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <Card className="bg-slate-900 text-white p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">The Problem</span>
            <h3 className="text-2xl font-bold text-white">Traditional Expense Tracking is Broken</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Most expense apps act as basic spreadsheet replacements. Users painstakingly enter numbers into lists, but at the end of the month, they still ask:
              <em className="block text-amber-300 mt-2 font-semibold font-mono">"Where did all my money actually go?"</em>
            </p>
            <p className="text-xs text-slate-400">
              Raw expense logs lack context, trend velocity, and behavioral coaching.
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-white via-emerald-50/40 to-white border-emerald-200 p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-aura-emerald">Our Purpose</span>
            <h3 className="text-2xl font-bold text-aura-charcoal">Behavior-First Financial System</h3>
            <p className="text-aura-muted text-sm leading-relaxed">
              Aura bridges the gap between logging numbers and understanding behavior. By automatically calculating savings rates, category spikes, and health scores, Aura gives users clarity and actionable next steps.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-aura-emerald">
              <CheckCircle2 className="w-4 h-4" /> Built for modern financial clarity
            </div>
          </Card>

        </div>
      </section>

      {/* Our 4-Step Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900 text-white rounded-3xl p-10 sm:p-14 space-y-12">
        <SectionHeading
          badge="System Architecture"
          title="The Aura 4-Step Methodology"
          subtitle="How our intelligent engine turns raw entries into compounding wealth."
          centered
          className="text-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-3">
              <span className="text-2xl font-extrabold text-aura-emerald font-mono">{s.num}</span>
              <h4 className="text-lg font-bold text-white">{s.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          badge="Product Distinction"
          title="What Makes Aura Unique"
          subtitle="Features engineered to elevate this major project beyond standard CRUD applications."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, i) => (
            <Card key={i} hoverEffect className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-aura-emerald flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-aura-charcoal">{diff.title}</h4>
              <p className="text-xs text-aura-muted leading-relaxed">{diff.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Future Vision */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6 bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-12 rounded-3xl">
        <Cpu className="w-10 h-10 text-aura-emerald mx-auto" />
        <h2 className="text-3xl font-extrabold">Future Vision: Intelligent Financial Companion</h2>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          Aura is evolving into an autonomous financial advisor — automatically identifying recurring subscription leaks, recommending optimal emergency funds, and simulating retirement goals.
        </p>
      </section>

    </div>
  );
};

export default AboutPage;
