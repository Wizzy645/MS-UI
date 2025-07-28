"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch, MdClose } from "react-icons/md";

const mockNotifications = [
    {
        id: "1",
        title: "New user registration",
        message: "john.doe@email.com has registered",
        time: "2 min ago",
        type: "user",
        unread: true
    },
    {
        id: "2",
        title: "High confidence scam detected",
        message: "Potential cryptocurrency scam flagged",
        time: "15 min ago",
        type: "security",
        unread: true
    },
    {
        id: "3",
        title: "System maintenance completed",
        message: "AI model update successfully deployed",
        time: "1 hour ago",
        type: "system",
        unread: false
    }
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    
    const unreadCount = notifications.filter(n => n.unread).length;

    const formatPageTitle = (path: string) => {
        const segments = path.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        
        // Convert kebab-case to Title Case
        return lastSegment
            ?.split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ") || "Dashboard";
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Implement global search functionality
            console.log("Searching for:", searchTerm);
            
            // Example: Navigate to users page with search term
            if (searchTerm.includes("@") || searchTerm.toLowerCase().includes("user")) {
                router.push(`/dashboard/users?search=${encodeURIComponent(searchTerm)}`);
            } else if (searchTerm.toLowerCase().includes("scan") || searchTerm.toLowerCase().includes("log")) {
                router.push(`/dashboard/scan-logs?search=${encodeURIComponent(searchTerm)}`);
            } else {
                // General search - could implement a search results page
                alert(`Searching for: "${searchTerm}"\n\nTip: Try searching for users (email), scans, or specific IDs`);
            }
            
            setSearchTerm("");
        }
    };

    const markNotificationAsRead = (notificationId: string) => {
        setNotifications(prev => 
            prev.map(notif => 
                notif.id === notificationId 
                    ? { ...notif, unread: false }
                    : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notif => ({ ...notif, unread: false }))
        );
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "user": return "👤";
            case "security": return "🚨";
            case "system": return "⚙��";
            default: return "📢";
        }
    };

    return ( 
        <div className={styles.container}>
            <div className={styles.title} aria-live="polite" aria-atomic="true">
                {formatPageTitle(pathname)}
            </div>
            <div className={styles.menu}>
                <form onSubmit={handleSearch} className={styles.search}>
                    <MdSearch aria-hidden="true" />
                    <input 
                        type="text" 
                        placeholder="Search users, scans, IDs..." 
                        className={styles.input} 
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
                <div className={styles.icon} role="navigation" aria-label="User notifications and actions">
                    <button 
                        className={styles.iconButton} 
                        aria-label="Open chat"
                        onClick={() => alert("Chat feature coming soon!")}
                    >
                        <MdOutlineChat size={20} />
                    </button>
                    
                    <div className="relative">
                        <button 
                            className={`${styles.iconButton} relative`} 
                            aria-label={`View notifications (${unreadCount} unread)`}
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <MdNotifications size={20}/>
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-white/20 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-white/10">
                                    <h3 className="font-semibold text-white">Notifications</h3>
                                    <div className="flex gap-2">
                                        {unreadCount > 0 && (
                                            <button 
                                                onClick={markAllAsRead}
                                                className="text-xs text-blue-400 hover:text-blue-300"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => setShowNotifications(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <MdClose size={16} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="max-h-64 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-gray-400">
                                            No notifications
                                        </div>
                                    ) : (
                                        notifications.map(notification => (
                                            <div 
                                                key={notification.id}
                                                className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition ${
                                                    notification.unread ? "bg-blue-500/10" : ""
                                                }`}
                                                onClick={() => markNotificationAsRead(notification.id)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="text-lg">
                                                        {getNotificationIcon(notification.type)}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-medium ${
                                                            notification.unread ? "text-white" : "text-gray-300"
                                                        }`}>
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400 truncate">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    {notification.unread && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                <div className="p-3 border-t border-white/10">
                                    <button 
                                        className="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition"
                                        onClick={() => {
                                            setShowNotifications(false);
                                            // Navigate to a full notifications page
                                            console.log("Navigate to full notifications page");
                                        }}
                                    >
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        className={styles.iconButton} 
                        aria-label="View public content"
                        onClick={() => window.open("/", "_blank")}
                    >
                        <MdPublic size={20} />
                    </button>
                </div>
            </div>
        </div>
     );
}
