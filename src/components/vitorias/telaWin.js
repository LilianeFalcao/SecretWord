import React from 'react'
import styles from "./telaWin.module.css"

const telaWin = ({score}) => {
  return (
    <div>
        <h1 className={styles.parabens}> Parabéns, você ganhou!</h1>
        <h3>Pontuação: <span>{score}</span> </h3>
    </div>
  )
}

export default telaWin