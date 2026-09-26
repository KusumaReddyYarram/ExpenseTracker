import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Please accept the Terms of Service to register.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await register({
      name,
      email,
      password,
      confirmPassword,
      currency: '₹'
    });

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message || 'Registration failed.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-aura-charcoal">Create Aura Account</h1>
        <p className="text-sm text-aura-muted mt-1">
          Start understanding your financial behavior today.
        </p>
      </div>

      <ErrorMessage message={errorMsg} onDismiss={() => setErrorMsg('')} />

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <Input
          label="Full Name"
          type="text"
          icon={User}
          placeholder="e.g. Alex Morgan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="e.g. alex@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
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
          <PasswordStrengthMeter password={password} />
        </div>

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          icon={Lock}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="rounded border-slate-300 text-aura-emerald focus:ring-aura-emerald"
          />
          <label htmlFor="terms" className="text-slate-600 cursor-pointer">
            I agree to the <span className="font-semibold text-aura-charcoal">Terms of Service</span> & <span className="font-semibold text-aura-charcoal">Privacy Policy</span>
          </label>
        </div>

        <Button variant="emerald" fullWidth type="submit" size="lg" disabled={loading} icon={ArrowRight}>
          {loading ? 'Creating Account...' : 'Get Started Now'}
        </Button>

      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-aura-emerald hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
