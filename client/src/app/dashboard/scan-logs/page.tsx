"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MdSearch, 
  MdFilterList, 
  MdDownload,
  MdDelete,
  MdFlag,
  MdCheckCircle,
  MdWarning,
  MdInfo,
  MdMoreVert,
  MdVisibility
} from "react-icons/md";

const scanLogs = [
  {
    id: "SCN-001",
    user: "john_doe",
    inputType: "URL",
    inputContent: "https://fake-crypto-rewards.com/claim",
    aiStatus: "Scam",
    confidence: "97%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 14:23:45",
    ipAddress: "192.168.1.105",
    flaggedKeywords: ["crypto", "free", "claim", "urgent"]
  },
  {
    id: "SCN-002", 
    user: "jane_smith",
    inputType: "Message",
    inputContent: "Congratulations! You've won $10,000. Click here to claim...",
    aiStatus: "Scam",
    confidence: "94%",
    userFeedback: "Disputed",
    timestamp: "2024-03-15 14:18:32",
    ipAddress: "10.0.0.23",
    flaggedKeywords: ["won", "claim", "congratulations"]
  },
  {
    id: "SCN-003",
    user: "mike_wilson", 
    inputType: "URL",
    inputContent: "https://google.com",
    aiStatus: "Safe",
    confidence: "99%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 14:15:21",
    ipAddress: "172.16.0.45",
    flaggedKeywords: []
  },
  {
    id: "SCN-004",
    user: "sarah_jones",
    inputType: "Message", 
    inputContent: "Hello, I am a Nigerian prince and I need your help...",
    aiStatus: "Scam",
    confidence: "98%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 14:12:18",
    ipAddress: "203.0.113.42",
    flaggedKeywords: ["nigerian", "prince", "help", "money"]
  },
  {
    id: "SCN-005",
    user: "alex_brown",
    inputType: "URL",
    inputContent: "https://linkedin.com/jobs",
    aiStatus: "Safe", 
    confidence: "96%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 14:08:55",
    ipAddress: "198.51.100.67",
    flaggedKeywords: []
  }
];

export default function ScanLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const filteredLogs = scanLogs.filter(log => {
    const matchesSearch = log.inputContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || log.aiStatus === filterStatus;
    const matchesType = filterType === "All" || log.inputType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectLog = (logId: string) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLogs(
      selectedLogs.length === filteredLogs.length 
        ? [] 
        : filteredLogs.map(log => log.id)
    );
  };

  const getStatusIcon = (status: string, feedback?: string) => {
    if (feedback === "Disputed") {
      return <MdWarning className="text-yellow-400" />;
    }
    return status === "Scam" 
      ? <MdFlag className="text-red-400" />
      : <MdCheckCircle className="text-emerald-400" />;
  };

  const getStatusBadge = (status: string, feedback?: string) => {
    if (feedback === "Disputed") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-600/20 text-yellow-400 border border-yellow-500/30">
          Disputed
        </span>
      );
    }
    
    const styles = {
      Scam: "bg-red-600/20 text-red-400 border-red-500/30",
      Safe: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    return content.length > maxLength 
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Scan Logs
        </h1>
        <p className="text-gray-300">Monitor and analyze all scan activities across the platform.</p>
      </header>

      {/* Controls */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by content, user, or scan ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Scam">Scam</option>
              <option value="Safe">Safe</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Types</option>
              <option value="URL">URL</option>
              <option value="Message">Message</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition">
              <MdDownload size={20} />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg"
          >
            <span className="text-sm font-medium">{selectedLogs.length} log(s) selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition">
                Delete
              </button>
              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition">
                Add to Training
              </button>
              <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition">
                Mark Incorrect
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Total Scans Today</p>
          <p className="text-2xl font-bold text-blue-400">1,247</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Scams Detected</p>
          <p className="text-2xl font-bold text-red-400">89</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Disputed Results</p>
          <p className="text-2xl font-bold text-yellow-400">12</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Avg Confidence</p>
          <p className="text-2xl font-bold text-emerald-400">94.7%</p>
        </div>
      </div>

      {/* Scan Logs Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedLogs.length === filteredLogs.length && filteredLogs.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Scan ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Content</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Confidence</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Feedback</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, i) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedLogs.includes(log.id)}
                      onChange={() => handleSelectLog(log.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-blue-400">{log.id}</td>
                  <td className="px-4 py-3 text-sm">{log.user}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-300" title={log.inputContent}>
                        {truncateContent(log.inputContent)}
                      </p>
                      {log.flaggedKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {log.flaggedKeywords.slice(0, 3).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-1 py-0.5 bg-red-600/20 text-red-400 text-xs rounded border border-red-500/30"
                            >
                              {keyword}
                            </span>
                          ))}
                          {log.flaggedKeywords.length > 3 && (
                            <span className="text-xs text-gray-500">+{log.flaggedKeywords.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded border border-gray-500/30">
                      {log.inputType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(log.aiStatus, log.userFeedback)}
                      {getStatusBadge(log.aiStatus, log.userFeedback)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${
                      parseInt(log.confidence) > 95 ? 'text-emerald-400' :
                      parseInt(log.confidence) > 85 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {log.confidence}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${
                      log.userFeedback === 'Correct' ? 'text-emerald-400' :
                      log.userFeedback === 'Disputed' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {log.userFeedback}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{log.timestamp.split(' ')[1]}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition" title="View Details">
                        <MdVisibility size={16} className="text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition" title="Mark Incorrect">
                        <MdFlag size={16} className="text-yellow-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition" title="Delete">
                        <MdDelete size={16} className="text-red-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition">
                        <MdMoreVert size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
        <span>Showing {filteredLogs.length} of {scanLogs.length} scan logs</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition">Previous</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition">2</button>
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition">Next</button>
        </div>
      </div>
    </main>
  );
}
