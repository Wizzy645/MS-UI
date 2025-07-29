"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MdAdd, 
  MdEdit,
  MdDelete,
  MdSchedule,
  MdNotifications,
  MdVisibility,
  MdVisibilityOff,
  MdPeople,
  MdInfo,
  MdWarning,
  MdError,
  MdCheckCircle
} from "react-icons/md";

const announcements = [
  {
    id: "ANN-001",
    title: "Scheduled Maintenance Notice",
    content: "We will be performing scheduled maintenance on our AI systems this weekend from 2 AM to 6 AM UTC. During this time, scanning services may be temporarily unavailable.",
    type: "Maintenance",
    priority: "Medium",
    status: "Active",
    targetAudience: "All Users",
    createdBy: "admin.system",
    createdDate: "2024-03-15",
    scheduledDate: "2024-03-18",
    expiryDate: "2024-03-19",
    isVisible: true,
    viewCount: 1247
  },
  {
    id: "ANN-002",
    title: "New AI Model Release",
    content: "We're excited to announce the release of our new AI model v2.1.4 with improved accuracy for detecting cryptocurrency scams and phishing attempts.",
    type: "Feature Update",
    priority: "High",
    status: "Scheduled",
    targetAudience: "All Users",
    createdBy: "product.team",
    createdDate: "2024-03-14",
    scheduledDate: "2024-03-20",
    expiryDate: "2024-03-27",
    isVisible: false,
    viewCount: 0
  },
  {
    id: "ANN-003",
    title: "Security Alert: New Phishing Campaign",
    content: "We've detected a new phishing campaign targeting users with fake 'account verification' emails. Please be extra cautious and report any suspicious messages.",
    type: "Security Alert",
    priority: "High",
    status: "Active",
    targetAudience: "All Users", 
    createdBy: "security.team",
    createdDate: "2024-03-13",
    scheduledDate: "2024-03-13",
    expiryDate: "2024-03-20",
    isVisible: true,
    viewCount: 2156
  },
  {
    id: "ANN-004",
    title: "Terms of Service Update",
    content: "We've updated our Terms of Service to better protect user privacy and clarify our data usage policies. Please review the changes at your convenience.",
    type: "Policy Update",
    priority: "Low",
    status: "Draft",
    targetAudience: "All Users",
    createdBy: "legal.team",
    createdDate: "2024-03-12",
    scheduledDate: "2024-03-25",
    expiryDate: "2024-04-01",
    isVisible: false,
    viewCount: 0
  }
];

const announcementTypes = [
  "Feature Update",
  "Maintenance",
  "Security Alert", 
  "Policy Update",
  "General Notice"
];

export default function Announcements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "General Notice",
    priority: "Medium",
    targetAudience: "All Users",
    scheduledDate: "",
    expiryDate: ""
  });

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || announcement.type === filterType;
    const matchesStatus = filterStatus === "All" || announcement.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High": return <MdError className="text-red-400" />;
      case "Medium": return <MdWarning className="text-yellow-400" />;
      case "Low": return <MdInfo className="text-blue-400" />;
      default: return <MdInfo className="text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      High: "bg-red-600/20 text-red-400 border-red-500/30",
      Medium: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
      Low: "bg-blue-600/20 text-blue-400 border-blue-500/30"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority as keyof typeof styles]}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      Scheduled: "bg-blue-600/20 text-blue-400 border-blue-500/30",
      Draft: "bg-gray-600/20 text-gray-400 border-gray-500/30",
      Expired: "bg-red-600/20 text-red-400 border-red-500/30"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const handleCreateAnnouncement = () => {
    console.log("Creating announcement:", newAnnouncement);
    setShowCreateModal(false);
    setNewAnnouncement({
      title: "",
      content: "",
      type: "General Notice",
      priority: "Medium",
      targetAudience: "All Users",
      scheduledDate: "",
      expiryDate: ""
    });
  };

  const toggleVisibility = (id: string) => {
    console.log("Toggling visibility for announcement:", id);
  };

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Announcements Management
        </h1>
        <p className="text-gray-300">Create and manage platform-wide announcements and notifications for users.</p>
      </header>

      {/* Controls */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters and Create Button */}
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Types</option>
              {announcementTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Draft">Draft</option>
              <option value="Expired">Expired</option>
            </select>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              <MdAdd size={20} />
              Create Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Active Announcements</p>
          <p className="text-2xl font-bold text-emerald-400">{announcements.filter(a => a.status === "Active").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Scheduled</p>
          <p className="text-2xl font-bold text-blue-400">{announcements.filter(a => a.status === "Scheduled").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Total Views</p>
          <p className="text-2xl font-bold text-purple-400">{announcements.reduce((sum, a) => sum + a.viewCount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Draft Announcements</p>
          <p className="text-2xl font-bold text-gray-400">{announcements.filter(a => a.status === "Draft").length}</p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement, i) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{announcement.title}</h3>
                  {getPriorityIcon(announcement.priority)}
                  {getPriorityBadge(announcement.priority)}
                  {getStatusBadge(announcement.status)}
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  {announcement.id} • Created by {announcement.createdBy} on {announcement.createdDate}
                </p>
                <p className="text-gray-300 leading-relaxed">{announcement.content}</p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleVisibility(announcement.id)}
                  className={`p-2 rounded-lg transition ${
                    announcement.isVisible 
                      ? "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30" 
                      : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
                  }`}
                  title={announcement.isVisible ? "Hide announcement" : "Show announcement"}
                >
                  {announcement.isVisible ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                </button>
                <button className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition">
                  <MdEdit size={20} />
                </button>
                <button className="p-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition">
                  <MdDelete size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <MdSchedule className="text-gray-400" />
                <span className="text-gray-400">Scheduled:</span>
                <span className="text-white">{announcement.scheduledDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MdSchedule className="text-gray-400" />
                <span className="text-gray-400">Expires:</span>
                <span className="text-white">{announcement.expiryDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MdPeople className="text-gray-400" />
                <span className="text-gray-400">Audience:</span>
                <span className="text-white">{announcement.targetAudience}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MdVisibility className="text-gray-400" />
                <span className="text-gray-400">Views:</span>
                <span className="text-white">{announcement.viewCount.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MdNotifications />
              Create New Announcement
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter announcement title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter announcement content..."
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {announcementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                <select
                  value={newAnnouncement.targetAudience}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="All Users">All Users</option>
                  <option value="Admin Users">Admin Users</option>
                  <option value="Premium Users">Premium Users</option>
                  <option value="Free Users">Free Users</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Scheduled Date</label>
                  <input
                    type="datetime-local"
                    value={newAnnouncement.scheduledDate}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduledDate: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                  <input
                    type="datetime-local"
                    value={newAnnouncement.expiryDate}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateAnnouncement}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Create Announcement
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
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
