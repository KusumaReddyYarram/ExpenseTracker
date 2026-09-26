export const formatCurrency = (amount, currency = '₹') => {
  const numericAmount = Number(amount) || 0;
  return `${currency}${numericAmount.toLocaleString('en-IN')}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getCategoryColor = (categoryName) => {
  const colors = {
    Food: '#059669',
    Transport: '#2563EB',
    Shopping: '#7C3AED',
    Education: '#D97706',
    Entertainment: '#E11D48',
    Bills: '#475569',
    Healthcare: '#0284C7',
    Travel: '#0D9488',
    Salary: '#059669',
    Freelance: '#2563EB',
    Business: '#7C3AED',
    Other: '#64748B'
  };
  return colors[categoryName] || '#059669';
};
