'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type UserData = Token;

type AuthState = {
  isLoggedIn: boolean;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};


export const AuthContext = createContext<AuthState | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const initialUserData = Cookies.get('authToken') ? JSON.parse(Cookies.get('authToken') ?? '') : null;
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post<Token>('/auth/login', {
        username,
        password
      });
      setLoading(false);
      setIsLoggedIn(true);
      setUserData(response.data);
      Cookies.set('authToken', JSON.stringify(response.data), { expires: 7 });
      router.push('/');
    } catch (err) {
      setLoading(false);
      setIsLoggedIn(false);
      setUserData(null);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const logout = () => {
    Cookies.remove('auth');
    setIsLoggedIn(false);
    setUserData(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, userData, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
