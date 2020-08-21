import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '800px',
    margin: '2px',
    border: '1px solid red',
  },
  link: {
    gridArea: '1 / 1',
    position: 'absolute',
    top: '100vh / 2',
    left: '100vw / 2',
    background: '#90caf9'
  },
  button: {
    width: '150px',
    margin: '2px'
  }
}));

function SevenUp() {
  const classes = useStyles();
  return (
    <div className={classes.root}>      
      <img className={classes.image} src="https://media.giphy.com/media/bBkFVAzaASE1i/giphy.gif" alt="">
      
      </img>
    </div>
  );
}

export default SevenUp;
