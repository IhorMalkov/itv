import React from 'react'
import styles from './team.module.css'
import Card from './Card'

interface TeamCardProps {
  position: number
  name: string
  points: number
  logo: string
}

export default function TeamCard({ position, name, points, logo }: TeamCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.position}>
        <span className={styles.positionNumber}>{position}</span>
        <div className={styles.positionLine}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt={`${name} logo`} className={styles.logo} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.pointsWrapper}>
            <span className={styles.pointsValue}>{points}</span>
            <span className={styles.pointsLabel}>HLTV</span>
          </div>
        </div>
        <div className={styles.graph}>
          <div
            className={styles.graphBar}
            style={{ height: `${(points / 1000) * 100}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
}

