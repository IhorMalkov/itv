import Header from "../Header/Header"
import AnimatedText from "./animatedText"
import styles from "./home.module.css"

export default function HomePage() {
  const texts = ["Welcome to itv!", "here is your modern way to explore, and predict cs2 matches and teams"]

  const delays = [500, 1000] 

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <AnimatedText texts={texts} delays={delays} className={styles.animatedTextContainer} />
        </div>
        <div className={styles.featuresSection}>
          <div className={styles.feature}>
            <h3>Live Matches</h3>
            <p>Stay updated with real-time match information and statistics</p>
          </div>
          <div className={styles.feature}>
            <h3>Team Analytics</h3>
            <p>Explore detailed team profiles and performance metrics</p>
          </div>
          <div className={styles.feature}>
            <h3>Smart Predictions</h3>
            <p>Get data-driven predictions for upcoming CS2 matches</p>
          </div>
        </div>
      </main>
    </div>
  )
}