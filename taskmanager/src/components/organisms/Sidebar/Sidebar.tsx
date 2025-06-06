import React from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              ✅ Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              📅 Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              📊 Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              ⚙️ Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
