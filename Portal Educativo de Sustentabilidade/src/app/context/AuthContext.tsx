import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

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
    const token = localStorage.getItem('access_token');
    if (token) {
      fetch(`https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/auth/session`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setUser(data.user);
            setAccessToken(token);
          } else {
            localStorage.removeItem('access_token');
          }
        })
        .catch(err => {
          console.error('Session check error:', err);
          localStorage.removeItem('access_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password })
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.access_token || !data?.user) {
      throw new Error(data?.error || 'Login failed');
    }

    setUser(data.user);
    setAccessToken(data.access_token);
    localStorage.setItem('access_token', data.access_token);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, name })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Signup failed');
    }

    // Auto login after signup
    await login(email, password);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('access_token');
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
