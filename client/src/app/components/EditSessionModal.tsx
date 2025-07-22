"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiCheck } from "react-icons/fi";

interface EditSessionModalProps {
  isOpen: boolean;
  sessionName: string;
  onSave: (newName: string) => void;
  onCancel: () => void;
}

export default function EditSessionModal({
  isOpen,
  sessionName,
  onSave,
  onCancel,
}: EditSessionModalProps) {
  const [inputValue, setInputValue] = useState(sessionName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(sessionName);
  }, [sessionName]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue && trimmedValue !== sessionName) {
      onSave(trimmedValue);
    } else {
      onCancel();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Edit Session Name</h3>
            <button
              onClick={onCancel}
              className="p-1 text-gray-400 hover:text-white transition-colors rounded"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter session name..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={50}
            />

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim() || inputValue.trim() === sessionName}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <FiCheck className="w-4 h-4" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
