import API from './api';

export const getInsights = async () => {
  const response = await API.get('/insights');
  return response.data;
};

export const simulateWhatIf = async (params) => {
  const response = await API.post('/insights/simulate', params);
  return response.data;
};
