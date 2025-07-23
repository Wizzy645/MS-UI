"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          className={`p-2.5 rounded-xl transition-all duration-200 border ${
            isDropdownOpen
              ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-400/50 opacity-100 scale-110"
              : "hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:border-purple-400/30 border-transparent opacity-0 group-hover:opacity-100 hover:scale-105"
          } ${isActive ? "text-white" : "text-gray-400"}`}
          aria-label="Session options"
          title="Session options"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Enhanced Professional Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed z-[100]"
          style={{
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
            left: buttonRef.current ? buttonRef.current.getBoundingClientRect().right - 280 : 0,
          }}
        >
          <div className="w-70 bg-[#1e1e1e] border border-gray-600 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
            {/* Session Info Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-gray-600">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400'
                    : 'bg-gray-700 text-gray-300 border-gray-500'
                }`}>
                  {scanCount || 0}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate" title={label}>
                    {label}
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <span>{scanCount} scan{scanCount !== 1 ? 's' : ''}</span>
                    {lastUpdated && (
                      <>
                        <span>•</span>
                        <span>{formatLastUpdated(lastUpdated)}</span>
                      </>
                    )}
                    {isActive && (
                      <>
                        <span>•</span>
                        <span className="text-green-400 flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="py-2">
              <button
                onClick={handleEditClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/40 transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Edit Session</div>
                  <div className="text-xs text-gray-500">Rename this session</div>
                </div>
              </button>

              <div className="border-t border-gray-700 mt-2 pt-2">
                <button
                  onClick={handleDeleteClick}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-700/20 hover:text-red-300 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center group-hover:bg-red-600/40 transition-colors">
                    <FiTrash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Delete Session</div>
                    <div className="text-xs text-gray-500">Permanently remove this session</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Session Indicator */}
      {isActive && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-400 rounded-r-full" />
      )}
    </div>
  );
}
