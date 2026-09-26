import React, { useState, useEffect } from 'react';
import RecentTransactionsList from '../components/dashboard/RecentTransactionsList';
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { getTransactions } from '../services/transactionService';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchTx = async () => {
    try {
      const res = await getTransactions({ limit: 100 });
      if (res.success) {
        setTransactions(res.transactions);
      }
    } catch (err) {
      setError('Could not load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTx();
  }, []);

  if (loading) return <LoadingSpinner message="Fetching transaction ledger..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-aura-charcoal">Transaction Management</h1>
        <p className="text-xs text-slate-500 mt-1">Search, filter, and review all income and expense logs.</p>
      </div>

      <ErrorMessage message={error} onDismiss={() => setError('')} />

      <RecentTransactionsList
        transactions={transactions}
        onRefresh={fetchTx}
        onAddClick={() => setIsModalOpen(true)}
      />

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTx}
      />
    </div>
  );
};

export default TransactionsPage;
