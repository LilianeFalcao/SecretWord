import React from 'react'
import styles from "./GameOver.module.css"

const GameOver = ({playAgain, score}) => {
  return (
    <div >
        <h1 className={styles.GameOverText}> Game Over! </h1>
        <p className={styles.PontuacaoText}>Sua pontuação foi de: <span> {score} </span></p>

        <p>Tente Novamente</p>
        <button onClick={playAgain} className={styles.AgainButton}>Play Again</button>
    </div>
  )
}

export default GameOver