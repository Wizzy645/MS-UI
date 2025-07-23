"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

interface SessionCardProps {
  id: string;
  label: string;
  isActive?: boolean;
  scanCount?: number;
  lastUpdated?: string;
  onClick?: () => void;
  onEditName?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function SessionCard({
  id,
  label,
  isActive = false,
  scanCount = 0,
  lastUpdated,
  onClick,
  onEditName,
  onDelete,
}: SessionCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    onEditName?.(id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    onDelete?.(id);
  };

  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div
      className={`group relative flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
        isActive
          ? "bg-purple-700 text-white shadow-lg shadow-purple-500/20"
          : "bg-white/5 hover:bg-white/10 text-gray-300"
      }`}
      onClick={onClick}
    >
      {/* Session Info */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className={`text-sm font-medium truncate ${
              isActive ? "text-white" : "text-gray-200"
            }`}
            title={label}
          >
            {label}
          </h3>
          {isActive && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-3 text-xs">
          {scanCount > 0 && (
            <span
              className={`${
                isActive ? "text-purple-200" : "text-gray-400"
              }`}
            >
              {scanCount} scan{scanCount !== 1 ? "s" : ""}
            </span>
          )}
          {lastUpdated && (
            <span
              className={`${
                isActive ? "text-purple-200" : "text-gray-500"
              }`}
            >
              {formatLastUpdated(lastUpdated)}
            </span>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="relative flex-shrink-0">
        <button
          ref={buttonRef}
          onClick={handleDropdownToggle}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDropdownOpen
              ? "bg-white/20 scale-110"
              : "hover:bg-white/10 opacity-0 group-hover:opacity-100 hover:scale-110"
          } ${isActive ? "text-white" : "text-gray-400"}`}
          aria-label="Session options"
          title="Session options"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="fixed inset-0 z-[100] flex items-start justify-end p-4 pointer-events-none"
          >
            <div
              className="w-56 sm:w-64 bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-xl overflow-hidden pointer-events-auto animate-fade-in-down"
              style={{
                position: 'absolute',
                top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
                right: window.innerWidth - (buttonRef.current ? buttonRef.current.getBoundingClientRect().right : 0),
              }}
            >
              {/* Session Info Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'bg-gray-600 text-gray-300'
                  }`}>
                    {scanCount || 0}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white truncate max-w-[150px]" title={label}>{label}</div>
                    <div className="text-xs text-gray-400">
                      {scanCount} scan{scanCount !== 1 ? 's' : ''} {lastUpdated && `• ${formatLastUpdated(lastUpdated)}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Options */}
              <div className="py-2">
                <button
                  onClick={handleEditClick}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 flex items-center transition-colors"
                >
                  <FiEdit2 className="mr-3 w-4 h-4" /> Edit Name
                </button>
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={handleDeleteClick}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-600/20 flex items-center transition-colors"
                  >
                    <FiTrash2 className="mr-3 w-4 h-4" /> Delete Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Session Indicator */}
      {isActive && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-400 rounded-r-full" />
      )}
    </div>
  );
}
