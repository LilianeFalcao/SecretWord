import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {wordsList} from './data/Words'

import PaginaIni from './components/PaginaInicial/PaginaIni';
import Game from './components/GameRoom/Game';
import GameOver from './components/GameOver/GameOver';

function App() {
  //estagios
  const Stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'gaming' },
    { id: 3, name: 'gameOver' },
  ]

  const [words] = useState(wordsList);

  const [ gameStage , setGameStage ] = useState(Stages[0].name);
  const [ letraEscolhiida , setLetraEscolhida] = useState("");
  const [ categoriaEscolhida , setCategoriaEscolida] = useState("");
  const [ letras , setLetra] = useState([]);

  const [ letrasAdivinhadas, setLetrasAdivinhadas ] = useState([]);
  const [ letrasErradas, setLetrasErradas ] = useState([]);
  const [ tentativas, setTentativas ] = useState(5);
  const [ score, setScore] = useState(0);
  
  const pegarLetraCategoria = () =>{
    //pegando categoria
      const categories = Object.keys(words)
      const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] ;
    //pegando palavra
      const word = words[category][Math.floor(Math.random() * words[category].length)];
      return {word, category};
  };

  //starta o jogo
  const StartGame = () => {
    const { category, word } = pegarLetraCategoria();

    //criando array de letras
    let wordLetters = word.split("");

    wordLetters= wordLetters.map((l) => l.toLowerCase());
    
    setLetraEscolhida(word)
    setCategoriaEscolida(category)
    setLetra(wordLetters)

    setGameStage(Stages[1].name);
  };

  //botao q testa a letra input
  const verifyLetter = (letraJogada) =>{
    console.log(letraJogada)
  };
  

  //restart game
  const playAgain = () =>{
    setGameStage(Stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === 'start'  && <PaginaIni  StartGame={StartGame}/>}
      {gameStage === 'gaming' 
        && <Game 
            verifyLetter={verifyLetter} 
            letraEscolhiida = {letraEscolhiida}
            categoriaEscolhida = {categoriaEscolhida}
            letrasAdivinhadas = {letrasAdivinhadas}
            letras = {letras}
            letrasErradas = {letrasErradas}
            tentativas = {tentativas}
            score = {score}
      />}
      {gameStage === 'gameOver'  && <GameOver playAgain={playAgain} />}
    </div>
  );
}

export default App;
