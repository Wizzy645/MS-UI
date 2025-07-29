"use client";

import { useEffect } from "react";

export default function PreventMetaMask() {
  useEffect(() => {
    // Prevent MetaMask from injecting ethereum object
    if (typeof window !== 'undefined') {
      // Override ethereum object to prevent MetaMask errors
      Object.defineProperty(window, 'ethereum', {
        value: undefined,
        writable: false,
        configurable: false
      });

      // Suppress MetaMask-related errors
      const originalError = console.error;
      console.error = (...args) => {
        const message = args.join(' ');
        if (
          message.includes('MetaMask') ||
          message.includes('ethereum') ||
          message.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn')
        ) {
          // Suppress MetaMask errors
          return;
        }
        originalError.apply(console, args);
      };

      // Add global error handler to catch unhandled MetaMask errors
      window.addEventListener('error', (event) => {
        if (
          event.error?.message?.includes('MetaMask') ||
          event.error?.message?.includes('ethereum') ||
          event.filename?.includes('chrome-extension')
        ) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      });

      // Handle unhandled promise rejections from MetaMask
      window.addEventListener('unhandledrejection', (event) => {
        if (
          event.reason?.message?.includes('MetaMask') ||
          event.reason?.message?.includes('ethereum') ||
          String(event.reason).includes('chrome-extension')
        ) {
          event.preventDefault();
          return false;
        }
      });
    }
  }, []);

  return null;
}
