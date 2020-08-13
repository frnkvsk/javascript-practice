import SolvePuzzle from "./SolvePuzzle";

async function SetBoard(nrows, ncols, chanceLightStartsOn) {
  let board = Array(nrows).fill(0).map(_ => 
    Array(ncols).fill(0).map(_ => 
      Math.random() < chanceLightStartsOn
    )
  );
  const result = await SolvePuzzle(board.slice());
  return result;
}

export default SetBoard;