import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await login({ email, password });
    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message || 'Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-aura-charcoal">Welcome Back</h1>
        <p className="text-sm text-aura-muted mt-1">
          Access your personal financial behavior intelligence portal.
        </p>
      </div>

      {/* Demo Credentials Alert Banner */}
      <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-xs space-y-1">
        <span className="font-bold text-aura-emerald uppercase tracking-wider block">Demo Account Credentials:</span>
        <div className="text-slate-700 font-mono text-[11px] flex justify-between">
          <span>Email: <strong>demo@aura.finance</strong></span>
          <span>Password: <strong>password123</strong></span>
        </div>
      </div>

      <ErrorMessage message={errorMsg} onDismiss={() => setErrorMsg('')} />

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="e.g. alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          icon={Lock}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          onEndIconClick={() => setShowPassword(!showPassword)}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-slate-300 text-aura-emerald focus:ring-aura-emerald"
            />
            <span>Remember me</span>
          </label>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent if account exists.'); }} className="font-semibold text-aura-emerald hover:underline">
            Forgot password?
          </a>
        </div>

        <Button variant="emerald" fullWidth type="submit" size="lg" disabled={loading} icon={ArrowRight}>
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </Button>

      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
        Don't have an Aura account?{' '}
        <Link to="/register" className="font-bold text-aura-emerald hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
