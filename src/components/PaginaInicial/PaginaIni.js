import React from 'react'
import styles from './PaginaIni.module.css'

const PaginaIni = ({StartGame}) => {
  return (
    <div className={styles.body}>
        <h1 className={styles.textScret}>Secret</h1>
        <h1 className={styles.textWord}>Wo<span>R</span>d</h1>

        <button className={styles.playButton} onClick={StartGame}>PLAY</button>
    </div>
  )
}

export default PaginaIni