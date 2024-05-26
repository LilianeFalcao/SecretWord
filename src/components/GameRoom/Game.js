import React, { useRef, useState } from 'react'
import styles from './Game.module.css'

const Game = ({
  verifyLetter,
  score,
  letraEscolhiida,
  categoriaEscolhida, 
  letrasAdivinhadas,
  letras, 
  letrasErradas,
  tentativas
}) => {
  const [letraJogada, setLetraJogada] = useState('');
  const letterInputRef = useRef(null);
  
  const handleInput = (e) =>{
    setLetraJogada(e.target.value )
  }
  const handleSubmit = (e) =>{
    e.preventDefault();

    verifyLetter(letraJogada);

    setLetraJogada('');
    letterInputRef.current.focus();
  }

  return (
    <div className={styles.body}>
        <p className={styles.pontuacao}>Pontuação: {score}</p>
        <h1 className={styles.h1A}>Adivinhe a palavra: </h1>
        <h3 className={styles.dica}>
          Dica: <span>{categoriaEscolhida}</span>
        </h3>
        <p>Você ainda possui {tentativas} tentativa(s).</p>
        <div className={styles.wordContariner}>
          {letras.map((letra, i) => (
            letrasAdivinhadas.includes(letra) ? (
              <span key={i} className={styles.letter} >{letra}</span>
            ) : (
              <span key={i} className={styles.squareblank} ></span>
            )
          ))}
        </div>
        <div className={styles.letterContainer}>
          <p>Faça uma tentativa! </p>
          <p>Observação: algumas palavras necessitam de acentuação</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text" 
              name='letraJogada'
              value={letraJogada}
              maxLength='1'
              ref={letterInputRef}
              required
              onChange={handleInput}
            />
            <button> Play </button>
          </form>
        </div>
        <div className="letraUsada">
          <p>Letras Utilizadas</p>
          {letrasErradas.map((letra, i ) => (
              <span key={i}>{letra}</span>
          ))}
        </div>
    </div>
  )
}

export default Game