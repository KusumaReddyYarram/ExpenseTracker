import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-aura-charcoal text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-aura-emerald flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AURA <span className="text-aura-emerald text-sm font-semibold">FINANCE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Don't just track your money. Understand your financial behavior and build long-term wealth.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 w-fit">
              <Shield className="w-3.5 h-3.5" />
              <span>Bank-grade 256-bit AES Encryption</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-aura-emerald transition-colors">Behavioral Insights</Link></li>
              <li><Link to="/dashboard" className="hover:text-aura-emerald transition-colors">Health Score 82/100</Link></li>
              <li><Link to="/dashboard" className="hover:text-aura-emerald transition-colors">What-If Simulator</Link></li>
              <li><Link to="/dashboard" className="hover:text-aura-emerald transition-colors">Smart Budgets</Link></li>
              <li><Link to="/dashboard" className="hover:text-aura-emerald transition-colors">Unusual Spend Alerts</Link></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-aura-emerald transition-colors">Home Landing</Link></li>
              <li><Link to="/about" className="hover:text-aura-emerald transition-colors">About System</Link></li>
              <li><Link to="/login" className="hover:text-aura-emerald transition-colors">Secure Login</Link></li>
              <li><Link to="/register" className="hover:text-aura-emerald transition-colors">Create Account</Link></li>
            </ul>
          </div>

          {/* Training Project Note */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">MERN Major Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Designed & built as a production-level MERN stack personal finance application with RESTful Node APIs, MongoDB Atlas schemas, and JWT auth.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">React.js</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Node.js</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Express</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">MongoDB</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">Tailwind</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AURA Personal Finance System. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for modern personal finance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
