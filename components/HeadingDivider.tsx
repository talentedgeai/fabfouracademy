import styles from './HeadingDivider.module.css'

interface Props {
  word1: string
  word2: string
  variant?: 'orange-blue' | 'blue-orange' | 'on-dark'
  size?: 'h1' | 'h2' | 'h3' | 'h4'
}

export default function HeadingDivider({
  word1,
  word2,
  variant = 'orange-blue',
  size = 'h2',
}: Props) {
  return (
    <div className={`${styles.heading} ${styles[variant]} ${styles[size]}`}>
      <span className={styles.word1}>{word1}</span>
      <span className={styles.word2}>{word2}</span>
      <span className={styles.brush} />
    </div>
  )
}
