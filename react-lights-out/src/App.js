import React, {useState} from "react";
import Control from "./Control";
import Board from "./Board";
import "./App.css";


/** Simple app that just shows the LightsOut game. */

function App() {  
  let [defaultProps, setProps] = useState("easy");
  const setDefaultProps = dp => {
    defaultProps = dp;
    setProps(defaultProps);
  }
  
  return (
    <div>
      <Control setDefaultProps={setDefaultProps} />
      <table className="App">
        <Board chanceLightStartsOn={defaultProps}/>
      </table>
    </div>
    
  );
}

export default App;
