import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const demoUser = localStorage.getItem('demoUser');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (demoUser) {
      // Demo mode - user from localStorage
      setUser(JSON.parse(demoUser));
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('demoUser'); // Clear demo mode
      setUser(user);
      
      return { success: true };
    } catch (error) {
      // If backend is not available, throw error for component to handle
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error('Backend not available');
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.removeItem('demoUser'); // Clear demo mode
      setUser(user);
      
      return { success: true };
    } catch (error) {
      // If backend is not available, throw error for component to handle
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        throw new Error('Backend not available');
      }
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('demoUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};