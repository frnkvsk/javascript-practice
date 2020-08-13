import React, {useState} from "react";
import "./Control.css";

function Control({ setDefaultProps }) {
  let [defaultProps, setProps] = useState("easy");
  const setDifficulty = level => {
    defaultProps = level;
    setProps(defaultProps.slice());
  }
  return (
    <div className="Control">      
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty" onChange={e => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="med">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>     
      
      <button type='submit' onClick={() => setDefaultProps(defaultProps)}>Set New Board</button>
    </div>    
  )
}

export default Control;
