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
export default function Scanner({ user }: { user: { name?: string } }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [editingSession, setEditingSession] = useState<{ id: string; name: string } | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sessionKey = useMemo(() => `scanSessions-${user?.name || "default"}`, [user?.name]);
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
    } else if (window.innerWidth < 768) {
      setSidebarOpen(false);
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


  // Responsive sidebar behavior
  useEffect(() => {
    if (!hasMounted) return;
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasMounted]);

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

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen bg-[#111] border-r border-white/10 p-4 overflow-y-auto no-scrollbar transition-all duration-300 ease-in-out z-[60] ${
          sidebarOpen ? "w-72" : "w-0"
        }`}
      >
        <div className={`${sidebarOpen ? "block" : "hidden"} h-full flex flex-col`}>
          <div className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-semibold flex items-center gap-2">
    <MdHistory className="text-purple-400" /> Sessions
  </h2>
  
  <div className="mt-6  pt-4 flex justify-center">
    <ProfileDropdown userEmail={user?.name || "unknown@domain.com"} />
    <button
      onClick={() => setSidebarOpen(false)}
      className="p-1 rounded hover:bg-white/10 transition"
      title="Collapse"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
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
      <div className={`flex-1 px-6 py-20 max-w-4xl mx-auto w-full pb-40 transition-all duration-300 ${
        sidebarOpen ? "md:left-72" : "left-0"
      }`}>
       {!activeSession?.scans?.length && !loading && (
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-2">
      {getGreeting()}, {user?.name}
    </h1>
    <h2 className="text-xl text-purple-400">
      Stay protected with AI-powered scam detection
    </h2>
  </div>
)}

        {!activeSession?.scans?.length && !loading && (
          <div className="flex justify-center mb-10">
            <Lottie animationData={orbAnimation} className="w-40" />
          </div>
        )}

       <div 
  ref={resultsContainerRef}
  className="space-y-6 overflow-y-auto max-h-[calc(100vh-300px)] no-scrollbar"
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
                  ? "⚠️ Scam Detected"
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
            <div className="mt-6 flex justify-start">
              <Lottie animationData={typingDots} className="w-24" />
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className={`fixed bottom-0 right-0 px-6 py-4 z-50 backdrop-blur transition-all duration-300 ${
        sidebarOpen ? "md:left-72" : "left-0"
      }`}>
        <div className="max-w-2xl mx-auto">
          <div className="relative w-full">
            <textarea
              ref={inputRef}
              className="w-full p-4 rounded-xl bg-transparent text-white border border-gray-600 placeholder-gray-400 shadow-md resize-none h-24 pr-24"
              placeholder="Paste a suspicious link or message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleScan();
                }
              }}
            />
            <button
              onClick={handleScan}
              disabled={!input.trim()}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200 transition disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
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
