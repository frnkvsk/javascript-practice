import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import {
  createTodo,
  persistDataToLocalStorage,
} from './todosSlice';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    width: '100%',
    margin: '30px 0 20px 0',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginRight: '5px',
  },
}));

const TodoForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = e => {   
    e.preventDefault();
    if(newTodo.trim()) {
      dispatch(createTodo({ 
        id: uuid(),
        name: newTodo
      }));
      dispatch(persistDataToLocalStorage());
      setNewTodo("");
    }     
  }

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
      <OutlinedInput 
        className={classes.input} 
        id="searchInput" 
        placeholder={'Add a new todo'} 
        variant="outlined" 
        value={newTodo}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" >
        Create Todo
      </Button>
    </form>
  );
}

export default TodoForm;