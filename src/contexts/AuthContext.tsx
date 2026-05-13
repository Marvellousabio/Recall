import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signIn, signUp, getUserFromToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: Partial<Pick<User, 'username' | 'email'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      getUserFromToken(token).then((user) => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('auth_token');
        setLoading(false);
      });
    } else {
      // Demo mode: Don't auto-login, let users sign in manually
      setLoading(false);
    }
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { user, token } = await signIn(email, password);
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    try {
      const user = await signUp(email, password, username);
      // Don't auto-sign in after signup - user needs to verify email or just sign in manually
      // For now, we'll keep it simple
      const { user: signedInUser, token } = await signIn(email, password);
      localStorage.setItem('auth_token', token);
      setUser(signedInUser);
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const handleUpdateUser = async (updates: Partial<Pick<User, 'username' | 'email'>>) => {
    if (!user) throw new Error('No user logged in');

    try {
      const updatedUser = await import('@/lib/auth').then(m => m.updateUser(user.id, updates));
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateUser: handleUpdateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}