export interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
  loginCarpenter: (password: string) => Promise<void>;
}
