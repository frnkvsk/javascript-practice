import React, {useState} from "react";
import "./Control.css";

function Control({ setDefaultProps }) {
  let [defaultProps, setProps] = useState([4, 4, 0.3]); 
  const setSize = n => {
    defaultProps = [+n, +n, defaultProps[2]];
    setProps([+n, +n, defaultProps[2]]);
  }
  const setDifficulty = n => {
    defaultProps[2] = parseFloat(n);
    setProps(defaultProps.slice());
  }
  return (
    <div className="Control">
      <div>
        <label htmlFor="boardSize">Board Size:</label>
        <select name="boardSize" id="boardSize" onChange={e => setSize(e.target.value)}>
          <option value="4">4 x 4</option>
          <option value="5">5 x 5</option>
          <option value="6">6 x 6</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty" onChange={e => setDifficulty(e.target.value)}>
          <option value=".3">Easy</option>
          <option value=".5">Medium</option>
          <option value=".7">Hard</option>
        </select>
      </div>     
      
      <button type='submit' onClick={() => setDefaultProps(defaultProps)}>Set New Board</button>
    </div>
    
  )
}

export default Control;
