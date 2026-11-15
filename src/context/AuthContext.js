
'use client';

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  useBrowserSession,
  notifyAuthChange,
} from '@/lib/browserSession';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const session = useBrowserSession();

  const login = (newToken, newUser) => {
    localStorage.setItem('indolex_token', newToken);
    localStorage.setItem('indolex_user', JSON.stringify(newUser));

    // Notify same-tab subscribers such as Navbar and Hero.
    notifyAuthChange();
  };

  const logout = () => {
    localStorage.removeItem('indolex_token');
    localStorage.removeItem('indolex_user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');

    notifyAuthChange();
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        token: session.token,
        loading: session.loading,
        isAuthenticated: session.isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
