import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from './todosSlice';
import { makeStyles } from '@material-ui/core/styles';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },
  list: {
    listStyleType: 'none',
  }
}));

const TodoList = () => {
  const classes = useStyles();
  const todos = useSelector(selectTodos);

  return (
    <div className={classes.root}>
      <TodoForm />
      <div className={classes.list}>
        {console.log('todos',todos)}
        {todos.data.length ? todos.data.map(todo => (
          <Todo key={uuid()} id={todo.id} />
        )) : ''}
      </div>
    </div>
  );
}

export default TodoList;