import React from 'react';
import TodoList from './TodoList';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';



function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: '7px',
      border: '1px solid red'
    },
  }));
  
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root} >
      <Grid item container>
        <Grid item xs={0} sm={1} md={2} />
        <Grid item xs={12} sm={10} md={8} >
          <TodoList />
        </Grid>      
        <Grid item xs={0} sm={1} md={2} />
      </Grid>      
    </Grid>
  );
}

export default App;
