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
  button: {
    width: '150px',
    margin: '2px'
  }
}));

function Sprite() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.image} src="https://media.giphy.com/media/26tPazYTSaeFzc8jm/giphy.gif" alt="">
        
      </img>
    </div>
  );
}

export default Sprite;
