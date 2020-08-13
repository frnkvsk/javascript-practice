import React, { useState } from "react";
import Cell from "./Cell";
import SetBoard from "./SetBoard";
import GameOver from "./GameOver";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ chanceLightStartsOn }) {
  let [level, setLevel] = useState(chanceLightStartsOn);
  let [board, setBoard] = useState(SetBoard(level)[1]);

  if(level !== chanceLightStartsOn) {
    level = chanceLightStartsOn;
    setLevel(level);      
    board = SetBoard(level)[1]
    setBoard(board.map(e => e.slice()).slice());
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord;
      // (deep) copy of the oldBoard
      let newBoard = oldBoard.slice();
      // in the copy, flip this cell and the cells around it
      for(let [a,b] of [[0,0], [-1,0], [1,0], [0,-1], [0,1]]) {
        let r = y+a, c = x+b;
        if(r < 0 || c < 0) continue;
        if(r === 5 || c === 5) continue;
        newBoard[r][c] = !newBoard[r][c];
      }
      
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(board.every(e => e.every(f => !f))) {
    return (
      <GameOver />
    )
  }

  // make table board
  const tableBoard = 
    Array(5).fill(0).map((_,i) => 
      Array(5).fill(0).map((_,j) => 
        <Cell 
          key={`${i}-${j}`} 
          flipCellsAroundMe={() => flipCellsAround([i,j]) } 
          isLit={board[i][j]}
        /> 
      )
    );

  return (
    <tbody>
      {tableBoard.map((row,i) => <tr key={i}>{row}</tr>)}
    </tbody>    
  ) 
    
}

export default Board;
