import styles from "@/app/components/Dashboard/footer/footer.module.css";
import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <span className={styles.logo}>MS Dev</span>
        <span className={styles.rights}>
          <FaCopyright className={styles.icon} />
          {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </footer>
  );
}
