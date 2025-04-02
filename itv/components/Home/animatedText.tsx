"use client"

import { useEffect, useState } from "react"
import styles from "./animated-text.module.css"

interface AnimatedTextProps {
  texts: string[]
  delays: number[]
  className?: string
}

export default function AnimatedText({ texts, delays, className = "" }: AnimatedTextProps) {
  const [visibleTexts, setVisibleTexts] = useState<boolean[]>(Array(texts.length).fill(false))

  useEffect(() => {
    let cumulativeDelay = 0

    texts.forEach((_, index) => {
      cumulativeDelay += delays[index]

      const timer = setTimeout(() => {
        setVisibleTexts((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, cumulativeDelay)

      return () => clearTimeout(timer)
    })
  }, [texts, delays])

  return (
    <div className={`${styles.container} ${className}`}>
      {texts.map((text, index) => (
        <div key={index} className={`${styles.textItem} ${visibleTexts[index] ? styles.visible : ""}`}>
          {text}
        </div>
      ))}
    </div>
  )
}

