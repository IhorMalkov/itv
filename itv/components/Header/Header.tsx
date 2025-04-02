import Link from "next/link"
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ITV</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/ranking" className={styles.navLink}>
                Ranking
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/predictions" className={styles.navLink}>
                Predictions
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
