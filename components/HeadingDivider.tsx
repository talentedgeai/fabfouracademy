import styles from './HeadingDivider.module.css'

interface Props {
  word1: string
  word2: string
  variant?: 'orange-blue' | 'blue-orange' | 'on-dark'
  size?: 'h1' | 'h2' | 'h3' | 'h4'
  hideBrush?: boolean
}

export default function HeadingDivider({
  word1,
  word2,
  variant = 'orange-blue',
  size = 'h2',
  hideBrush = false,
}: Props) {
  return (
    <div className={`${styles.heading} ${styles[variant]} ${styles[size]}`}>
      <span className={styles.word1}>{word1}</span>
      <span className={styles.word2}>{word2}</span>
      {!hideBrush && <span className={styles.brush} />}
    </div>
  )
}
