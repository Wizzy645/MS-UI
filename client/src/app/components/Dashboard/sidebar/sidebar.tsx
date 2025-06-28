"use client";

import styles from "../sidebar/sidebar.module.css";
import React from "react";
import Image from "next/image";
import {
  MdDashboardCustomize,
  MdLink,
  MdHistory,
  MdManageAccounts,
  MdSettings,
  MdHelpOutline,
  MdReportProblem,
  MdLogout,
  MdStars,
  MdOutlineShield,
  MdOutlineUpgrade,
  MdGroupAdd
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";

const menuItems = [
  {
    title: "Main",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboardCustomize />,
      },
      {
        title: "Scan Link / Message",
        path: "/dashboard/scan",
        icon: <MdLink />,
      },
      {
        title: "Scan History",
        path: "/dashboard/history",
        icon: <MdHistory />,
      },
      {
        title: "AI Reports",
        path: "/dashboard/reports",
        icon: <MdOutlineShield />,
      },
    ],
  },
  {
    title: "Account",
    list: [
      {
        title: "My Profile",
        path: "/dashboard/profile",
        icon: <MdManageAccounts />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdSettings />,
      },
    ],
  },
  {
    title: "Trust & Safety",
    list: [
      {
        title: "Report a Scam",
        path: "/dashboard/report-scam",
        icon: <MdReportProblem />,
      },
      {
        title: "Help Center",
        path: "/dashboard/help",
        icon: <MdHelpOutline />,
      },
    ],
  },
  {
    title: "Extras",
    list: [
      {
        title: "Upgrade Plan",
        path: "/dashboard/upgrade",
        icon: <MdOutlineUpgrade />,
      },
      {
        title: "Invite Friends",
        path: "/dashboard/invite",
        icon: <MdGroupAdd />,
      },
    ],
  },

];
export default function Sidebar() {
    return (
        <aside className={styles.container} aria-label="Sidebar Navigation">
            <div className={styles.user}>
                <Image className={styles.userImage} src="/user-profile-avatar-png.webp" alt="User Avatar" width={50} height={50} />
                <div className={styles.userDetail}>
                    <span className={styles.username}>John Doe</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
           <nav role="navigation" aria-label="Main menu">
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
           <button className={styles.logout} aria-label="Log out"><MdLogout />Logout</button>
        </aside>
    );
}
