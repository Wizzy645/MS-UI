"use client";

import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAdmin, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user?.isAuthenticated) {
        // Not authenticated, redirect to login
        router.push('/login');
      } else if (!isAdmin) {
        // Authenticated but not admin, redirect to scanner (user dashboard)
        router.push('/scanner');
        
        // Show notification that admin access is required
        const notification = document.createElement('div');
        notification.textContent = 'Admin access required. Redirected to user dashboard.';
        notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      }
    }
  }, [user, isAdmin, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not authenticated or not admin
  if (!user?.isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <div className="text-white text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-6">
            This area is restricted to administrators only.
          </p>
          <button
            onClick={() => router.push('/scanner')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and is admin, render children
  return <>{children}</>;
}
