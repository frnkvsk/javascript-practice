/**
 App - this component should render the BoxList component.
 */
import React from "react";
import BoxList from "./BoxList";

import "./App.css";


/** Simple app that just shows the LightsOut game. */

function App() {  
  // let [defaultProps, setProps] = useState("easy");
  // const setDefaultProps = dp => {
  //   defaultProps = dp;
  //   setProps(defaultProps);
  // }
  
  return (
    <div className="App">
      <BoxList />
      
    </div>
  );
}

export default App;
