import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ITV</span>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {['home', 'ranking', 'predict'].map((section) => (
              <li key={section} className={styles.navItem}>
                <Link href={`/${section === 'home' ? '' : section}`} className={styles.navLink}>
                  <span className={styles.navText}>{section}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}


