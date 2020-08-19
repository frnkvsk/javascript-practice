import React from 'react';
import DeckOfCards from './DeckOfCards';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#c8e6c9',
    width: '100%',
    height: '100vh'
  },
}));

const App = () => {
  const classes = useStyles();
  
  return (
    <Grid container direction="column" className={classes.root} >
      <Grid item container>
        <Grid item xs={"auto"} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8} >
          <DeckOfCards />
        </Grid>      
        <Grid item xs={"auto"} sm={1} md={2} />
      </Grid>      
    </Grid>
  );
}

export default App;
