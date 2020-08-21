import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './NavBar'
import Home from './Home';
import SevenUp from './SevenUp';
import Sprite from './Sprite';
import Fanta from './Fanta';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    background: '#bbdefb',
    border: '1px solid black'
  },
  link: {
    gridArea: '1 / 1',
    position: 'absolute',
    top: '100vh / 2',
    left: '100vw / 2',
    color: 'white',
    fontSize: '28px',
    background: '#90caf9'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    margin: '0',
    background: '#90caf9'
  },
}));
function VendingMachine() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <nav>
          <NavBar className={classes.nav}/>
        </nav>        
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/sevenup">
          <Link className={classes.link} to="/">Back</Link>
          <SevenUp />
        </Route>
        <Route exact path="/sprite">
          <Link className={classes.link} to="/">Back</Link>
          <Sprite />
        </Route>
        <Route exact path="/fanta">
          <Link className={classes.link} to="/">Back</Link>
          <Fanta />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default VendingMachine;
