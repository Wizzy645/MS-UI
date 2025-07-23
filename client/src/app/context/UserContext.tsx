"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
  joinedAt?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: Omit<User, 'isAuthenticated'>) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('authToken');
        
        if (storedUser && authToken) {
          const userData = JSON.parse(storedUser);
          setUser({ ...userData, isAuthenticated: true });
        } else {
          // Set guest user as default
          setUser({
            name: "Guest",
            email: "guest@example.com",
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setUser({
          name: "Guest", 
          email: "guest@example.com",
          isAuthenticated: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = (userData: Omit<User, 'isAuthenticated'>) => {
    const userWithAuth = { ...userData, isAuthenticated: true };
    setUser(userWithAuth);
    localStorage.setItem('user', JSON.stringify(userWithAuth));
    localStorage.setItem('authToken', 'demo-token-' + Date.now());
  };

  const logout = () => {
    setUser({
      name: "Guest",
      email: "guest@example.com", 
      isAuthenticated: false
    });
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
