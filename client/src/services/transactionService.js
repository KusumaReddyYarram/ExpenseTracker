import API from './api';

export const getTransactions = async (params = {}) => {
  const response = await API.get('/transactions', { params });
  return response.data;
};

export const createTransaction = async (txData) => {
  const response = await API.post('/transactions', txData);
  return response.data;
};

export const updateTransaction = async (id, txData) => {
  const response = await API.put(`/transactions/${id}`, txData);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await API.delete(`/transactions/${id}`);
  return response.data;
};
