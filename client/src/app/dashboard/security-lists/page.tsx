"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MdAdd, 
  MdDelete,
  MdEdit,
  MdSearch,
  MdBlockFlaky,
  MdCheckCircle,
  MdLink,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdMoreVert
} from "react-icons/md";

const securityLists = [
  {
    id: "1",
    type: "URL",
    value: "fake-crypto-rewards.com",
    listType: "Blacklist",
    reason: "Cryptocurrency scam website",
    addedBy: "admin.system",
    dateAdded: "2024-03-10",
    category: "Crypto Scam"
  },
  {
    id: "2",
    type: "Email",
    value: "noreply@nigerian-prince.org",
    listType: "Blacklist", 
    reason: "Known phishing email domain",
    addedBy: "john.admin",
    dateAdded: "2024-03-08",
    category: "Phishing"
  },
  {
    id: "3",
    type: "URL",
    value: "google.com",
    listType: "Whitelist",
    reason: "Trusted search engine",
    addedBy: "admin.system",
    dateAdded: "2024-01-15",
    category: "Trusted"
  },
  {
    id: "4", 
    type: "Phone",
    value: "+234-XXX-SCAM",
    listType: "Blacklist",
    reason: "Reported scam phone number",
    addedBy: "sarah.mod",
    dateAdded: "2024-03-12",
    category: "Phone Scam"
  },
  {
    id: "5",
    type: "IP",
    value: "192.168.1.100",
    listType: "Blacklist",
    reason: "Suspicious activity detected",
    addedBy: "security.bot",
    dateAdded: "2024-03-14",
    category: "Suspicious IP"
  },
  {
    id: "6",
    type: "URL", 
    value: "microsoft.com",
    listType: "Whitelist",
    reason: "Trusted technology company",
    addedBy: "admin.system",
    dateAdded: "2024-01-15",
    category: "Trusted"
  }
];

const categories = [
  "All Categories",
  "Crypto Scam",
  "Phishing", 
  "Phone Scam",
  "Suspicious IP",
  "Romance Scam",
  "Trusted",
  "Government",
  "Banking"
];

export default function SecurityLists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterList, setFilterList] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "URL",
    value: "",
    listType: "Blacklist",
    reason: "",
    category: "Crypto Scam"
  });

  const filteredItems = securityLists.filter(item => {
    const matchesSearch = item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || item.type === filterType;
    const matchesList = filterList === "All" || item.listType === filterList;
    const matchesCategory = filterCategory === "All Categories" || item.category === filterCategory;
    
    return matchesSearch && matchesType && matchesList && matchesCategory;
  });

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredItems.length 
        ? [] 
        : filteredItems.map(item => item.id)
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "URL": return <MdLink className="text-blue-400" />;
      case "Email": return <MdEmail className="text-green-400" />;
      case "Phone": return <MdPhone className="text-purple-400" />;
      case "IP": return <MdLocationOn className="text-orange-400" />;
      default: return <MdBlockFlaky className="text-gray-400" />;
    }
  };

  const getListBadge = (listType: string) => {
    return listType === "Blacklist" ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600/20 text-red-400 border border-red-500/30 flex items-center gap-1">
        <MdBlockFlaky size={12} />
        Blacklist
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
        <MdCheckCircle size={12} />
        Whitelist
      </span>
    );
  };

  const handleAddItem = () => {
    // Simulate adding new item
    console.log("Adding new item:", newItem);
    setShowAddModal(false);
    setNewItem({
      type: "URL",
      value: "",
      listType: "Blacklist", 
      reason: "",
      category: "Crypto Scam"
    });
  };

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Security Lists Management
        </h1>
        <p className="text-gray-300">Manage blacklisted and whitelisted URLs, emails, phone numbers, and IP addresses.</p>
      </header>

      {/* Controls */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by value or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
          >
            <MdAdd size={20} />
            Add Entry
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Types</option>
            <option value="URL">URL</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="IP">IP Address</option>
          </select>

          <select
            value={filterList}
            onChange={(e) => setFilterList(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Lists</option>
            <option value="Blacklist">Blacklist</option>
            <option value="Whitelist">Whitelist</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mt-4 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg"
          >
            <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition">
                Delete Selected
              </button>
              <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm transition">
                Move to Whitelist
              </button>
              <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition">
                Move to Blacklist
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Blacklisted Items</p>
          <p className="text-2xl font-bold text-red-400">{securityLists.filter(item => item.listType === "Blacklist").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Whitelisted Items</p>
          <p className="text-2xl font-bold text-emerald-400">{securityLists.filter(item => item.listType === "Whitelist").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">URLs Managed</p>
          <p className="text-2xl font-bold text-blue-400">{securityLists.filter(item => item.type === "URL").length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg">
          <p className="text-sm text-gray-400 mb-1">Total Entries</p>
          <p className="text-2xl font-bold text-purple-400">{securityLists.length}</p>
        </div>
      </div>

      {/* Security Lists Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Value</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">List</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Added By</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="text-sm">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-gray-300">{item.value}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getListBadge(item.listType)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded border border-gray-500/30">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-400 max-w-xs truncate block" title={item.reason}>
                      {item.reason}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{item.addedBy}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{item.dateAdded}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-white/10 rounded transition" title="Edit">
                        <MdEdit size={16} className="text-blue-400" />
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-white/20 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Add Security List Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="URL">URL</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="IP">IP Address</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Value</label>
                <input
                  type="text"
                  value={newItem.value}
                  onChange={(e) => setNewItem({...newItem, value: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter URL, email, phone, or IP..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">List Type</label>
                <select
                  value={newItem.listType}
                  onChange={(e) => setNewItem({...newItem, listType: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Blacklist">Blacklist</option>
                  <option value="Whitelist">Whitelist</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason</label>
                <textarea
                  value={newItem.reason}
                  onChange={(e) => setNewItem({...newItem, reason: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Why is this being added to the list?"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddItem}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Add Entry
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

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-400">
        <span>Showing {filteredItems.length} of {securityLists.length} entries</span>
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
