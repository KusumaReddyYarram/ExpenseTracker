import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Target, Plus, CheckCircle2, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { getGoals, createGoal, updateGoalProgress } from '../services/goalService';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');
  const [category, setCategory] = useState('Tech');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchGoalsData = async () => {
    try {
      const res = await getGoals();
      if (res.success) {
        setGoals(res.goals);
      }
    } catch (err) {
      setError('Could not load financial goals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalsData();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!title || !targetAmount) {
      setError('Please provide goal title and target amount.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await createGoal({
        title,
        targetAmount: Number(targetAmount),
        savedAmount: Number(savedAmount || 0),
        category
      });
      if (res.success) {
        setTitle('');
        setTargetAmount('');
        setSavedAmount('');
        fetchGoalsData();
      }
    } catch (err) {
      setError('Could not add financial goal.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddContribution = async (goalId, currentSaved, increment = 1000) => {
    const updated = currentSaved + increment;
    try {
      await updateGoalProgress(goalId, updated);
      fetchGoalsData();
    } catch (err) {
      console.error('Failed to contribute', err);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching financial goals..." />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-aura-charcoal">Financial Goals Pathway</h1>
        <p className="text-xs text-slate-500 mt-1">Set long-term milestones and track your wealth accumulation target progress.</p>
      </div>

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Add Goal Form */}
        <div className="lg:col-span-5">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-aura-charcoal pb-2 border-b border-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-aura-emerald" /> Create New Goal
            </h3>

            <form onSubmit={handleAddGoal} className="space-y-4">
              <Input
                label="Goal Title"
                placeholder="e.g. New M3 MacBook Pro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Input
                label="Target Amount (₹)"
                type="number"
                placeholder="e.g. 80000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />

              <Input
                label="Initial Saved Amount (₹)"
                type="number"
                placeholder="e.g. 15000"
                value={savedAmount}
                onChange={(e) => setSavedAmount(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold text-aura-muted uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-white text-aura-charcoal text-sm py-2.5 px-3.5 focus:ring-2 focus:ring-aura-emerald focus:outline-none"
                >
                  <option value="Tech">Tech & Gadgets</option>
                  <option value="Vehicle">Vehicle / Travel</option>
                  <option value="Savings">Emergency Fund</option>
                  <option value="Education">Education</option>
                  <option value="General">General Milestone</option>
                </select>
              </div>

              <Button variant="emerald" fullWidth type="submit" disabled={saving}>
                {saving ? 'Creating Goal...' : 'Add Financial Goal'}
              </Button>
            </form>
          </Card>
        </div>

        {/* Goals List */}
        <div className="lg:col-span-7 space-y-4">
          {goals.map((g) => {
            const percent = Math.min(100, Math.round(((g.savedAmount || 0) / (g.targetAmount || 1)) * 100));
            const isCompleted = percent >= 100;

            return (
              <Card key={g._id || g.id} className="space-y-3 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-aura-emerald flex items-center justify-center font-bold">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-aura-charcoal">{g.title}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{g.category}</span>
                    </div>
                  </div>
                  <Badge variant={isCompleted ? 'income' : 'neutral'}>
                    {isCompleted ? 'Achieved!' : `${percent}% Saved`}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Progress: {formatCurrency(g.savedAmount)}</span>
                    <span>Target: {formatCurrency(g.targetAmount)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-aura-emerald h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                {!isCompleted && (
                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddContribution(g._id || g.id, g.savedAmount || 0, 2000)}
                    >
                      + Add ₹2,000 Deposit
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default GoalsPage;
