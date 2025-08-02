import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import axios from '../axios';

const AuthContext = createContext();

export const AuthProvider = React.memo(({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  // Set up axios interceptor for token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Request interceptor to add token to requests
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle auth errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/auth/login', { email, password });
      const { user: userData, token } = res.data;
      
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Set token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.post('/auth/register', userData);
      const { user: newUser, token } = res.data;
      
      setUser(newUser);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Set token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true, user: newUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useMemo(() => {
    return !!user && !!localStorage.getItem('token');
  }, [user]);

  // Check if user is admin
  const isAdmin = useMemo(() => {
    return user?.isAdmin === true;
  }, [user]);

  const contextValue = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    clearError
  }), [user, loading, error, isAuthenticated, isAdmin, login, register, logout, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
});

AuthProvider.displayName = 'AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
