import React, { useState } from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {showMobileSearch && (
        <div className={styles.mobileSearch}>
          <button onClick={() => setShowMobileSearch(false)}>←</button>
          <SearchBar />
        </div>
      )}

      <nav className={styles.navbar}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <h1>Tasks Manager</h1>

        <div className={styles.searchContainer}>
          <SearchBar />
        </div>

        <button
          className={styles.mobileSearchButton}
          onClick={() => setShowMobileSearch(true)}
          aria-label="Search"
        >
          🔍
        </button>
      </nav>
    </>
  );
};

export default Navbar;
