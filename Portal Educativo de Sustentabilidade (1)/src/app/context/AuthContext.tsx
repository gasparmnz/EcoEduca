import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('eco_user');
    const storedToken = localStorage.getItem('eco_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const accounts = JSON.parse(localStorage.getItem('eco_accounts') || '[]');
    const account = accounts.find((a: any) => a.email === email && a.password === password);

    if (!account) {
      throw new Error('Email ou senha inválidos');
    }

    const token = `token_${Date.now()}`;
    const userData: User = {
      id: account.id,
      email: account.email,
      user_metadata: { name: account.name }
    };

    setUser(userData);
    setAccessToken(token);
    localStorage.setItem('eco_user', JSON.stringify(userData));
    localStorage.setItem('eco_token', token);
  };

  const signup = async (email: string, password: string, name: string) => {
    const accounts = JSON.parse(localStorage.getItem('eco_accounts') || '[]');

    if (accounts.find((a: any) => a.email === email)) {
      throw new Error('Este email já está cadastrado');
    }

    const newAccount = { id: `user_${Date.now()}`, email, password, name };
    accounts.push(newAccount);
    localStorage.setItem('eco_accounts', JSON.stringify(accounts));

    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('eco_user');
    localStorage.removeItem('eco_token');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
