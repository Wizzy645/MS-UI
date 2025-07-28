"use client";

import styles from "../sidebar/sidebar.module.css";
import React from "react";
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
  MdAssignmentTurnedIn
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

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            // Clear any stored authentication data
            localStorage.removeItem("authToken");
            localStorage.removeItem("userProfile");
            sessionStorage.clear();
            
            // Redirect to login page
            router.push("/login");
        }
    };

    return (
        <aside className={styles.container} aria-label="Admin Sidebar Navigation">
            <div className={styles.user}>
                <Image className={styles.userImage} src="/user-profile-avatar-png.webp" alt="Admin Avatar" width={50} height={50} />
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
                          <MenuLink item={item} key={item.title} />
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
             <MdLogout />Logout
           </button>
        </aside>
    );
}
