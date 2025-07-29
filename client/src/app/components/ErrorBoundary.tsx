"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error, but suppress MetaMask/extension errors
    if (
      error.message?.includes('MetaMask') ||
      error.message?.includes('ethereum') ||
      error.message?.includes('chrome-extension') ||
      error.stack?.includes('chrome-extension')
    ) {
      // Suppress MetaMask and browser extension errors
      console.warn('Browser extension error suppressed:', error.message);
      this.setState({ hasError: false, error: undefined });
      return;
    }

    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      // Don't show error UI for MetaMask/extension errors
      if (
        this.state.error.message?.includes('MetaMask') ||
        this.state.error.message?.includes('ethereum') ||
        this.state.error.message?.includes('chrome-extension')
      ) {
        return this.props.children;
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              An unexpected error occurred. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
