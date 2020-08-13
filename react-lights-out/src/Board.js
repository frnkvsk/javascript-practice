import React, { useState } from "react";
import Cell from "./Cell";
// import {fiveByFive} from "./data";
import "./Board.css";
import SetBoard from "./SetBoard";
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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  let newBoard = SetBoard();
  setTimeout(() => {
    console.log(newBoard)
  }, 100);
  
  const [difficulty, setDifficulty] = useState(chanceLightStartsOn);
  let [board, setBoard] = 
    useState(
      Array(nrows).fill(0).map(_ => 
        Array(ncols).fill(0).map(_ => 
          Math.random() < chanceLightStartsOn
        )
      )
    );

  if(nrows !== board.length || chanceLightStartsOn !== difficulty) {
    board = Array(nrows).fill(0).map(_ => 
      Array(ncols).fill(0).map(_ => 
        Math.random() < chanceLightStartsOn
      )
    );
    setBoard(board);
    setDifficulty(chanceLightStartsOn);
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
        if(r === nrows || c === ncols) continue;
        newBoard[r][c] = !newBoard[r][c];
      }
      
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(board.every(e => e.every(f => !f))) {
    return (
      <h1>You win!!!</h1>
    )
  }

  // make table board
  const tableBoard = 
    Array(nrows).fill(0).map((_,i) => 
      Array(ncols).fill(0).map((_,j) => 
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
