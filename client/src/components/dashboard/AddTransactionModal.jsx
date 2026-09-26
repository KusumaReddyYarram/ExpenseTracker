import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from '../../utils/constants';
import { createTransaction } from '../../services/transactionService';

const AddTransactionModal = ({ isOpen, onClose, onSuccess }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) {
      setError('Please provide amount and description.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await createTransaction({
        type,
        amount: Number(amount),
        category,
        description,
        paymentMethod,
        notes,
        date: new Date()
      });

      if (res.success) {
        setAmount('');
        setDescription('');
        setNotes('');
        onSuccess && onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log New Transaction">
      <ErrorMessage message={error} onDismiss={() => setError('')} />

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Income / Expense Switch */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setCategory('Food');
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              type === 'expense'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setCategory('Salary');
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              type === 'income'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Income
          </button>
        </div>

        {/* Amount Input */}
        <Input
          label="Amount (₹)"
          type="number"
          step="0.01"
          placeholder="e.g. 1500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        {/* Description Input */}
        <Input
          label="Description"
          placeholder="e.g. Grocery Shopping at Supermarket"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Category Select */}
        <div>
          <label className="block text-xs font-semibold text-aura-muted uppercase tracking-wider mb-1.5">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white text-aura-charcoal text-sm py-2.5 px-3.5 focus:ring-2 focus:ring-aura-emerald focus:outline-none"
          >
            {(type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-xs font-semibold text-aura-muted uppercase tracking-wider mb-1.5">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full rounded-xl border border-slate-200 bg-white text-aura-charcoal text-sm py-2.5 px-3.5 focus:ring-2 focus:ring-aura-emerald focus:outline-none"
          >
            {PAYMENT_METHODS.map((pm) => (
              <option key={pm} value={pm}>
                {pm}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex gap-3">
          <Button variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button variant="emerald" fullWidth type="submit" disabled={loading}>
            {loading ? 'Logging...' : 'Save Transaction'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default AddTransactionModal;
