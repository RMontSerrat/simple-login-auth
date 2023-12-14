'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import api from '@/app/services/api';
import { Token } from '@/app/services/types';

type UserData = Token;

type AuthState = {
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
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post<Token>('/auth/login', {
        username,
        password
      });
      setLoading(false);
      setUserData(response.data);
      Cookies.set('authToken', JSON.stringify(response.data), { expires: 7 });
      router.push('/');
    } catch (err) {
      setLoading(false);
      setUserData(null);
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUserData(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ loading, userData, error, login, logout }}>
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
