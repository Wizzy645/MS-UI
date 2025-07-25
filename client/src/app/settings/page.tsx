"use client";

import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { 
  MdSecurity, 
  MdNotifications, 
  MdLanguage, 
  MdPalette, 
  MdPrivacyTip,
  MdSave,
  MdDelete,
  MdWarning
} from "react-icons/md";

export default function UserSettings() {
  const { user, logout } = useUser();
  const router = useRouter();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
      scanAlerts: true,
      weeklyReports: true
    },
    privacy: {
      profileVisible: false,
      shareAnalytics: true,
      trackingEnabled: false
    },
    preferences: {
      language: 'en',
      theme: 'dark',
      autoScan: true,
      soundEffects: true
    }
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Redirect if not authenticated
  if (!user?.isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage (in production, send to backend)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Show success notification
    const notification = document.createElement('div');
    notification.textContent = 'Settings saved successfully!';
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const handleDeleteAccount = () => {
    // In production, this would call an API to delete the account
    logout();
    router.push('/');
    
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = 'Account deleted successfully';
    notification.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-gray-800 ${
        checked ? 'bg-purple-600' : 'bg-gray-600'
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-purple-400 hover:text-purple-300 mb-4 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-400 mt-2">Customize your experience and manage your preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdNotifications className="text-purple-400 text-xl" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications.email}
                  onChange={(value) => handleSettingChange('notifications', 'email', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Browser push notifications</p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications.push}
                  onChange={(value) => handleSettingChange('notifications', 'push', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Scan Alerts</h3>
                  <p className="text-sm text-gray-400">Get notified of scan results</p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications.scanAlerts}
                  onChange={(value) => handleSettingChange('notifications', 'scanAlerts', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm text-gray-400">Weekly security summaries</p>
                </div>
                <ToggleSwitch
                  checked={settings.notifications.weeklyReports}
                  onChange={(value) => handleSettingChange('notifications', 'weeklyReports', value)}
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdPrivacyTip className="text-purple-400 text-xl" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Profile Visibility</h3>
                  <p className="text-sm text-gray-400">Make your profile visible to others</p>
                </div>
                <ToggleSwitch
                  checked={settings.privacy.profileVisible}
                  onChange={(value) => handleSettingChange('privacy', 'profileVisible', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Share Analytics</h3>
                  <p className="text-sm text-gray-400">Help improve our service with anonymous data</p>
                </div>
                <ToggleSwitch
                  checked={settings.privacy.shareAnalytics}
                  onChange={(value) => handleSettingChange('privacy', 'shareAnalytics', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Activity Tracking</h3>
                  <p className="text-sm text-gray-400">Track your app usage for insights</p>
                </div>
                <ToggleSwitch
                  checked={settings.privacy.trackingEnabled}
                  onChange={(value) => handleSettingChange('privacy', 'trackingEnabled', value)}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdPalette className="text-purple-400 text-xl" />
              <h2 className="text-xl font-semibold">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Language</h3>
                  <p className="text-sm text-gray-400">Choose your preferred language</p>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                  className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Theme</h3>
                  <p className="text-sm text-gray-400">Choose your preferred theme</p>
                </div>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
                  className="bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto Scan</h3>
                  <p className="text-sm text-gray-400">Automatically scan new content</p>
                </div>
                <ToggleSwitch
                  checked={settings.preferences.autoScan}
                  onChange={(value) => handleSettingChange('preferences', 'autoScan', value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Sound Effects</h3>
                  <p className="text-sm text-gray-400">Play sounds for notifications</p>
                </div>
                <ToggleSwitch
                  checked={settings.preferences.soundEffects}
                  onChange={(value) => handleSettingChange('preferences', 'soundEffects', value)}
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdSecurity className="text-purple-400 text-xl" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/change-password')}
                className="w-full text-left p-3 bg-[#2a2a2a] border border-gray-600 rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-gray-400">Update your account password</p>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <MdSave />
              Save Settings
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#1a1a1a] border border-red-900/50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MdWarning className="text-red-400 text-xl" />
              <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MdDelete />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] border border-red-900/50 rounded-xl p-6 max-w-md mx-4">
              <div className="flex items-center gap-3 mb-4">
                <MdWarning className="text-red-400 text-xl" />
                <h2 className="text-xl font-semibold text-red-400">Delete Account</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Yes, Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
