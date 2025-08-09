import React,{ useEffect, useState} from 'react'
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';
import { getAIMoveFromOpenRouter }  from './utils/aiOpenrouter';
import { checkWinner } from './utils/winner';

const App = () => {



  // state for the 3x3 board(9 cells)

  const [board, setBoard] = useState(Array(9).fill(null));

  // is it the player's turn?
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  //who won "X" or "O" or "draw"
  const [winner, setWinner] = useState(null);

  // score tracking
  const [score, setScore] = useState({ X: 0, O: 0,});

  // when a player clicks a square
  const handleClick = (i) => {


    if(!isPlayerTurn || board[i] ||winner) return;

    const newBoard = [...board];

    newBoard[i] = 'X'; 

    setBoard(newBoard);
    setIsPlayerTurn(false);
    
 }
 useEffect(() => {

  if(winner) return

  // Check for winner after each move

  const result = checkWinner(board);

  if(result?.winner) {
    setWinner(result.winner);
    if(result.winner === 'X' || result?.winner === 'O') {
      setScore((prev) => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
      return;
    }
  }
    // If its AIs turn and game not over

     if(!isPlayerTurn && !winner) {

      const aiTurn = async () => {
      const move = await getAIMoveFromOpenRouter(board);
      
      if(move !== null && board[move] === null){
        const newBoard = [...board];
        newBoard[move] = 'O';
        setBoard(newBoard);
        setIsPlayerTurn(true);

        // Check for winner after AI move
        
      }
    }
      const timeOut = setTimeout(aiTurn,600);
      return () => clearTimeout(timeOut);
  }

},[board, isPlayerTurn, winner])
  
const restartGame = () => {
  setBoard(Array(9).fill(null));
  setIsPlayerTurn(true);
  setWinner(null);
}

  return (
     <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
    <h1 className="text-3xl font-bold mb-4">Tic Tac TAI</h1>

    <ScoreBoard score = {score}/>

    <GameBoard board ={board} handleClick={handleClick}/>

    {winner && (
      <div className='mt-4 text-xl'>
        {winner === 'draw' ? "It's a draw!" : `${winner} wins`}
        <button onClick={restartGame}
        className='ml-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition'>
          play again
        </button>
      </div>
  )
}
</div>
  )
}

export default App