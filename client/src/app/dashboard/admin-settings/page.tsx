"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdSettings,
  MdSecurity,
  MdDataset,
  MdApi,
  MdBackup,
  MdMonitorHeart,
  MdToggleOn,
  MdToggleOff,
  MdSave,
  MdRefresh,
  MdDownload,
  MdUpload,
  MdWarning,
  MdInfo,
  MdCheckCircle
} from "react-icons/md";

const systemSettings = {
  scanning: {
    enabled: true,
    maintenanceMode: false,
    maxDailyScans: 10000,
    aiConfidenceThreshold: 85,
    autoBlockHighRisk: true
  },
  security: {
    enforceSSL: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    requireStrongPasswords: true,
    enableTwoFactor: false
  },
  ai: {
    currentModel: "v2.1.4",
    autoRetrain: true,
    retrainInterval: 7,
    minTrainingSamples: 1000,
    testDataPercentage: 20
  },
  notifications: {
    emailNotifications: true,
    slackIntegration: false,
    highRiskAlerts: true,
    systemHealthAlerts: true,
    weeklyReports: true
  },
  performance: {
    enableCaching: true,
    cacheExpiry: 3600,
    enableLogging: true,
    logLevel: "INFO",
    maxLogFileSize: 100
  }
};

const auditLogs = [
  {
    id: "LOG-001",
    action: "Settings Modified",
    details: "AI confidence threshold changed from 80% to 85%",
    user: "admin.user",
    timestamp: "2024-03-15 14:23:45",
    ipAddress: "192.168.1.100"
  },
  {
    id: "LOG-002", 
    action: "System Backup",
    details: "Automated daily backup completed successfully",
    user: "system.backup",
    timestamp: "2024-03-15 02:00:00",
    ipAddress: "127.0.0.1"
  },
  {
    id: "LOG-003",
    action: "User Management",
    details: "Bulk user suspension action performed",
    user: "security.admin",
    timestamp: "2024-03-14 16:45:30",
    ipAddress: "203.0.113.45"
  },
  {
    id: "LOG-004",
    action: "AI Model Update",
    details: "AI model retrained with 1,247 new samples",
    user: "ai.trainer",
    timestamp: "2024-03-14 08:15:22",
    ipAddress: "10.0.0.50"
  }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(systemSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
    // Simulate API call
  };

  const resetSettings = () => {
    setSettings(systemSettings);
    setHasChanges(false);
  };

  const ToggleSwitch = ({ 
    enabled, 
    onChange, 
    label 
  }: { 
    enabled: boolean; 
    onChange: (value: boolean) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
      <span className="text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`flex items-center p-1 rounded-full transition ${
          enabled ? "bg-emerald-600" : "bg-gray-600"
        }`}
      >
        {enabled ? <MdToggleOn size={24} /> : <MdToggleOff size={24} />}
      </button>
    </div>
  );

  const NumberInput = ({ 
    value, 
    onChange, 
    label, 
    min, 
    max, 
    suffix = "" 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    label: string;
    min?: number;
    max?: number;
    suffix?: string;
  }) => (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-blue-500"
        />
        {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
      </div>
    </div>
  );

  const SelectInput = ({ 
    value, 
    onChange, 
    label, 
    options 
  }: { 
    value: string; 
    onChange: (value: string) => void; 
    label: string;
    options: string[];
  }) => (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-blue-500"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-gray-300">Configure platform settings, security options, and system behavior.</p>
      </header>

      {/* Save Changes Bar */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 mb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <MdWarning className="text-blue-400" />
            <span className="text-blue-400 font-medium">You have unsaved changes</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetSettings}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition"
            >
              Reset
            </button>
            <button
              onClick={saveSettings}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              <MdSave size={20} />
              Save Changes
            </button>
          </div>
        </motion.div>
      )}

      {/* Settings Tabs */}
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg overflow-hidden">
        <div className="flex border-b border-white/10 overflow-x-auto">
          {[
            { id: "general", label: "General", icon: <MdSettings /> },
            { id: "security", label: "Security", icon: <MdSecurity /> },
            { id: "ai", label: "AI & ML", icon: <MdDataset /> },
            { id: "notifications", label: "Notifications", icon: <MdMonitorHeart /> },
            { id: "performance", label: "Performance", icon: <MdApi /> },
            { id: "audit", label: "Audit Logs", icon: <MdBackup /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-blue-600/20 text-blue-400 border-b-2 border-blue-500" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Scanning Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleSwitch
                  enabled={settings.scanning.enabled}
                  onChange={(value) => updateSetting("scanning", "enabled", value)}
                  label="Enable Scanning Services"
                />
                <ToggleSwitch
                  enabled={settings.scanning.maintenanceMode}
                  onChange={(value) => updateSetting("scanning", "maintenanceMode", value)}
                  label="Maintenance Mode"
                />
                <NumberInput
                  value={settings.scanning.maxDailyScans}
                  onChange={(value) => updateSetting("scanning", "maxDailyScans", value)}
                  label="Max Daily Scans"
                  min={1000}
                  max={100000}
                />
                <NumberInput
                  value={settings.scanning.aiConfidenceThreshold}
                  onChange={(value) => updateSetting("scanning", "aiConfidenceThreshold", value)}
                  label="AI Confidence Threshold"
                  min={50}
                  max={99}
                  suffix="%"
                />
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Security Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleSwitch
                  enabled={settings.security.enforceSSL}
                  onChange={(value) => updateSetting("security", "enforceSSL", value)}
                  label="Enforce SSL/HTTPS"
                />
                <ToggleSwitch
                  enabled={settings.security.requireStrongPasswords}
                  onChange={(value) => updateSetting("security", "requireStrongPasswords", value)}
                  label="Require Strong Passwords"
                />
                <NumberInput
                  value={settings.security.sessionTimeout}
                  onChange={(value) => updateSetting("security", "sessionTimeout", value)}
                  label="Session Timeout"
                  min={5}
                  max={120}
                  suffix="minutes"
                />
                <NumberInput
                  value={settings.security.maxLoginAttempts}
                  onChange={(value) => updateSetting("security", "maxLoginAttempts", value)}
                  label="Max Login Attempts"
                  min={3}
                  max={10}
                />
              </div>
            </div>
          )}

          {/* AI Settings */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Model Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Model Version</label>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono">{settings.ai.currentModel}</span>
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition">
                      <MdRefresh size={16} />
                    </button>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={settings.ai.autoRetrain}
                  onChange={(value) => updateSetting("ai", "autoRetrain", value)}
                  label="Auto Retrain Model"
                />
                <NumberInput
                  value={settings.ai.retrainInterval}
                  onChange={(value) => updateSetting("ai", "retrainInterval", value)}
                  label="Retrain Interval"
                  min={1}
                  max={30}
                  suffix="days"
                />
                <NumberInput
                  value={settings.ai.minTrainingSamples}
                  onChange={(value) => updateSetting("ai", "minTrainingSamples", value)}
                  label="Min Training Samples"
                  min={100}
                  max={10000}
                />
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Notification Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleSwitch
                  enabled={settings.notifications.emailNotifications}
                  onChange={(value) => updateSetting("notifications", "emailNotifications", value)}
                  label="Email Notifications"
                />
                <ToggleSwitch
                  enabled={settings.notifications.slackIntegration}
                  onChange={(value) => updateSetting("notifications", "slackIntegration", value)}
                  label="Slack Integration"
                />
                <ToggleSwitch
                  enabled={settings.notifications.highRiskAlerts}
                  onChange={(value) => updateSetting("notifications", "highRiskAlerts", value)}
                  label="High Risk Alerts"
                />
                <ToggleSwitch
                  enabled={settings.notifications.systemHealthAlerts}
                  onChange={(value) => updateSetting("notifications", "systemHealthAlerts", value)}
                  label="System Health Alerts"
                />
              </div>
            </div>
          )}

          {/* Performance Settings */}
          {activeTab === "performance" && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Performance Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleSwitch
                  enabled={settings.performance.enableCaching}
                  onChange={(value) => updateSetting("performance", "enableCaching", value)}
                  label="Enable Caching"
                />
                <ToggleSwitch
                  enabled={settings.performance.enableLogging}
                  onChange={(value) => updateSetting("performance", "enableLogging", value)}
                  label="Enable Detailed Logging"
                />
                <NumberInput
                  value={settings.performance.cacheExpiry}
                  onChange={(value) => updateSetting("performance", "cacheExpiry", value)}
                  label="Cache Expiry Time"
                  min={300}
                  max={86400}
                  suffix="seconds"
                />
                <SelectInput
                  value={settings.performance.logLevel}
                  onChange={(value) => updateSetting("performance", "logLevel", value)}
                  label="Log Level"
                  options={["DEBUG", "INFO", "WARN", "ERROR"]}
                />
              </div>
            </div>
          )}

          {/* Audit Logs */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">System Audit Logs</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
                    <MdDownload size={20} />
                    Export Logs
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition">
                    <MdRefresh size={20} />
                    Refresh
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {auditLogs.map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-white">{log.action}</p>
                        <p className="text-sm text-gray-400">{log.details}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{log.id}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>User: {log.user}</span>
                      <span>Time: {log.timestamp}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <button className="flex items-center gap-3 p-4 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 rounded-lg transition">
          <MdBackup size={24} className="text-blue-400" />
          <div className="text-left">
            <p className="font-medium text-white">Create Backup</p>
            <p className="text-sm text-gray-400">Full system backup</p>
          </div>
        </button>
        
        <button className="flex items-center gap-3 p-4 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 rounded-lg transition">
          <MdCheckCircle size={24} className="text-emerald-400" />
          <div className="text-left">
            <p className="font-medium text-white">System Health</p>
            <p className="text-sm text-gray-400">Run diagnostics</p>
          </div>
        </button>
        
        <button className="flex items-center gap-3 p-4 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 rounded-lg transition">
          <MdApi size={24} className="text-purple-400" />
          <div className="text-left">
            <p className="font-medium text-white">API Keys</p>
            <p className="text-sm text-gray-400">Manage API access</p>
          </div>
        </button>
      </div>
    </main>
  );
}
