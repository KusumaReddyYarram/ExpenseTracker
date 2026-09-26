import React from 'react';
import Card from '../common/Card';
import { Sparkles, AlertTriangle, TrendingUp, Compass, ArrowRight } from 'lucide-react';

const SmartInsightsCard = ({ insights = [] }) => {
  const defaultInsights = [
    {
      id: 'weekend_spike',
      title: 'Weekend Spending Spike Detected',
      description: 'Your average weekend spending is 35% higher than your weekday spending. Capping weekend dining saves ~₹2,400/month.',
      type: 'warning',
      metric: '+35% on weekends',
      category: 'Behavior'
    },
    {
      id: 'food_insight',
      title: 'Food Category Acceleration',
      description: 'You spent 18% more on food and dining this month compared with your 3-month average.',
      type: 'observation',
      metric: '18% higher than avg',
      category: 'Food'
    },
    {
      id: 'unusual_alert',
      title: 'Unusual Transaction Alert',
      description: 'Transaction of ₹8,500 for "Electronics Store" detected — 2.4x higher than your baseline purchase limit.',
      type: 'alert',
      metric: '₹8,500 alert',
      category: 'Shopping'
    }
  ];

  const list = insights.length > 0 ? insights : defaultInsights;

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'warning':
        return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default:
        return <Compass className="w-4 h-4 text-aura-emerald" />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-aura-emerald" />
          </div>
          <div>
            <h3 className="text-base font-bold text-aura-charcoal">Smart Financial Insights</h3>
            <p className="text-xs text-slate-500">Automated behavioral analysis</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-emerald-50 text-aura-emerald px-2.5 py-1 rounded-full border border-emerald-200">
          AI Active
        </span>
      </div>

      <div className="space-y-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors flex items-start gap-3"
          >
            <div className="p-2 rounded-xl bg-white border border-slate-200 shrink-0 mt-0.5 shadow-xs">
              {getIcon(item.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-aura-charcoal">{item.title}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(item.type)}`}>
                  {item.metric}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SmartInsightsCard;
