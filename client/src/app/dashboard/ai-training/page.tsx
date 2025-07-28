"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MdSmartToy, 
  MdThumbUp,
  MdThumbDown,
  MdAdd,
  MdUpload,
  MdDownload,
  MdRefresh,
  MdBarChart,
  MdWarning,
  MdCheckCircle,
  MdInfo,
  MdLabel
} from "react-icons/md";

const disputedCases = [
  {
    id: "DIS-001",
    originalInput: "Congratulations! You've won $50,000 in our lottery. Click here to claim your prize now!",
    aiPrediction: "Scam",
    aiConfidence: "89%",
    userFeedback: "Safe",
    userReason: "This is from my bank's legitimate promotion",
    status: "Pending Review",
    submittedBy: "john_doe",
    dateSubmitted: "2024-03-15"
  },
  {
    id: "DIS-002", 
    originalInput: "https://microsoft-security-update.com/urgent-patch",
    aiPrediction: "Safe",
    aiConfidence: "76%",
    userFeedback: "Scam",
    userReason: "This is a fake Microsoft domain for phishing",
    status: "Approved for Training",
    submittedBy: "jane_smith",
    dateSubmitted: "2024-03-14"
  },
  {
    id: "DIS-003",
    originalInput: "Hello dear, I am Mrs. Sarah from UK. I have $2M to transfer...",
    aiPrediction: "Scam",
    aiConfidence: "94%",
    userFeedback: "Scam",
    userReason: "AI was correct, this is definitely a scam",
    status: "Confirmed Correct",
    submittedBy: "mike_wilson",
    dateSubmitted: "2024-03-13"
  }
];

const trainingData = [
  {
    id: "TRN-001",
    category: "Romance Scam",
    content: "I am a widow with $3 million inheritance...",
    label: "Scam",
    confidence: "High",
    source: "User Submission",
    dateAdded: "2024-03-10"
  },
  {
    id: "TRN-002",
    category: "Crypto Scam", 
    content: "Free Bitcoin giveaway! Send 1 BTC get 2 BTC back!",
    label: "Scam",
    confidence: "High",
    source: "Admin Input",
    dateAdded: "2024-03-09"
  },
  {
    id: "TRN-003",
    category: "Legitimate",
    content: "Your package delivery is scheduled for tomorrow",
    label: "Safe",
    confidence: "High", 
    source: "Verified Sample",
    dateAdded: "2024-03-08"
  }
];

const modelStats = {
  currentVersion: "v2.1.4",
  accuracy: "94.7%",
  lastTrained: "2024-03-14",
  trainingSamples: 12847,
  pendingReviews: 23,
  approvedFeedback: 156
};

