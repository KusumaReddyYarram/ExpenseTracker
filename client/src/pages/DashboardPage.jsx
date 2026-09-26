import React, { useState, useEffect } from 'react';
import FinancialOverview from '../components/dashboard/FinancialOverview';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import SmartInsightsCard from '../components/dashboard/SmartInsightsCard';
import RecentTransactionsList from '../components/dashboard/RecentTransactionsList';
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import BudgetProgressCard from '../components/dashboard/BudgetProgressCard';
import WhatIfSimulator from '../components/dashboard/WhatIfSimulator';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getOverview } from '../services/analyticsService';
import { getTransactions } from '../services/transactionService';
import { getInsights } from '../services/insightService';
import { getBudgets } from '../services/budgetService';

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [insightsData, setInsightsData] = useState(null);
  const [budgetsData, setBudgetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      const [ovRes, txRes, inRes, bgRes] = await Promise.allSettled([
        getOverview(),
        getTransactions({ limit: 10 }),
        getInsights(),
        getBudgets()
      ]);

      if (ovRes.status === 'fulfilled' && ovRes.value.success) {
        setOverview(ovRes.value);
      }
      if (txRes.status === 'fulfilled' && txRes.value.success) {
        setTransactions(txRes.value.transactions);
      }
      if (inRes.status === 'fulfilled' && inRes.value.success) {
        setInsightsData(inRes.value);
      }
      if (bgRes.status === 'fulfilled' && bgRes.value.success) {
        setBudgetsData(bgRes.value.budgets);
      }
    } catch (err) {
      console.warn('Dashboard fetch warning:', err);
      setError('Could not refresh full live data. Using active cached insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Calculating financial behavior metrics..." />;
  }

  return (
    <div className="space-y-8">
      
      {/* Top Banner Greetings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aura-charcoal">
            Personal Finance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-aura-muted mt-1">
            Real-time behavioral insights, health metrics, and ledger overview.
          </p>
        </div>
      </div>

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      {/* Top KPI Summary Group */}
      <FinancialOverview summary={overview?.summary} />

      {/* Main Grid Section: Health Score & Smart Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-8">
          <HealthScoreCard health={insightsData?.healthScore} />
          <BudgetProgressCard budgets={budgetsData} />
        </div>
        <div className="lg:col-span-6 space-y-8">
          <SmartInsightsCard insights={insightsData?.insights} />
          <CategoryPieChart categoryData={overview?.categoryBreakdown} />
        </div>
      </div>

      {/* What-If Simulator Module */}
      <WhatIfSimulator />

      {/* Recent Transactions Stream */}
      <RecentTransactionsList
        transactions={transactions}
        onRefresh={fetchDashboardData}
        onAddClick={() => setIsModalOpen(true)}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchDashboardData}
      />

    </div>
  );
};

export default DashboardPage;
