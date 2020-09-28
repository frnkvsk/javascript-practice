import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './features/shoply/components/Navbar'; 
import { ShoplyList } from './features/shoply/ShoplyList';


function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Switch>
          <Route exact path="/">
            <Home />          
          </Route>
          <ShoplyList />
        </Switch>        
      </Navbar>
      
    </BrowserRouter>
  );
}

export default App;
