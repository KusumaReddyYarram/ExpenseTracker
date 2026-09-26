import API from './api';

export const getOverview = async () => {
  const response = await API.get('/analytics/overview');
  return response.data;
};
