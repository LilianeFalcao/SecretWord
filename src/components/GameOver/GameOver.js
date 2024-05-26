import React from 'react'
import styles from "./GameOver.module.css"

const GameOver = () => {
  return (
    <div >
        <h1 className={styles.GameOverText}> Game Over </h1>
        <p className={styles.PontuacaoText}>Sua pontuação foi de:  </p>

        <button className={styles.AgainButton}>Play Again</button>
    </div>
  )
}

export default GameOver