import React from "react";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
    >
      <button
        className={styles.closeButton}
        onClick={closeSidebar}
        aria-label="Close menu"
      >
        ✕
      </button>

      <h2 className={styles.logo}>TaskManager</h2>
      <nav>
        <ul>
          <li>
            <a href="#" className={styles.active}>
              📋 Dashboard
            </a>
          </li>
          <li>
            <a href="#">✅ Tasks</a>
          </li>
          <li>
            <a href="#">📅 Calendar</a>
          </li>
          <li>
            <a href="#">📊 Reports</a>
          </li>
          <li>
            <a href="#">⚙️ Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
