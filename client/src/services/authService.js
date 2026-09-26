import API from './api';

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('aura_token', response.data.token);
    localStorage.setItem('aura_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('aura_token', response.data.token);
    localStorage.setItem('aura_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('aura_token');
  localStorage.removeItem('aura_user');
};
