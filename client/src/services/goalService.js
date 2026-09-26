import API from './api';

export const getGoals = async () => {
  const response = await API.get('/goals');
  return response.data;
};

export const createGoal = async (goalData) => {
  const response = await API.post('/goals', goalData);
  return response.data;
};

export const updateGoalProgress = async (id, savedAmount) => {
  const response = await API.put(`/goals/${id}/progress`, { savedAmount });
  return response.data;
};
