"use client";

import React, { useState } from "react";
import SessionCard from "../components/SessionCard";
import EditSessionModal from "../components/EditSessionModal";

interface Session {
  id: string;
  label: string;
  scanCount: number;
  lastUpdated: string;
}

export default function SessionDemoPage() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      label: "Suspicious Email Check",
      scanCount: 5,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    },
    {
      id: "2", 
      label: "New Scan",
      scanCount: 0,
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "3",
      label: "WhatsApp Link Verification",
      scanCount: 12,
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: "4",
      label: "Banking Scam Investigation", 
      scanCount: 8,
      lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
  ]);

  const [activeSessionId, setActiveSessionId] = useState("1");
  const [editingSession, setEditingSession] = useState<{ id: string; name: string } | null>(null);

  const handleSessionClick = (id: string) => {
    setActiveSessionId(id);
  };

  const handleEditName = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (session) {
      setEditingSession({ id, name: session.label });
    }
  };

  const handleDeleteSession = (id: string) => {
    if (confirm("Are you sure you want to delete this session?")) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (activeSessionId === id) {
        const remainingSessions = sessions.filter((s) => s.id !== id);
        setActiveSessionId(remainingSessions[0]?.id || "");
      }
    }
  };

  const handleSaveSessionName = (newName: string) => {
    if (editingSession) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === editingSession.id ? { ...s, label: newName } : s
        )
      );
      setEditingSession(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0f172a] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-purple-400">
            SessionCard Component Demo
          </h1>
          <p className="text-gray-400">
            Interactive demo showcasing the SessionCard component with dropdown menus,
            edit functionality, and responsive design.
          </p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-purple-400">📋</span>
            Session List
          </h2>

          <div className="space-y-3">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                id={session.id}
                label={session.label}
                isActive={session.id === activeSessionId}
                scanCount={session.scanCount}
                lastUpdated={session.lastUpdated}
                onClick={() => handleSessionClick(session.id)}
                onEditName={handleEditName}
                onDelete={handleDeleteSession}
              />
            ))}
          </div>

          {sessions.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No sessions available.</p>
              <p className="text-sm mt-2">All sessions have been deleted.</p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-[#111] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Features</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Click anywhere on a card to make it active</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Hover to reveal the three-dot menu button</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Dropdown menu with edit and delete options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Click outside or press Escape to close dropdown</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Mobile responsive design</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Active session indicator with pulse animation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span>Scan count and relative time display</span>
            </li>
          </ul>
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
