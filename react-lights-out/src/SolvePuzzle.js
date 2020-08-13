
function solvePuzzleHelper (board, row, col) {
  for(let [a,b] of [[0,0], [-1,0], [1,0], [0,-1], [0,1]]) {
    let r = row+a, c = col+b, l = board.length;
    if(r < 0 || c < 0) continue;
    if(r === l || c === l) continue;
    board[r][c] = board[r][c] ? 0 : 1 //!board[r][c];
  }
  return board;
}

let count = 0;

async function SolvePuzzle (board)  {
  if(board && ++count < 500) { 
    // check if board is solved
    if(board.every(a => a.every(b => !b))) {
      return true;
    }

    // check which row is our new current row
    // current row = row below the top row which contains a cell that is true/on
    let currentRow = 0;
    while(currentRow < board.length) {
      if(board[currentRow].every(a => !a)) {
        currentRow++;
      } else {
        currentRow++;
        break;
      }
    }
    
    // check if current row is the last/bottom row
    if(currentRow === board.length) {
      // if true, start at the top row and recurse on each cell
      for(let i = 0; i < board[0].length; i++) {
        let newBoard = solvePuzzleHelper(board.slice(), 0, i);
        SolvePuzzle(newBoard);
      }
    } else {
      // recurse on ever cell that has a light above that is true/on
      try {
        for(let i = 0; i < board[currentRow].length; i++) {
          if(board[currentRow-1][i]) {
            let newBoard = solvePuzzleHelper(board.slice(), currentRow, i);
            SolvePuzzle(newBoard);
          }        
        }
      } catch (error) {
        console.error(error)
      }
      
    }
  } 
}

export default SolvePuzzle;