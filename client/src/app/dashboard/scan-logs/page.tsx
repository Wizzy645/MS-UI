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
  MdVisibility,
  MdClose
} from "react-icons/md";

// Mock scan logs data
const initialScanLogs = [
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
    inputContent: "Congratulations! You've won $10,000. Click here to claim your prize now! Limited time offer!",
    aiStatus: "Scam",
    confidence: "94%",
    userFeedback: "Disputed",
    timestamp: "2024-03-15 14:18:32",
    ipAddress: "10.0.0.23",
    flaggedKeywords: ["won", "claim", "congratulations", "limited time"]
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
    inputContent: "Hello, I am a Nigerian prince and I need your help to transfer $2 million dollars...",
    aiStatus: "Scam",
    confidence: "98%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 14:12:18",
    ipAddress: "203.0.113.42",
    flaggedKeywords: ["nigerian", "prince", "help", "money", "transfer"]
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
  },
  {
    id: "SCN-006",
    user: "emma_davis",
    inputType: "Message",
    inputContent: "Your package delivery is scheduled for tomorrow between 2-4 PM. Track your delivery here.",
    aiStatus: "Safe",
    confidence: "91%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 13:45:12",
    ipAddress: "192.168.1.200",
    flaggedKeywords: []
  },
  {
    id: "SCN-007",
    user: "david_miller",
    inputType: "URL",
    inputContent: "https://bit.ly/free-bitcoin-mining",
    aiStatus: "Scam",
    confidence: "95%",
    userFeedback: "Correct",
    timestamp: "2024-03-15 13:30:45",
    ipAddress: "10.0.0.100",
    flaggedKeywords: ["free", "bitcoin", "mining"]
  }
];

interface ScanLog {
  id: string;
  user: string;
  inputType: string;
  inputContent: string;
  aiStatus: string;
  confidence: string;
  userFeedback: string;
  timestamp: string;
  ipAddress: string;
  flaggedKeywords: string[];
}

