import React, { useState, useEffect } from 'react';
import BudgetProgressCard from '../components/dashboard/BudgetProgressCard';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { EXPENSE_CATEGORIES } from '../utils/constants';
import { getBudgets, setBudget } from '../services/budgetService';

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchBudgetsData = async () => {
    try {
      const res = await getBudgets();
      if (res.success) {
        setBudgets(res.budgets);
      }
    } catch (err) {
      setError('Failed to fetch budget list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetsData();
  }, []);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid target budget amount.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await setBudget({ category, amount: Number(amount) });
      if (res.success) {
        setAmount('');
        fetchBudgetsData();
      }
    } catch (err) {
      setError('Could not update category budget limit.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading budget thresholds..." />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-aura-charcoal">Budget Management</h1>
        <p className="text-xs text-slate-500 mt-1">Configure spending limits per category and monitor threshold alerts.</p>
      </div>

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Set Category Budget */}
        <div className="lg:col-span-5">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-aura-charcoal pb-2 border-b border-slate-100">
              Set Category Budget Limit
            </h3>

            <form onSubmit={handleSetBudget} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-aura-muted uppercase tracking-wider mb-1.5">
                  Expense Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-white text-aura-charcoal text-sm py-2.5 px-3.5 focus:ring-2 focus:ring-aura-emerald focus:outline-none"
                >
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Monthly Limit Amount (₹)"
                type="number"
                placeholder="e.g. 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <Button variant="emerald" fullWidth type="submit" disabled={saving}>
                {saving ? 'Updating Budget...' : 'Save Category Budget'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Right List: Budget Progress Cards */}
        <div className="lg:col-span-7">
          <BudgetProgressCard budgets={budgets} />
        </div>

      </div>
    </div>
  );
};

export default BudgetsPage;
