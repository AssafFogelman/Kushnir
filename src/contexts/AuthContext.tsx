import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSessionCookie, deleteSessionCookie, hasValidSession } from '@/lib/cookies';
import { useLanguage } from '@/hooks/useLanguage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    // Check for existing session on mount
    if (hasValidSession()) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string) => {
    // TODO: Replace with actual API call
    if (password === 'admin123') {
      // Temporary hardcoded password for testing
      setIsAuthenticated(true);
      setSessionCookie();
      navigate('/admin');
    } else {
      throw new Error(t('adminLogin.invalidPassword'));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    deleteSessionCookie();
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
