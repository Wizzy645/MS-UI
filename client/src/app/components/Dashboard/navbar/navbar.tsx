"use client"
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import {MdNotifications, MdOutlineChat, MdPublic, MdSearch} from "react-icons/md";

export default function Navbar() {
    const pathname = usePathname()
    return ( 
        <div className={styles.container}>
            <div className={styles.title} aria-live="polite" aria-atomic="true">
                {pathname.split("/").pop()}
            </div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch aria-hidden="true" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className={styles.input} 
                        aria-label="Search"
                    />
                </div>
                <div className={styles.icon} role="navigation" aria-label="User notifications and actions">
                    <button className={styles.iconButton} aria-label="Open chat">
                        <MdOutlineChat size={20} />
                    </button>
                    <button className={styles.iconButton} aria-label="View notifications">
                        <MdNotifications size={20}/>
                    </button>
                    <button className={styles.iconButton} aria-label="View public content">
                        <MdPublic size={20} />
                    </button>
                </div>
                
            </div>
        </div>
     )
    
}
