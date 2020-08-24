import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ColorList from './ColorList';
import ColorDisplay from './ColorDisplay';
import ColorForm from './ColorForm';
import useLocalStorage from './hooks';

function App(props) {
  
  let [name, setName] = useState("black");
  let [value, setValue] = useState("#000000");
  let [state, setState] = useLocalStorage('colors', props);

  const clickHandlerList = newName => {    
    setName(name = newName);
  }
  const clickHandlerForm = (newName, newValue) => {       
    setName(name = newName);
    setValue(value = newValue);
    if(!state[name]) {
      setState(
        [...state,
        {'name': name, 'value': value}]
      )
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/colors" >
            <ColorList state={state} clickHandler={clickHandlerList}/> 
          </Route>
          <Route exact path="/colors/new" >
            <ColorForm clickHandlerForm={clickHandlerForm}/> 
          </Route>
          <Route path="/colors/:color" >
            <ColorDisplay state={state.filter(e => e.name===name)[0]} /> 
          </Route>
          <Redirect to="/colors" />
        </Switch>
      </BrowserRouter>   
    </div>
  );
}
App.defaultProps = {
  colors: [{name: 'red', value: 'red'} , {name: 'green', value: 'green'} , {name: 'blue', value: 'blue'}]
}
export default App;
