import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo}>
          Calculator
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;