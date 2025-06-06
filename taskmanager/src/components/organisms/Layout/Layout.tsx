import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import styles from "../../../styles/layout.module.scss";
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
      <main className={styles.mainContainer}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className={styles.mainContent}>
          <Outlet context={{ toggleSidebar }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
