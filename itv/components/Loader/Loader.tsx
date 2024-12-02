import React from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
}

export default function Loader({ size = 'medium' } : LoaderProps){
  return (
    <div className={styles.container}>
      <div className={`${styles.loader} ${styles[size]}`}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  )
}



