import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../store/auth/actions";
import styles from "./Header.module.css";
import { useAppDispatch } from "../../store/hooks";

function Header() {
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src="/images/valr_logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brand}>Loans Portal</span>
      </Link>

      <nav className={styles.nav}>
        <div className="nav-links">
          <>
            <button
              onClick={() => dispatch(logout())}
              className={styles.navButton}
            >
              Logout
            </button>
          </>
        </div>
      </nav>
    </header>
  );
}

export default Header;
