import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { Search, Filter, Trash2, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { deleteTransaction } from '../../services/transactionService';

const RecentTransactionsList = ({ transactions = [], onRefresh, onAddClick }) => {
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const handleDelete = async (id) => {
    if (window.confirm('Delete this transaction?')) {
      try {
        await deleteTransaction(id);
        onRefresh && onRefresh();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  const filtered = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-aura-charcoal">Recent Transactions</h3>
          <p className="text-xs text-slate-500">Live ledger stream & management</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="emerald" size="sm" onClick={onAddClick} icon={Plus}>
            Log Transaction
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search description or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-aura-emerald focus:outline-none bg-slate-50"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 gap-1">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                filterType === t
                  ? 'bg-white text-aura-charcoal shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="divide-y divide-slate-100 overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No transactions match the selected filter.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t._id || t.id}
              className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    t.type === 'income'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {t.type === 'income' ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-aura-charcoal">{t.description}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{t.category}</span>
                    <span>•</span>
                    <span>{formatDate(t.date)}</span>
                    {t.paymentMethod && (
                      <>
                        <span>•</span>
                        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px]">
                          {t.paymentMethod}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-extrabold ${
                    t.type === 'income' ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => handleDelete(t._id || t.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 transition-all rounded-lg hover:bg-rose-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentTransactionsList;
