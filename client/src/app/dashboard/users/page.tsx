"use client";

import React, { useState, useEffect } from "react";
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
  MdDelete,
  MdClose
} from "react-icons/md";

// Mock user data - in a real app, this would come from an API
const initialUsers = [
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
  },
  {
    id: "6",
    username: "emma_davis",
    email: "emma.davis@email.com",
    role: "User",
    status: "Active",
    registrationDate: "2024-02-14",
    totalScans: 67,
    flaggedContent: 1,
    avatar: "/user-profile-avatar-png.webp"
  },
  {
    id: "7",
    username: "david_miller",
    email: "david.miller@email.com",
    role: "Moderator",
    status: "Active",
    registrationDate: "2024-01-20",
    totalScans: 92,
    flaggedContent: 0,
    avatar: "/user-profile-avatar-png.webp"
  }
];

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  registrationDate: string;
  totalScans: number;
  flaggedContent: number;
  avatar: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "User",
    status: "Active"
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesStatus = filterStatus === "All" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const showMessage = (message: string) => {
    setShowSuccessMessage(message);
    setTimeout(() => setShowSuccessMessage(""), 3000);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === paginatedUsers.length 
        ? [] 
        : paginatedUsers.map(user => user.id)
    );
  };

  const handleBulkAction = (action: string) => {
    const usernames = users.filter(u => selectedUsers.includes(u.id)).map(u => u.username).join(", ");
    
    switch (action) {
      case "activate":
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: "Active" } : user
        ));
        showMessage(`Activated ${selectedUsers.length} user(s): ${usernames}`);
        break;
      case "suspend":
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: "Suspended" } : user
        ));
        showMessage(`Suspended ${selectedUsers.length} user(s): ${usernames}`);
        break;
      case "promote":
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) && user.role === "User" 
            ? { ...user, role: "Moderator" } : user
        ));
        showMessage(`Promoted ${selectedUsers.length} user(s) to Moderator: ${usernames}`);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
          setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
          showMessage(`Deleted ${selectedUsers.length} user(s): ${usernames}`);
        }
        break;
    }
    setSelectedUsers([]);
  };

  const handleUserAction = (userId: string, action: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case "edit":
        setEditingUser(user);
        setShowEditModal(true);
        break;
      case "block":
        const newStatus = user.status === "Suspended" ? "Active" : "Suspended";
        setUsers(prev => prev.map(u => 
          u.id === userId ? { ...u, status: newStatus } : u
        ));
        showMessage(`${newStatus === "Suspended" ? "Suspended" : "Activated"} user: ${user.username}`);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete user: ${user.username}?`)) {
          setUsers(prev => prev.filter(u => u.id !== userId));
          showMessage(`Deleted user: ${user.username}`);
        }
        break;
    }
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email) {
      alert("Please fill in all required fields");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      registrationDate: new Date().toISOString().split('T')[0],
      totalScans: 0,
      flaggedContent: 0,
      avatar: "/user-profile-avatar-png.webp"
    };

    setUsers(prev => [...prev, user]);
    setShowAddModal(false);
    setNewUser({ username: "", email: "", role: "User", status: "Active" });
    showMessage(`Added new user: ${user.username}`);
  };

  const handleEditUser = () => {
    if (!editingUser) return;

    setUsers(prev => prev.map(u => 
      u.id === editingUser.id ? editingUser : u
    ));
    setShowEditModal(false);
    setEditingUser(null);
    showMessage(`Updated user: ${editingUser.username}`);
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

            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
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
              <button 
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm transition"
              >
                Activate
              </button>
              <button 
                onClick={() => handleBulkAction("suspend")}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
              >
                Suspend
              </button>
              <button 
                onClick={() => handleBulkAction("promote")}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition"
              >
                Promote
              </button>
              <button 
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition"
              >
                Delete
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
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
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
              {paginatedUsers.map((user, i) => (
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
                      <button 
                        onClick={() => handleUserAction(user.id, "edit")}
                        className="p-1 hover:bg-white/10 rounded transition"
                        title="Edit user"
                      >
                        <MdEdit size={16} className="text-blue-400" />
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, "block")}
                        className="p-1 hover:bg-white/10 rounded transition"
                        title={user.status === "Suspended" ? "Activate user" : "Suspend user"}
                      >
                        <MdBlock size={16} className={user.status === "Suspended" ? "text-emerald-400" : "text-yellow-400"} />
                      </button>
                      <button 
                        onClick={() => handleUserAction(user.id, "delete")}
                        className="p-1 hover:bg-white/10 rounded transition"
                        title="Delete user"
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
        <span>Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users</span>
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddUser}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Add User
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

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditUser}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
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
