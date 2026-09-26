import API from './api';

export const getBudgets = async () => {
  const response = await API.get('/budgets');
  return response.data;
};

export const setBudget = async (budgetData) => {
  const response = await API.post('/budgets', budgetData);
  return response.data;
};
