"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MdSearch, 
  MdFilterList, 
  MdMoreVert,
  MdPersonAdd,
  MdBlock,
  MdCheckCircle,
  MdSupervisorAccount,
  MdPerson,
  MdEdit,
  MdDelete
} from "react-icons/md";

const users = [
  {
    id: "1",
    username: "john_doe",
    email: "john.doe@email.com",
    role: "User",
    status: "Active",
    registrationDate: "2024-01-15",
    totalScans: 45,
    flaggedContent: 2,
    avatar: "/user-profile-avatar-png.webp"
  },
  {
    id: "2", 
    username: "jane_smith",
    email: "jane.smith@email.com",
    role: "Admin",
    status: "Active",
    registrationDate: "2023-12-03",
    totalScans: 128,
    flaggedContent: 0,
    avatar: "/user-profile-avatar-png.webp"
  },
  {
    id: "3",
    username: "mike_wilson",
    email: "mike.wilson@email.com", 
    role: "User",
    status: "Suspended",
    registrationDate: "2024-02-20",
    totalScans: 23,
    flaggedContent: 8,
    avatar: "/user-profile-avatar-png.webp"
  },
  {
    id: "4",
    username: "sarah_jones",
    email: "sarah.jones@email.com",
    role: "Moderator", 
    status: "Active",
    registrationDate: "2024-01-08",
    totalScans: 89,
    flaggedContent: 1,
    avatar: "/user-profile-avatar-png.webp"
  },
  {
    id: "5",
    username: "alex_brown",
    email: "alex.brown@email.com",
    role: "User",
    status: "Pending",
    registrationDate: "2024-03-01",
    totalScans: 5,
    flaggedContent: 0,
    avatar: "/user-profile-avatar-png.webp"
  }
];

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin": return <MdSupervisorAccount className="text-red-400" />;
      case "Moderator": return <MdCheckCircle className="text-blue-400" />;
      default: return <MdPerson className="text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
      Suspended: "bg-red-600/20 text-red-400 border-red-500/30",
      Pending: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Manage Users
        </h1>
        <p className="text-gray-300">View, edit, and manage all platform users and their permissions.</p>
      </header>

      {/* Controls */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Roles</option>
              <option value="User">User</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
              <MdPersonAdd size={20} />
              Add User
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg"
          >
            <span className="text-sm font-medium">{selectedUsers.length} user(s) selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm transition">
                Activate
              </button>
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition">
                Suspend
              </button>
              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition">
                Promote
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Scans</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Flagged</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Joined</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-white">{user.username}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className="text-sm">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-3 text-sm">{user.totalScans}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${user.flaggedContent > 5 ? 'text-red-400' : user.flaggedContent > 0 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                      {user.flaggedContent}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{user.registrationDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition">
                        <MdEdit size={16} className="text-blue-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition">
                        <MdBlock size={16} className="text-yellow-400" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded transition">
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
        <span>Showing {filteredUsers.length} of {users.length} users</span>
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
