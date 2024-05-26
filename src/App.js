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

  const [ gameStage , setGameStage ] = useState(Stages[2].name);


  //const [mudaTela , setMudarTela ] = useState("")

  return (
    <div className="App">
      {gameStage === 'start'  && <PaginaIni />}
      {gameStage === 'gaming'  && <Game />}
      {gameStage === 'gameOver'  && <GameOver />}
      
    </div>
  );
}

export default App;
