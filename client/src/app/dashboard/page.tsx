"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MdPeople,
  MdSecurity,
  MdTrendingUp,
  MdSmartToy,
  MdPersonAdd,
  MdWarning,
  MdCheckCircle,
  MdBarChart,
  MdSettings
} from "react-icons/md";
import Chart from "../components/Dashboard/chart/chart";

const adminStats = [
  { 
    title: "Total Users", 
    value: "2,847", 
    color: "bg-blue-600",
    icon: <MdPeople />,
    change: "+12% this week"
  },
  { 
    title: "Total Scans", 
    value: "18,934", 
    color: "bg-emerald-600",
    icon: <MdSecurity />,
    change: "+23% this week"
  },
  { 
    title: "Flagged Scams", 
    value: "1,247", 
    color: "bg-red-600",
    icon: <MdWarning />,
    change: "+8% this week"
  },
  { 
    title: "Model Accuracy", 
    value: "94.7%", 
    color: "bg-purple-600",
    icon: <MdSmartToy />,
    change: "+2.1% improvement"
  },
  { 
    title: "New Users (7 days)", 
    value: "284", 
    color: "bg-indigo-600",
    icon: <MdPersonAdd />,
    change: "+15% vs last week"
  },
];

const recentActivity = [
  { 
    action: "New user registration", 
    user: "john.doe@email.com", 
    time: "2 min ago",
    type: "user",
    status: "success"
  },
  { 
    action: "Scam detected", 
    user: "AI Model v2.1", 
    time: "5 min ago",
    type: "security",
    status: "warning"
  },
  { 
    action: "User promoted to admin", 
    user: "jane.smith@email.com", 
    time: "12 min ago",
    type: "admin",
    status: "info"
  },
  { 
    action: "High confidence scam", 
    user: "scanner.bot", 
    time: "18 min ago",
    type: "security",
    status: "danger"
  },
  { 
    action: "Feedback training data", 
    user: "admin.panel", 
    time: "25 min ago",
    type: "ai",
    status: "success"
  },
];

const topFlaggedDomains = [
  { domain: "fake-crypto-rewards.com", flags: 127, confidence: "98%" },
  { domain: "nigerian-prince-help.org", flags: 89, confidence: "96%" },
  { domain: "free-money-now.net", flags: 73, confidence: "94%" },
  { domain: "urgent-bank-verify.co", flags: 61, confidence: "97%" },
  { domain: "lottery-winner-claim.biz", flags: 45, confidence: "95%" },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 space-y-8">
      {/* Admin Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MamaSecure Admin Control Center
        </h1>
        <p className="text-gray-300 text-lg">Monitor, manage, and maintain platform security and users.</p>
      </header>

      {/* Admin Stats Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {adminStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl shadow-xl ${stat.color} relative overflow-hidden`}
            role="region"
            aria-label={stat.title}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-white/80 text-2xl">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm uppercase text-white/70 tracking-wider mb-2">{stat.title}</p>
            <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
            <p className="text-xs text-white/60">{stat.change}</p>
            <div className="absolute -right-4 -bottom-4 text-white/10 text-6xl">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Charts and Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdBarChart /> Platform Analytics
          </h2>
          <Chart />
        </div>

        {/* Top Flagged Domains */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MdWarning className="text-red-400" /> Top Flagged Domains
          </h2>
          <div className="space-y-3">
            {topFlaggedDomains.map((domain, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                <div>
                  <p className="font-medium text-sm truncate max-w-48">{domain.domain}</p>
                  <p className="text-xs text-gray-400">{domain.flags} flags • {domain.confidence} confidence</p>
                </div>
                <span className="text-red-400 font-bold text-sm">{domain.flags}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Feed */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MdTrendingUp /> Recent Platform Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-emerald-400' :
                activity.status === 'warning' ? 'bg-yellow-400' :
                activity.status === 'danger' ? 'bg-red-400' : 'bg-blue-400'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Admin Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => router.push("/dashboard/users")}
          className="flex items-center gap-3 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 px-6 py-4 rounded-xl font-medium transition group"
        >
          <MdPeople size={24} className="text-blue-400 group-hover:text-blue-300" />
          <span>Manage Users</span>
        </button>
        
        <button
          onClick={() => router.push("/dashboard/scan-logs")}
          className="flex items-center gap-3 bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 px-6 py-4 rounded-xl font-medium transition group"
        >
          <MdSecurity size={24} className="text-emerald-400 group-hover:text-emerald-300" />
          <span>View Scan Logs</span>
        </button>
        
        <button
          onClick={() => router.push("/dashboard/ai-training")}
          className="flex items-center gap-3 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 px-6 py-4 rounded-xl font-medium transition group"
        >
          <MdSmartToy size={24} className="text-purple-400 group-hover:text-purple-300" />
          <span>AI Training</span>
        </button>
        
        <button
          onClick={() => router.push("/dashboard/admin-settings")}
          className="flex items-center gap-3 bg-gray-600/20 border border-gray-500/30 hover:bg-gray-600/30 px-6 py-4 rounded-xl font-medium transition group"
        >
          <MdSettings size={24} className="text-gray-400 group-hover:text-gray-300" />
          <span>System Settings</span>
        </button>
      </section>
    </main>
  );
}