export default function AITraining() {
  const [activeTab, setActiveTab] = useState("disputed");
  const [newSample, setNewSample] = useState({
    content: "",
    label: "Scam",
    category: "Crypto Scam",
    confidence: "High"
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleApproveForTraining = (caseId: string) => {
    console.log("Approving case for training:", caseId);
  };

  const handleRejectCase = (caseId: string) => {
    console.log("Rejecting case:", caseId);
  };

  const handleAddTrainingSample = () => {
    console.log("Adding training sample:", newSample);
    setShowAddModal(false);
    setNewSample({
      content: "",
      label: "Scam", 
      category: "Crypto Scam",
      confidence: "High"
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      "Pending Review": "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
      "Approved for Training": "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      "Confirmed Correct": "bg-blue-600/20 text-blue-400 border-blue-500/30",
      "Rejected": "bg-red-600/20 text-red-400 border-red-500/30"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const getLabelBadge = (label: string) => {
    return label === "Scam" ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600/20 text-red-400 border border-red-500/30">
        Scam
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
        Safe
      </span>
    );
  };

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Feedback & Training
        </h1>
        <p className="text-gray-300">Review disputed cases and manage training data to improve AI detection accuracy.</p>
      </header>

      {/* Model Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Model Version</p>
          <p className="text-xl font-bold text-purple-400">{modelStats.currentVersion}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Accuracy</p>
          <p className="text-xl font-bold text-emerald-400">{modelStats.accuracy}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Training Samples</p>
          <p className="text-xl font-bold text-blue-400">{modelStats.trainingSamples.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Pending Reviews</p>
          <p className="text-xl font-bold text-yellow-400">{modelStats.pendingReviews}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Approved Feedback</p>
          <p className="text-xl font-bold text-emerald-400">{modelStats.approvedFeedback}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Last Trained</p>
          <p className="text-sm font-bold text-gray-300">{modelStats.lastTrained}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition">
          <MdRefresh size={20} />
          Retrain Model
        </button>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          <MdAdd size={20} />
          Add Training Sample
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition">
          <MdUpload size={20} />
          Bulk Upload
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition">
          <MdDownload size={20} />
          Export Data
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("disputed")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "disputed" 
                ? "bg-blue-600/20 text-blue-400 border-b-2 border-blue-500" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2">
              <MdWarning size={18} />
              Disputed Cases ({disputedCases.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab("training")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "training" 
                ? "bg-blue-600/20 text-blue-400 border-b-2 border-blue-500" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="flex items-center gap-2">
              <MdSmartToy size={18} />
              Training Data ({trainingData.length})
            </span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === "disputed" && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">Review cases where users disagreed with AI predictions</p>
              {disputedCases.map((case_item, i) => (
                <motion.div
                  key={case_item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-medium text-blue-400 mb-1">{case_item.id}</p>
                      <p className="text-sm text-gray-400">Submitted by {case_item.submittedBy} on {case_item.dateSubmitted}</p>
                    </div>
                    {getStatusBadge(case_item.status)}
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">Original Input:</p>
                    <p className="text-white">{case_item.originalInput}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-2">AI Prediction:</p>
                      <div className="flex items-center gap-2">
                        {getLabelBadge(case_item.aiPrediction)}
                        <span className="text-sm text-gray-300">({case_item.aiConfidence} confidence)</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-2">User Feedback:</p>
                      <div className="flex items-center gap-2">
                        {getLabelBadge(case_item.userFeedback)}
                        <span className="text-sm text-gray-300">User correction</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">User Reason:</p>
                    <p className="text-gray-300">{case_item.userReason}</p>
                  </div>
                  
                  {case_item.status === "Pending Review" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApproveForTraining(case_item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium transition"
                      >
                        <MdThumbUp size={16} />
                        Approve for Training
                      </button>
                      <button
                        onClick={() => handleRejectCase(case_item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition"
                      >
                        <MdThumbDown size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "training" && (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">Manage training samples used to improve AI accuracy</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Content</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Label</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Confidence</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Source</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Date Added</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingData.map((sample, i) => (
                      <motion.tr
                        key={sample.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="px-4 py-3 font-mono text-sm text-blue-400">{sample.id}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-300 max-w-xs truncate block" title={sample.content}>
                            {sample.content.length > 50 ? sample.content.substring(0, 50) + "..." : sample.content}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded border border-gray-500/30">
                            {sample.category}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {getLabelBadge(sample.label)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${
                            sample.confidence === "High" ? "text-emerald-400" :
                            sample.confidence === "Medium" ? "text-yellow-400" : "text-red-400"
                          }`}>
                            {sample.confidence}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-400">{sample.source}</td>
                        <td className="px-4 py-3 text-sm text-gray-400">{sample.dateAdded}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Training Sample Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-2xl w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MdLabel />
              Add Training Sample
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={newSample.content}
                  onChange={(e) => setNewSample({...newSample, content: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter the message or URL content to be used for training..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
                  <select
                    value={newSample.label}
                    onChange={(e) => setNewSample({...newSample, label: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Scam">Scam</option>
                    <option value="Safe">Safe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newSample.category}
                    onChange={(e) => setNewSample({...newSample, category: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Crypto Scam">Crypto Scam</option>
                    <option value="Romance Scam">Romance Scam</option>
                    <option value="Phishing">Phishing</option>
                    <option value="Phone Scam">Phone Scam</option>
                    <option value="Lottery Scam">Lottery Scam</option>
                    <option value="Legitimate">Legitimate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confidence</label>
                  <select
                    value={newSample.confidence}
                    onChange={(e) => setNewSample({...newSample, confidence: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddTrainingSample}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Add to Training Set
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
