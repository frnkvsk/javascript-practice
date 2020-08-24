import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '100px',
    background: 'black',
    color: 'white'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  link2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  }
}));

function ColorList({state, clickHandler}) {  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1>Welcome to the color factory.</h1>
        <Link className={classes.link1} to="/colors/new">Add a color.</Link>
      </header>
      <div className={classes.main}>
        <h2>Please select a color</h2>
        {state.map(e => (
          <Link key={uuid()} className={classes.link2} onClick={()=>clickHandler(e.name)} to={`/colors/${e.name}`}>{e.name}</Link>
        ))}
      </div>
    </div>
  );
}

export default ColorList;
