import React, { createContext, useState, useEffect } from 'react';
import { registerUser as registerApi, loginUser as loginApi, logoutUser as logoutApi, getMe } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aura_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('aura_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('aura_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Session expired or invalid token:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    setError(null);
    try {
      const res = await loginApi(credentials);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const res = await registerApi(userData);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setError(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        error,
        setError,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
