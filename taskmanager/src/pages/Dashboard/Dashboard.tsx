import React, { useState, useEffect } from "react";
import styles from "../../styles/layout.module.scss";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import Navbar from "../../components/organisms/Navbar/Navbar";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const arr = [1, 2, 3, 4, 5];
  console.log(arr.map((item) => item * 2));
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={styles.dashboardLayout}>
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.active : ""}`}
        onClick={closeSidebar}
      />

      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div className={styles.mainContainer}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className={styles.mainContent}>
          <h2>Welcome to Task Manager</h2>
          <p>Your task management dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