export default function ScanLogs() {
  const [scanLogs, setScanLogs] = useState<ScanLog[]>(initialScanLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ScanLog | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  const filteredLogs = scanLogs.filter(log => {
    const matchesSearch = log.inputContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || log.aiStatus === filterStatus;
    const matchesType = filterType === "All" || log.inputType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + itemsPerPage);

  const showMessage = (message: string) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleSelectLog = (logId: string) => {
    setSelectedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLogs(
      selectedLogs.length === paginatedLogs.length 
        ? [] 
        : paginatedLogs.map(log => log.id)
    );
  };

  const handleBulkAction = (action: string) => {
    const logIds = selectedLogs.join(", ");
    
    switch (action) {
      case "delete":
        if (confirm(`Are you sure you want to delete ${selectedLogs.length} scan log(s)?`)) {
          setScanLogs(prev => prev.filter(log => !selectedLogs.includes(log.id)));
          showMessage(`Deleted ${selectedLogs.length} scan log(s): ${logIds}`);
        }
        break;
      case "training":
        showMessage(`Added ${selectedLogs.length} scan(s) to training set: ${logIds}`);
        break;
      case "incorrect":
        setScanLogs(prev => prev.map(log => 
          selectedLogs.includes(log.id) 
            ? { ...log, userFeedback: "Disputed" } 
            : log
        ));
        showMessage(`Marked ${selectedLogs.length} scan(s) as incorrect: ${logIds}`);
        break;
    }
    setSelectedLogs([]);
  };

  const handleLogAction = (logId: string, action: string) => {
    const log = scanLogs.find(l => l.id === logId);
    if (!log) return;

    switch (action) {
      case "view":
        setSelectedLog(log);
        setShowDetailModal(true);
        break;
      case "flag":
        setScanLogs(prev => prev.map(l => 
          l.id === logId 
            ? { ...l, userFeedback: l.userFeedback === "Disputed" ? "Correct" : "Disputed" }
            : l
        ));
        showMessage(`${log.userFeedback === "Disputed" ? "Unmarked" : "Marked"} scan as ${log.userFeedback === "Disputed" ? "correct" : "incorrect"}: ${logId}`);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete scan log: ${logId}?`)) {
          setScanLogs(prev => prev.filter(l => l.id !== logId));
          showMessage(`Deleted scan log: ${logId}`);
        }
        break;
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ["ID", "User", "Type", "Content", "AI Status", "Confidence", "Feedback", "Timestamp", "IP Address", "Keywords"].join(","),
      ...filteredLogs.map(log => [
        log.id,
        log.user,
        log.inputType,
        `"${log.inputContent.replace(/"/g, '""')}"`,
        log.aiStatus,
        log.confidence,
        log.userFeedback,
        log.timestamp,
        log.ipAddress,
        `"${log.flaggedKeywords.join(", ")}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scan-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showMessage("Scan logs exported successfully");
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
      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {showSuccessMessage}
        </motion.div>
      )}

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

            <button 
              onClick={exportLogs}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition"
            >
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
              <button 
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
              >
                Delete
              </button>
              <button 
                onClick={() => handleBulkAction("training")}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition"
              >
                Add to Training
              </button>
              <button 
                onClick={() => handleBulkAction("incorrect")}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition"
              >
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
          <p className="text-2xl font-bold text-blue-400">{scanLogs.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Scams Detected</p>
          <p className="text-2xl font-bold text-red-400">{scanLogs.filter(log => log.aiStatus === "Scam").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Disputed Results</p>
          <p className="text-2xl font-bold text-yellow-400">{scanLogs.filter(log => log.userFeedback === "Disputed").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Avg Confidence</p>
          <p className="text-2xl font-bold text-emerald-400">
            {Math.round(scanLogs.reduce((sum, log) => sum + parseInt(log.confidence), 0) / scanLogs.length)}%
          </p>
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
                    checked={selectedLogs.length === paginatedLogs.length && paginatedLogs.length > 0}
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
              {paginatedLogs.map((log, i) => (
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
                      <button 
                        onClick={() => handleLogAction(log.id, "view")}
                        className="p-1 hover:bg-white/10 rounded transition" 
                        title="View Details"
                      >
                        <MdVisibility size={16} className="text-blue-400" />
                      </button>
                      <button 
                        onClick={() => handleLogAction(log.id, "flag")}
                        className="p-1 hover:bg-white/10 rounded transition" 
                        title={log.userFeedback === "Disputed" ? "Mark Correct" : "Mark Incorrect"}
                      >
                        <MdFlag size={16} className={log.userFeedback === "Disputed" ? "text-emerald-400" : "text-yellow-400"} />
                      </button>
                      <button 
                        onClick={() => handleLogAction(log.id, "delete")}
                        className="p-1 hover:bg-white/10 rounded transition" 
                        title="Delete"
                      >
                        <MdDelete size={16} className="text-red-400" />
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
        <span>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLogs.length)} of {filteredLogs.length} scan logs</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded transition ${
                currentPage === page 
                  ? "bg-blue-600 text-white" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Scan Log Details</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Scan ID</p>
                  <p className="font-mono text-blue-400">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">User</p>
                  <p className="text-white">{selectedLog.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Input Type</p>
                  <p className="text-white">{selectedLog.inputType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Timestamp</p>
                  <p className="text-white">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">IP Address</p>
                  <p className="text-white font-mono">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">AI Confidence</p>
                  <p className="text-white">{selectedLog.confidence}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Original Content</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white">{selectedLog.inputContent}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">AI Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedLog.aiStatus)}
                    {getStatusBadge(selectedLog.aiStatus)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">User Feedback</p>
                  <span className={`text-sm ${
                    selectedLog.userFeedback === 'Correct' ? 'text-emerald-400' :
                    selectedLog.userFeedback === 'Disputed' ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {selectedLog.userFeedback}
                  </span>
                </div>
              </div>
              
              {selectedLog.flaggedKeywords.length > 0 && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Flagged Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLog.flaggedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-red-600/20 text-red-400 text-sm rounded border border-red-500/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
