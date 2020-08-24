import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

function ColorDisplay({state}) {
  const {name, value} = state;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '100vh',
      fontSize: '64px',
      color: 'white',
      background: value
    },
    link: {
      color: 'white'
    }
  }));
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <div>THIS IS {name.toUpperCase()}</div>
      <div>ISN'T IT BEAUTIFUL?</div>
      <Link className={classes.link} to="/colors/">GO BACK</Link>
    </div>
  );
}

export default ColorDisplay;
