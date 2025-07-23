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
              ? "bg-white/20 opacity-100"
              : "hover:bg-white/10 opacity-0 group-hover:opacity-100"
          } ${isActive ? "text-white" : "text-gray-400"}`}
          aria-label="Session options"
          title="Session options"
        >
          <FiMoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Dropdown Menu - Portal to prevent hover conflicts */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="fixed z-50"
          style={{
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
            left: buttonRef.current ? buttonRef.current.getBoundingClientRect().right - 192 : 0,
          }}
        >
          <div className="w-48 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-xl py-1 animate-fade-in-down">
            <button
              onClick={handleEditClick}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-150"
            >
              <FiEdit2 className="w-4 h-4" />
              Edit session name
            </button>

            <button
              onClick={handleDeleteClick}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150"
            >
              <FiTrash2 className="w-4 h-4" />
              Delete session
            </button>
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
