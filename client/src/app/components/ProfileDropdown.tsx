"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdLogout, MdPerson, MdSettings, MdDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

interface ProfileDropdownProps {
  userEmail?: string;
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    isAuthenticated?: boolean;
    role?: 'admin' | 'user';
  };
}

const ProfileDropdown = ({ userEmail, user }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user: contextUser, isAdmin } = useUser();

  // Use context user if available, fallback to prop user
  const currentUser = contextUser || user;

  // Determine user info
  const isGuest = !currentUser?.isAuthenticated && (!userEmail || userEmail.includes("unknown") || userEmail.includes("guest"));
  const displayName = currentUser?.name || (userEmail && !userEmail.includes("unknown") ? userEmail.split("@")[0] : "Guest");
  const displayEmail = currentUser?.email || userEmail || "guest@example.com";
  const initials = currentUser?.avatar || displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    console.log("User logged out");
    setIsOpen(false);
    // Redirect to login or home
    router.push('/login');
  };

  const handleLogin = () => {
    setIsOpen(false);
    router.push('/login');
  };

  const handleDashboard = () => {
    setIsOpen(false);
    router.push('/dashboard');
  };

  const handleProfile = () => {
    setIsOpen(false);
    // Redirect to user-specific profile page for regular users, admin profile for admins
    if (isAdmin) {
      router.push('/dashboard/profile');
    } else {
      router.push('/profile');
    }
  };

  const handleSettings = () => {
    setIsOpen(false);
    // Redirect to user-specific settings page for regular users, admin settings for admins
    if (isAdmin) {
      router.push('/dashboard/settings');
    } else {
      router.push('/settings');
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(displayEmail);
    // Use a better notification instead of alert
    const notification = document.createElement('div');
    notification.textContent = `Email copied to clipboard!`;
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-[9999] transition-opacity';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-8 h-8 rounded-full text-white transition-all duration-200 hover:scale-110 ${
          isGuest
            ? 'bg-gray-600 hover:bg-gray-700 border-2 border-gray-500'
            : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-2 border-purple-400/30'
        }`}
        title={isGuest ? 'Guest User - Click to Login' : `${displayName} - Click for options`}
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in-down">
          {/* User Info Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                isGuest ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-purple-700'
              }`}>
                {initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  {displayName}
                  {isAdmin && (
                    <span className="text-xs bg-purple-600 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div
                  onClick={copyEmailToClipboard}
                  className="text-xs text-gray-400 hover:text-purple-400 cursor-pointer transition-colors"
                  title="Click to copy email"
                >
                  {displayEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="py-2">
            {isGuest ? (
              <button
                onClick={handleLogin}
                className="w-full text-left px-4 py-3 text-sm text-purple-400 hover:bg-purple-600/20 flex items-center transition-colors"
              >
                <MdPerson className="mr-3" /> Sign In
              </button>
            ) : (
              <>
                {/* Only show Dashboard link for admin users */}
                {isAdmin && (
                  <button
                    onClick={handleDashboard}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center transition-colors"
                  >
                    <MdDashboard className="mr-3" /> Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center transition-colors"
                >
                  <MdPerson className="mr-3" /> Profile
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center transition-colors"
                >
                  <MdSettings className="mr-3" /> Settings
                </button>
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-600/20 flex items-center transition-colors"
                  >
                    <MdLogout className="mr-3" /> Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
