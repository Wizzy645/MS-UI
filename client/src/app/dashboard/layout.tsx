import React, { ReactNode } from "react";
import Navbar from "../components/Dashboard/navbar/navbar";
import Sidebar from "../components/Dashboard/sidebar/sidebar";
import styles from "../components/Dashboard/dashboard.module.css";
import Footer from "../components/Dashboard/footer/footer";
import AdminRoute from "../components/AdminRoute";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <AdminRoute>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Sidebar />
                </div>
                <div className={styles.content}>
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </div>
        </AdminRoute>
    );
}
