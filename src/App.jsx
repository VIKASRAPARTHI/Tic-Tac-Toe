import { useState } from "react";

import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]); // row,col, playerSymbol
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSqareSymbol =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSquareSymbol &&
      firstSqaureSymbol === thirdSqareSymbol
    ) {
      winner = firstSqaureSymbol;
    }
  }

  const hasDraw = gameBoard.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curAtivePlayer) => (curAtivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurn;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;