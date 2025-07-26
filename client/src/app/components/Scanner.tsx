// src/components/Scanner.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Lottie from "lottie-react";
import orbAnimation from "@/animations/orb.json";
import typingDots from "@/animations/typing.json";
import { motion } from "framer-motion";
import { MdHistory, MdAdd } from "react-icons/md";
import ProfileDropdown from "./ProfileDropdown";
import SessionCard from "./SessionCard";
import EditSessionModal from "./EditSessionModal";
import { useUser } from "../context/UserContext";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

interface User {
  name?: string;
}

interface ScanResult {
  status: "scam" | "safe";
  confidence: number;
  explanation: string[];
  sources: string[];
}

interface Session {
  id: string;
  label: string;
  scans: {
    input: string;
    result: ScanResult;
  }[];
}


// Keep your Scanner component as-is
export default function Scanner({ user: propUser }: { user?: { name?: string } }) {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [editingSession, setEditingSession] = useState<{ id: string; name: string } | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const sessionKey = useMemo(() => `scanSessions-${user?.name || propUser?.name || "default"}`, [user?.name, propUser?.name]);
  const activeSession = useMemo(() => 
    sessions.find((s) => s.id === currentSessionId),
    [sessions, currentSessionId]
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load sessions and sidebar state
  useEffect(() => {
    if (!hasMounted) return;

    const saved = localStorage.getItem(sessionKey);
    const parsed: Session[] = saved ? JSON.parse(saved) : [];
    if (parsed.length > 0) {
      setSessions(parsed);
      setCurrentSessionId(parsed[0].id);
    } else {
      const id = crypto.randomUUID();
      const newSession: Session = {
        id,
        label: "New Scan",
        scans: [],
      };
      setSessions([newSession]);
      setCurrentSessionId(id);
    }

    const savedSidebarState = localStorage.getItem('sidebarOpen');
    if (savedSidebarState !== null) {
      setSidebarOpen(JSON.parse(savedSidebarState));
    } else {
      // Default to closed on mobile, open on desktop
      setSidebarOpen(window.innerWidth >= 768);
    }
  }, [sessionKey, hasMounted]);

  // Save sessions and sidebar state
  useEffect(() => {
    if (!hasMounted) return;
    localStorage.setItem(sessionKey, JSON.stringify(sessions));
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sessions, sidebarOpen, sessionKey, hasMounted]);

  // Maintain scroll position when new scans are added
// Maintain scroll position when new scans are added
useEffect(() => {
  if (!resultsContainerRef.current || !activeSession?.scans?.length) return;

  resultsContainerRef.current.scrollTo({
    top: resultsContainerRef.current.scrollHeight,
    behavior: "smooth",
  });
}, [activeSession?.scans]);


  // Responsive sidebar behavior and click outside to close
  useEffect(() => {
    if (!hasMounted) return;

    const handleResize = () => {
      // Close sidebar on mobile when resizing down
      if (window.innerWidth < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hasMounted, sidebarOpen]);

  const startNewSession = () => {
    const id = crypto.randomUUID();
    const newSession: Session = {
      id,
      label: "New Scan",
      scans: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(id);
    setInput("");
    inputRef.current?.focus();
  };

  const handleEditSessionName = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setEditingSession({ id, name: session.label });
    }
  };

  const handleDeleteSession = (id: string) => {
    if (sessions.length <= 1) {
      alert("Cannot delete the last session. At least one session must remain.");
      return;
    }

    if (confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      setSessions((prev) => prev.filter((s) => s.id !== id));

      // If we're deleting the active session, switch to another one
      if (currentSessionId === id) {
        const remainingSessions = sessions.filter((s) => s.id !== id);
        if (remainingSessions.length > 0) {
          setCurrentSessionId(remainingSessions[0].id);
        }
      }
    }
  };

  const handleSaveSessionName = (newName: string) => {
    if (editingSession) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === editingSession.id ? { ...s, label: newName.trim() } : s
        )
      );
      setEditingSession(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
  };

  const handleScan = () => {
    if (!input.trim() || !currentSessionId) return;

    // Check if user is authenticated
    if (!user?.isAuthenticated) {
      // Show authentication required notification
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="text-yellow-400">⚠️</div>
          <div>
            <div class="font-semibold">Authentication Required</div>
            <div class="text-sm text-gray-300">Please sign in to use the scanner</div>
          </div>
        </div>
      `;
      notification.className = 'fixed top-4 right-4 bg-yellow-600/90 text-white px-6 py-4 rounded-xl shadow-lg z-[9999] transition-opacity max-w-sm';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 4000);

      return;
    }

    setLoading(true);

    const fakeResult: ScanResult = {
      status: input.includes("scam") ? "scam" : "safe",
      confidence: input.includes("scam") ? 96 : 91,
      explanation: input.includes("scam")
        ? ["Matches known scam patterns", "Obfuscated domain"]
        : ["No suspicious activity detected"],
      sources: ["ScamWatch.org", "Blacklisted by DNSBL", "Verified IBM Match"],
    };

    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? {
                ...s,
                label:
                  s.label === "New Scan" && input.length > 0
                    ? input.slice(0, 20)
                    : s.label,
                scans: [...s.scans, { input, result: fakeResult }],
              }
            : s
        )
      );
      setInput("");
      setLoading(false);
      inputRef.current?.focus();
    }, 2500);
  };
  

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex bg-gradient-to-b from-black to-[#0f172a] text-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-40 h-40">
            <Lottie animationData={orbAnimation} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-black to-[#0f172a] text-white">
      {/* Sidebar Toggle Button for Mobile */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-[70] p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-300 border border-purple-400/30"
          title="Open Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[59] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative h-screen bg-[#111] border-r border-white/10 overflow-hidden transition-all duration-300 ease-in-out z-[60] ${
          sidebarOpen ? "w-72 p-4" : "w-0 p-0"
        }`}
      >
        <div className={`${sidebarOpen ? "block" : "hidden"} h-full flex flex-col overflow-y-auto no-scrollbar`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MdHistory className="text-purple-400" /> Sessions
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-red-500/20 hover:border-red-400 border border-transparent transition-all duration-200"
              title="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white hover:text-red-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6 flex justify-center">
            <ProfileDropdown user={user || undefined} />
          </div>


          <div className="space-y-2 flex-1 overflow-auto no-scrollbar">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                id={s.id}
                label={s.label}
                isActive={s.id === currentSessionId}
                scanCount={s.scans?.length || 0}
                lastUpdated={s.scans?.length > 0 ? new Date().toISOString() : undefined}
                onClick={() => setCurrentSessionId(s.id)}
                onEditName={handleEditSessionName}
                onDelete={handleDeleteSession}
              />
            ))}
          </div>

          <button
            onClick={startNewSession}
            className="mt-6 text-white bg-purple-600 hover:bg-purple-500 rounded px-3 py-2 text-sm flex items-center justify-center gap-2 w-full"
          >
            <MdAdd /> New Scan
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className={`flex-1 px-4 md:px-6 py-20 max-w-4xl mx-auto w-full pb-40 transition-all duration-300`}>
       {!activeSession?.scans?.length && !loading && (
  <div className="text-center mb-8 md:mb-12 px-2">
    <h1 className="text-2xl md:text-4xl font-bold mb-2">
      {getGreeting()}, {user?.name || propUser?.name || "Guest"}
    </h1>
    <h2 className="text-lg md:text-xl text-purple-400">
      Stay protected with AI-powered scam detection
    </h2>
    {!user?.isAuthenticated && (
      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-yellow-600/20 border border-yellow-500/30 rounded-xl max-w-md mx-auto">
        <div className="flex items-center justify-center mb-3">
          <div className="text-yellow-400 text-xl md:text-2xl">🔐</div>
        </div>
        <h3 className="text-base md:text-lg font-semibold text-yellow-400 mb-2">Authentication Required</h3>
        <p className="text-gray-300 text-xs md:text-sm mb-4">
          Sign in to access the AI-powered scam scanner and protect yourself from threats.
        </p>
        <a
          href="/login"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base"
        >
          Sign In / Register
        </a>
      </div>
    )}
  </div>
)}

        {!activeSession?.scans?.length && !loading && (
          <div className="flex justify-center mb-6 md:mb-10">
            <Lottie animationData={orbAnimation} className="w-32 md:w-40" />
          </div>
        )}

       <div
  ref={resultsContainerRef}
  className="space-y-4 md:space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] md:max-h-[calc(100vh-300px)] no-scrollbar"
>

          {activeSession?.scans?.map((scan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 p-4 rounded-lg shadow-sm"
            >
              <p className="text-sm text-gray-400 mb-1">Scanned: {scan.input}</p>
              <p
                className={`text-lg font-bold ${
                  scan.result.status === "scam"
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {scan.result.status === "scam"
                  ? "⚠��� Scam Detected"
                  : "✅ Looks Safe"}
              </p>
              <p className="text-sm mt-1">
                Confidence: {scan.result.confidence}%
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2">
                {scan.result.explanation.map((e, j) => (
                  <li key={j}>{e}</li>
                ))}
              </ul>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              className="mt-6 flex flex-col items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl px-6 py-4 shadow-lg">
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-purple-400/30 rounded-full"></div>
                  <div className="absolute inset-0 w-6 h-6 border-2 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-white mb-1">
                    AI Analyzing Content...
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <div className="text-xs text-purple-300 ml-2">
                      Checking threat databases
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className={`fixed bottom-0 left-0 right-0 px-4 md:px-6 py-4 z-50 backdrop-blur-md bg-black/20 transition-all duration-300 ${
        sidebarOpen ? "md:ml-72" : "md:ml-0"
      }`}>
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative w-full">
            <textarea
              ref={inputRef}
              className={`w-full p-3 md:p-4 rounded-xl bg-transparent text-white border border-gray-600 placeholder-gray-400 shadow-md resize-none h-20 md:h-24 pr-16 md:pr-24 text-sm md:text-base ${
                !user?.isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              placeholder={
                user?.isAuthenticated
                  ? "Paste a suspicious link or message..."
                  : "Please sign in to use the scanner..."
              }
              value={input}
              onChange={(e) => user?.isAuthenticated && setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && user?.isAuthenticated) {
                  e.preventDefault();
                  handleScan();
                }
              }}
              disabled={!user?.isAuthenticated}
            />
            <button
              onClick={handleScan}
              disabled={!input.trim() || !user?.isAuthenticated || loading}
              className={`absolute top-1/2 right-2 md:right-3 transform -translate-y-1/2 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-50 ${
                user?.isAuthenticated && !loading
                  ? 'bg-white text-black hover:bg-gray-200 hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              title={
                !user?.isAuthenticated
                  ? 'Please sign in to scan'
                  : loading
                    ? 'Scanning...'
                    : 'Scan content'
              }
            >
              {loading ? (
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Session Modal */}
      <EditSessionModal
        isOpen={editingSession !== null}
        sessionName={editingSession?.name || ""}
        onSave={handleSaveSessionName}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}
