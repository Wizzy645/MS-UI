"use client";

import styles from "../sidebar/sidebar.module.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MdDashboardCustomize,
  MdManageAccounts,
  MdHistory,
  MdSecurity,
  MdSmartToy,
  MdAnnouncement,
  MdSettings,
  MdLogout,
  MdPeople,
  MdBlock,
  MdAssignmentTurnedIn,
  MdClose
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";

const menuItems = [
  {
    title: "Overview",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboardCustomize />,
      },
    ],
  },
  {
    title: "User Management",
    list: [
      {
        title: "Manage Users",
        path: "/dashboard/users",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "Content & Security",
    list: [
      {
        title: "Scan Logs",
        path: "/dashboard/scan-logs",
        icon: <MdHistory />,
      },
      {
        title: "Blacklist & Whitelist",
        path: "/dashboard/security-lists",
        icon: <MdBlock />,
      },
      {
        title: "AI Feedback & Training",
        path: "/dashboard/ai-training",
        icon: <MdSmartToy />,
      },
    ],
  },
  {
    title: "System Administration",
    list: [
      {
        title: "Announcements",
        path: "/dashboard/announcements",
        icon: <MdAnnouncement />,
      },
      {
        title: "System Settings",
        path: "/dashboard/admin-settings",
        icon: <MdSettings />,
      },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar when clicking on menu item on mobile
    const handleMenuItemClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            // Clear any stored authentication data
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            sessionStorage.clear();
            
            // Close sidebar on mobile
            if (isMobile && onClose) {
                onClose();
            }
            
            // Redirect to login page
            router.push("/login");
        }
    };

    return (
        <>
            {/* Mobile close button */}
            {isMobile && isOpen && (
                <div className="fixed top-4 right-4 z-50 md:hidden">
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-800 border border-white/20 rounded-lg text-white hover:bg-slate-700 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <MdClose size={24} />
                    </button>
                </div>
            )}

            <aside 
                className={`${styles.container} ${isOpen ? 'open' : ''}`} 
                aria-label="Admin Sidebar Navigation"
            >
                <div className={styles.user}>
                    <Image 
                        className={styles.userImage} 
                        src="/user-profile-avatar-png.webp" 
                        alt="Admin Avatar" 
                        width={50} 
                        height={50}
                        priority
                    />
                    <div className={styles.userDetail}>
                        <span className={styles.username}>Olamide Adesina</span>
                        <span className={styles.userTitle}>Super Administrator</span>
                    </div>
                </div>

                <nav role="navigation" aria-label="Admin menu">
                    <ul className={styles.list}>
                        {menuItems.map(cat => (
                            <li key={cat.title}>
                                <span className={styles.cat}>{cat.title}</span>
                                {cat.list.map(item => (
                                    <div key={item.title} onClick={handleMenuItemClick}>
                                        <MenuLink item={item} />
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </nav>

                <button 
                    className={styles.logout} 
                    aria-label="Log out"
                    onClick={handleLogout}
                >
                    <MdLogout />
                    Logout
                </button>
            </aside>
        </>
    );
}
