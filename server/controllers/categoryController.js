const DEFAULT_EXPENSE_CATEGORIES = [
  { name: 'Food', type: 'expense', icon: 'Utensils', color: '#059669' },
  { name: 'Transport', type: 'expense', icon: 'Car', color: '#2563EB' },
  { name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: '#7C3AED' },
  { name: 'Education', type: 'expense', icon: 'GraduationCap', color: '#D97706' },
  { name: 'Entertainment', type: 'expense', icon: 'Film', color: '#E11D48' },
  { name: 'Bills', type: 'expense', icon: 'Receipt', color: '#475569' },
  { name: 'Healthcare', type: 'expense', icon: 'HeartPulse', color: '#0284C7' },
  { name: 'Travel', type: 'expense', icon: 'Plane', color: '#0D9488' },
  { name: 'Other', type: 'expense', icon: 'MoreHorizontal', color: '#64748B' }
];

const DEFAULT_INCOME_CATEGORIES = [
  { name: 'Salary', type: 'income', icon: 'Briefcase', color: '#059669' },
  { name: 'Freelance', type: 'income', icon: 'Laptop', color: '#2563EB' },
  { name: 'Business', type: 'income', icon: 'Building', color: '#7C3AED' },
  { name: 'Other', type: 'income', icon: 'DollarSign', color: '#64748B' }
];

const getCategories = async (req, res) => {
  return res.json({
    success: true,
    expenseCategories: DEFAULT_EXPENSE_CATEGORIES,
    incomeCategories: DEFAULT_INCOME_CATEGORIES
  });
};

module.exports = {
  getCategories
};
