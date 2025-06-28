"use client";

import { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdPhotoCamera,
  MdDeleteForever,
  MdPerson,
  MdShield,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
} from "react-icons/md";
import Image from "next/image";

export default function AdminProfilePage() {
  const [email, setEmail] = useState("admin@mamasecure.io");
  const [username, setUsername] = useState("Olamide");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const adminActivity = {
    scansPerformed: 132,
    flagsSubmitted: 18,
    createdAt: "Feb 12, 2024",
  };

  const loginHistory = [
    { device: "Chrome on Windows", ip: "102.89.77.12", date: "June 27, 2025" },
    { device: "Safari on iPhone", ip: "192.168.0.2", date: "June 26, 2025" },
    { device: "Edge on Mac", ip: "45.90.33.21", date: "June 24, 2025" },
  ];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  const handleSave = () => {
    // Simulate save
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    alert("Account deleted (not really).");
  };

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-b from-black to-[#0f172a] relative">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Top Section */}
      <div className="flex flex-wrap items-center gap-6 mb-10">
        <div className="relative">
          <Image
  src={avatar || "/user-profile-avatar-png.webp"}
  alt="Avatar"
  width={128}
  height={128}
  unoptimized={!!avatar} // Use unoptimized for uploaded or external images
  className="rounded-full object-cover border-4 border-purple-600"
/>
          <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-500 transition">
            <MdPhotoCamera size={18} />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{username}</h2>
          <p className="text-sm text-purple-400">Administrator</p>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-3 rounded-lg">
              <MdPerson className="mr-2 text-purple-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-3 rounded-lg">
              <MdEmail className="mr-2 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full text-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">New Password</label>
            <div className="flex items-center bg-black/50 border border-white/10 px-4 py-3 rounded-lg">
              <MdLock className="mr-2 text-purple-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full text-white"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="ml-2 text-white/60">
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>
          </div>

          {/* 2FA Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <MdShield /> Enable Two-Factor Authentication
            </label>
            <button
              onClick={() => setTwoFA(!twoFA)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                twoFA ? "bg-green-600 hover:bg-green-500" : "bg-gray-600 hover:bg-gray-500"
              }`}
            >
              {twoFA ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold text-white transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-purple-700/20 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold">{adminActivity.scansPerformed}</h3>
          <p className="text-sm text-gray-300 mt-1">Scans Performed</p>
        </div>
        <div className="bg-red-600/20 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold">{adminActivity.flagsSubmitted}</h3>
          <p className="text-sm text-gray-300 mt-1">Flags Submitted</p>
        </div>
        <div className="bg-indigo-600/20 p-6 rounded-xl text-center">
          <h3 className="text-3xl font-bold">{adminActivity.createdAt}</h3>
          <p className="text-sm text-gray-300 mt-1">Account Created</p>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Login History</h2>
        <table className="w-full text-sm text-white">
          <thead>
            <tr className="text-left border-b border-white/10 text-gray-300">
              <th className="py-2">Device</th>
              <th>IP Address</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((entry, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-2">{entry.device}</td>
                <td>{entry.ip}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Account */}
      <div className="text-center mt-6">
        <button
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl text-white font-bold text-sm transition"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <MdDeleteForever size={20} /> Delete Account
        </button>
        <p className="text-xs text-gray-400 mt-2">
          This action is irreversible. Proceed with caution.
        </p>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg">
          <MdCheckCircle /> Changes saved successfully!
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111827] p-6 rounded-xl max-w-sm w-full border border-white/10 text-white space-y-4">
            <h3 className="text-lg font-semibold">Confirm Account Deletion</h3>
            <p className="text-white/70 text-sm">
              Are you sure you want to delete your account? This cannot be undone.
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
                onClick={handleDeleteAccount}
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
