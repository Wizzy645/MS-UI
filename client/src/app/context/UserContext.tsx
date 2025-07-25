"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
  joinedAt?: string;
  role?: 'admin' | 'user';
  provider?: 'google' | 'email';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: Omit<User, 'isAuthenticated'>) => void;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  googleSignIn: () => Promise<void>;
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
            isAuthenticated: false,
            role: 'user'
          });
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        setUser({
          name: "Guest",
          email: "guest@example.com",
          isAuthenticated: false,
          role: 'user'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = (userData: Omit<User, 'isAuthenticated'>) => {
    const userWithAuth = {
      ...userData,
      isAuthenticated: true,
      role: userData.role || 'user'
    };
    setUser(userWithAuth);
    localStorage.setItem('user', JSON.stringify(userWithAuth));
    localStorage.setItem('authToken', 'demo-token-' + Date.now());
  };

  const logout = () => {
    setUser({
      name: "Guest",
      email: "guest@example.com",
      isAuthenticated: false,
      role: 'user'
    });
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const googleSignIn = async () => {
    try {
      // This is a simplified implementation. In production, you'd integrate with Google OAuth
      // For demo purposes, we'll simulate Google sign-in
      const mockGoogleUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'G',
        provider: 'google' as const,
        role: 'user' as const,
        joinedAt: new Date().toISOString()
      };

      login(mockGoogleUser);

      // Show success notification
      const notification = document.createElement('div');
      notification.textContent = 'Successfully signed in with Google!';
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    } catch (error) {
      console.error('Google Sign-in error:', error);
      // Show error notification
      const notification = document.createElement('div');
      notification.textContent = 'Google sign-in failed. Please try again.';
      notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading, isAdmin, googleSignIn }}>
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
