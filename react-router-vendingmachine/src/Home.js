import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    width: '800px',
    margin: '2px',
  },
  button: {
    width: '150px',
    margin: '2px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    background: 'rgb(240,255,245,0.2)',
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <NavBar />
      </div>
      <img className={classes.image} src="https://media.giphy.com/media/PTibzfPyqVujm/giphy.gif" alt=""></img>
    </div>
  );
}

export default Home;
