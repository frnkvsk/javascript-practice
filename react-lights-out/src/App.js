import React, {useState} from "react";
import Control from "./Control";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {  
  const [defaultProps, setProps] = useState([5, 5, 0.3]);
  const setDefaultProps = dp => {
    setProps(dp.slice());
  }
  
  return (
    <div>
      <Control setDefaultProps={setDefaultProps} />
      <table className="App">
        <Board ncols={defaultProps[0]} nrows={defaultProps[1]} chanceLightStartsOn={defaultProps[2]}/>
      </table>
    </div>
    
  );
}

export default App;
