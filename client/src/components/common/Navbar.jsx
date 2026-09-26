import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Sparkles, Menu, X, ArrowRight, LayoutDashboard, LogOut, Shield } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'About', path: '/about' }
  ];

  const handleNavClick = (path) => {
    setMobileOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aura-charcoal to-slate-800 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-aura-emerald" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-aura-charcoal font-sans">
              AURA
            </span>
            <span className="text-[10px] font-bold block uppercase tracking-widest text-aura-emerald -mt-1">
              FINANCE
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`text-sm font-medium transition-colors hover:text-aura-emerald ${
                location.pathname === link.path ? 'text-aura-emerald font-semibold' : 'text-slate-600'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard')}
                icon={LayoutDashboard}
              >
                Dashboard
              </Button>
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <span className="text-xs font-semibold text-slate-700">{user?.name}</span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-aura-charcoal hover:text-aura-emerald transition-colors px-3 py-2">
                Login
              </Link>
              <Button
                variant="emerald"
                size="md"
                onClick={() => navigate('/register')}
                icon={ArrowRight}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-aura-charcoal hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-aura-emerald"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="emerald" fullWidth onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" fullWidth onClick={() => { setMobileOpen(false); logout(); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" fullWidth onClick={() => { setMobileOpen(false); navigate('/login'); }}>
                  Login
                </Button>
                <Button variant="emerald" fullWidth onClick={() => { setMobileOpen(false); navigate('/register'); }}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
