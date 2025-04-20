import { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSessionCookie, deleteSessionCookie, hasValidSession } from '@/lib/cookies';
import { AuthContext } from './AuthContextDef';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on mount
    if (hasValidSession()) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string) => {
    // TODO: Replace with actual API call
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setSessionCookie();
      navigate('/admin');
    } else {
      throw new Error('Invalid password');
    }
  };

  const loginCarpenter = async (password: string) => {
    if (password === 'carpenter123') {
      setIsAuthenticated(true);
      setSessionCookie();
      navigate('/carpenter');
    } else {
      throw new Error('Invalid password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    deleteSessionCookie();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loginCarpenter }}>
      {children}
    </AuthContext.Provider>
  );
};
