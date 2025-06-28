"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdLogout } from "react-icons/md";

const ProfileDropdown = ({ userEmail }: { userEmail: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    console.log("User logged out");
    setIsOpen(false);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(userEmail);
    alert(`User ID (${userEmail}) has been copied to clipboard!`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
      >
        {userEmail.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div 
            onClick={copyEmailToClipboard}
            className="px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 cursor-pointer border-b border-gray-700"
          >
            {userEmail}
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center"
          >
            <MdLogout className="mr-2" /> Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
