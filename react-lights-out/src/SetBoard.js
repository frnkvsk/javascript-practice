
import {easy, med, hard} from "./data";

function SetBoard(level) {
  let data = level === "easy" ? easy : level === "med" ? med : hard;
  return data[Math.floor(Math.random() * data.length)];
}

export default SetBoard;