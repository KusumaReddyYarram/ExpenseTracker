import React from 'react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import {
  Brain,
  Activity,
  Sliders,
  AlertTriangle,
  RefreshCw,
  Target,
  Calculator,
  ArrowUpRight
} from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Financial Insights',
      badge: 'Behavior Engine',
      description: 'Identifies category velocity increases, weekend spending spikes, and recurring leaks.',
      example: '"Your weekend spending is 35% higher than your weekday spending."'
    },
    {
      icon: Activity,
      title: 'Financial Health Score (82/100)',
      badge: 'Metric Model',
      description: 'Evaluates budget discipline, savings rate, and spending stability into one clear score.',
      example: 'Health Score: 82/100 (Status: Excellent)'
    },
    {
      icon: Sliders,
      title: 'Smart Budget Recommendations',
      badge: 'Automated Limits',
      description: 'Analyzes previous averages to suggest realistic budget limits per category.',
      example: 'Food Avg: ₹5,200 ➔ Recommended Budget: ₹4,500'
    },
    {
      icon: AlertTriangle,
      title: 'Unusual Spending Detection',
      badge: 'Anomaly Alert',
      description: 'Flags transactions that deviate significantly from your baseline spending history.',
      example: 'Normal: ₹1,000–₹3,000 ➔ Alert: ₹8,500 transaction detected'
    },
    {
      icon: RefreshCw,
      title: 'Subscription Tracker',
      badge: 'Recurring Audit',
      description: 'Detects OTT, gym, cloud storage, and SaaS recurring charges to calculate yearly impact.',
      example: 'Monthly Subscriptions: ₹1,899 ➔ Yearly: ₹22,788'
    },
    {
      icon: Target,
      title: 'Financial Goal Pathways',
      badge: 'Target Milestones',
      description: 'Set custom targets (MacBook, Bike, Emergency Fund) with progress tracking.',
      example: 'Goal: New Laptop ➔ ₹52,000 / ₹80,000 (65%)'
    },
    {
      icon: Calculator,
      title: 'What-If Financial Simulator',
      badge: 'Unique Module',
      description: 'Test wealth creation scenarios: "What happens if I save ₹2,000 more every month?"',
      example: 'Extra ₹2,000/mo ➔ Accumulates ₹24,000/yr + compound growth'
    }
  ];

  return (
    <section id="features" className="py-20 bg-aura-bg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Intelligent Architecture"
          title="Designed for Deep Financial Intelligence"
          subtitle="Aura goes beyond simple record-keeping with powerful financial behavior analytics modules."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <Card key={i} hoverEffect className="flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-aura-emerald flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-aura-charcoal group-hover:text-aura-emerald transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-aura-muted mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/60 p-3 rounded-xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Live Example</span>
                  <p className="text-xs font-semibold text-aura-charcoal">{feat.example}</p>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
