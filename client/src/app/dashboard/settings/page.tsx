"use client";

import { useState, useEffect } from "react";
import {
  MdOutlineLock,
  MdOutlineDelete,
  MdToggleOff,
  MdToggleOn,
  MdDownload,
  MdRestore,
  MdOutlineNotificationsActive,
  MdShield,
} from "react-icons/md";

function usePersistentToggle(key: string, defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(() => {
    if (typeof window === "undefined") return defaultValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

export default function SettingsPage() {
  const [twoFA, setTwoFA] = usePersistentToggle("twoFA", false);
  const [notifications, setNotifications] = usePersistentToggle("notifications", true);
  const [experimental, setExperimental] = usePersistentToggle("experimental", false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    alert("Account deleted (not really, this is a demo).");
  };

  const handleReset = () => {
    setTwoFA(false);
    setNotifications(true);
    setExperimental(false);

    localStorage.setItem("twoFA", JSON.stringify(false));
    localStorage.setItem("notifications", JSON.stringify(true));
    localStorage.setItem("experimental", JSON.stringify(false));
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a]">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>

      <section className="space-y-6 max-w-2xl">
        <h2 className="text-white/60 uppercase text-sm tracking-wider">Security</h2>
        <SettingRow
          title="Two-Factor Authentication"
          description="Add an extra layer of security."
          icon={<MdOutlineLock />}
          active={twoFA}
          toggle={() => setTwoFA(!twoFA)}
        />

        <SettingRow
          title="AI Trust Score (Experimental)"
          description="Enable AI-based user trust scoring."
          icon={<MdShield />}
          active={experimental}
          toggle={() => setExperimental(!experimental)}
        />

        <h2 className="text-white/60 uppercase text-sm tracking-wider mt-8">Notifications</h2>
        <SettingRow
          title="Email & Scan Alerts"
          description="Receive updates for suspicious activity."
          icon={<MdOutlineNotificationsActive />}
          active={notifications}
          toggle={() => setNotifications(!notifications)}
        />

        <h2 className="text-white/60 uppercase text-sm tracking-wider mt-8">Data</h2>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 px-6 rounded-xl font-bold transition">
          <MdDownload size={20} /> Export My Data
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 py-3 px-6 rounded-xl font-bold transition"
        >
          <MdRestore size={20} /> Reset to Defaults
        </button>

        <button
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white py-3 px-6 rounded-xl font-bold transition"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <MdOutlineDelete size={20} /> Delete My Account
        </button>
      </section>

      {/* Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111827] p-6 rounded-xl max-w-sm w-full border border-white/10 text-white space-y-4">
            <h3 className="text-lg font-semibold">Confirm Account Deletion</h3>
            <p className="text-white/70 text-sm">
              Are you sure you want to delete your account? This action is irreversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-bold"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingRow({
  title,
  description,
  icon,
  active,
  toggle,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  toggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={toggle}
        aria-pressed={active}
        aria-label={`${title} toggle`}
        className="text-2xl transition-all"
      >
        {active ? (
          <MdToggleOn className="text-emerald-500" />
        ) : (
          <MdToggleOff className="text-gray-400" />
        )}
      </button>
    </div>
  );
}
