import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signIn, signUp, getUserFromToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => void;
  updateUser: (updates: { username?: string; email?: string }) => Promise<void>;
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
    const token = localStorage.getItem('auth_token');
    if (token) {
      getUserFromToken(token).then((user) => {
        if (user) {
          setUser(user);
        } else {
          localStorage.removeItem('auth_token');
        }
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('auth_token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    const { user, token } = await signIn(email, password);
    localStorage.setItem('auth_token', token);
    setUser(user);
  };

  const handleSignUp = async (email: string, password: string, username: string) => {
    const user = await signUp(email, password, username);
    const { user: signedInUser, token } = await signIn(email, password);
    localStorage.setItem('auth_token', token);
    setUser(signedInUser);
  };

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const handleUpdateUser = async (updates: { username?: string; email?: string }) => {
    if (!user) throw new Error('No user logged in');
    const updatedUser = await updateUser(user.id, updates);
    setUser(updatedUser);
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
