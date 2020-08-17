import React from 'react';
import TodoList from './TodoList';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '7px',
    },
  }));
  
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root} >
      <Grid item container>
        <Grid item xs={"auto"} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8} >
          <TodoList />
        </Grid>      
        <Grid item xs={"auto"} sm={1} md={2} />
      </Grid>      
    </Grid>
  );
}

export default App;
