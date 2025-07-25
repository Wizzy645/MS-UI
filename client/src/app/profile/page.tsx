"use client";

import React, { useState, useRef } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { MdPerson, MdEmail, MdCalendarToday, MdEdit, MdSave, MdCancel, MdCamera } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";

export default function UserProfile() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  if (!user?.isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm({
        name: user?.name || "",
        email: user?.email || ""
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.textContent = 'Profile updated successfully!';
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] transition-opacity';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (user && e.target?.result) {
          const updatedUser = {
            ...user,
            avatar: e.target.result as string
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-400 mt-2">Manage your personal information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Section */}
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
                onClick={handleAvatarClick}
              >
                {user?.avatar && user.avatar.startsWith('data:') ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user?.avatar || user?.name?.charAt(0).toUpperCase() || "U"
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
                  <MdCamera className="text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h2 className="text-2xl font-semibold">{user?.name}</h2>
                {user?.provider === 'google' && (
                  <FaGoogle className="text-red-500" title="Google Account" />
                )}
              </div>
              <p className="text-gray-400 mb-1">{user?.email}</p>
              <p className="text-sm text-gray-500">
                Member since {formatDate(user?.joinedAt)}
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 transition-colors"
            >
              <MdEdit />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Edit Form or Profile Details */}
        {isEditing ? (
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <MdPerson className="absolute left-3 top-3 text-purple-400" />
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-3 text-purple-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MdSave />
                  Save Changes
                </button>
                <button
                  onClick={handleEditToggle}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <MdCancel />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center gap-2 text-white">
                    <MdPerson className="text-purple-400" />
                    {user?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 text-white">
                    <MdEmail className="text-purple-400" />
                    {user?.email}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Member Since
                  </label>
                  <div className="flex items-center gap-2 text-white">
                    <MdCalendarToday className="text-purple-400" />
                    {formatDate(user?.joinedAt)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Account Type
                  </label>
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
