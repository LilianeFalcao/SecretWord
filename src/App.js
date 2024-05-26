import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {wordsList} from './data/Words'

import PaginaIni from './components/PaginaInicial/PaginaIni';
import Game from './components/GameRoom/Game';
import GameOver from './components/GameOver/GameOver';
import Win from './components/vitorias/telaWin';

const TentaPadrao = 5;

function App() {
  //estagios
  const Stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'gaming' },
    { id: 3, name: 'gameOver' },
    { id: 4, name: 'Win' },
  ]

  const [words] = useState(wordsList);

  const [ gameStage , setGameStage ] = useState(Stages[0].name);
  const [ letraEscolhiida , setLetraEscolhida] = useState("");
  const [ categoriaEscolhida , setCategoriaEscolida] = useState("");
  const [ letras , setLetra] = useState([]);

  const [ letrasAdivinhadas, setLetrasAdivinhadas ] = useState([]);
  const [ letrasErradas, setLetrasErradas ] = useState([]);
  const [ tentativas, setTentativas ] = useState(TentaPadrao);
  const [ score, setScore] = useState(0);
  
  const pegarLetraCategoria = useCallback(() =>{

    //pegando categoria
      const categories = Object.keys(words)
      const category = categories[Math.floor(Math.random() * Object.keys(categories).length)] ;
    //pegando palavra
      const word = words[category][Math.floor(Math.random() * words[category].length)];
      return {word, category};

  }, [words]);

  //starta o jogo
  const StartGame = useCallback(() => {
    const { category, word } = pegarLetraCategoria();

    clearStates();

    //criando array de letras
    let wordLetters = word.split("");

    wordLetters= wordLetters.map((l) => l.toLowerCase());
    
    setLetraEscolhida(word)
    setCategoriaEscolida(category)
    setLetra(wordLetters)

    setGameStage(Stages[1].name);
  }, [pegarLetraCategoria]);

  //botao q testa a letra input
  const verifyLetter = (letraJogada) =>{
    const normalizaLetra = letraJogada.toLowerCase();

    //vendo se a letra foi usada
    if(
        letrasAdivinhadas.includes(normalizaLetra) || 
        letrasErradas.includes(normalizaLetra)){
        return;
      };
    
      if (letras.includes(normalizaLetra)) {
        setLetrasAdivinhadas((letrasAdiAgr) => [
          ...letrasAdiAgr, normalizaLetra,
        ]);
      } else {
        setLetrasErradas((wrongLetter) => [
          ...wrongLetter, normalizaLetra,
        ]);
        setTentativas((tentativasAtual ) => tentativasAtual - 1)
      }
  };

  //useEffect das tentativas
  const clearStates = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  }

  useEffect(() => {
    if( tentativas <= 0 ){
      clearStates();

      setGameStage(Stages[2].name);
    }
  }, [tentativas]);

  //checando vitorias

  useEffect(() =>{
    const uniqueLetter = [...new Set(letras)];

    //win 
    if(letrasAdivinhadas.length === uniqueLetter.length && gameStage === Stages[1].name ){
      setScore((atualScore) => atualScore += 100);
      StartGame();
    }
    if(score === 1000){
      setGameStage(Stages[3].name)
    }
    

  }, [letrasAdivinhadas, letras, StartGame, gameStage]);

  //restart game
  const playAgain = () =>{
    setScore(0);
    setTentativas(TentaPadrao);

    setGameStage(Stages[1].name);
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
      {gameStage === 'gameOver'  && <GameOver score = {score} playAgain={playAgain} />}
      {gameStage === 'Win'  && <Win score = {score} playAgain={playAgain} />}
    </div>
  );
}

export default App;
