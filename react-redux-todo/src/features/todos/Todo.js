/**
 Todo- this component should display a div with the task of the todo.
 */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Button, OutlinedInput } from '@material-ui/core';
import {
  toggleTodo,
  editTodo,
  removeTodo,
  selectTodos,
  persistDataToLocalStorage,
} from './todosSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    margin: '10px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    "&:hover": {
      boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
    },
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    zIndex: 0,
  },
  editInput: {
    visibility: false,
  },
  form: {
    position: 'relative',
    width: '100%',
    heigth: '0',
    transform: 'translate(0px, -66px)',
    backgroundColor: '#eeeeeee8',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
  formElements: {
    width: '500px',
    margin: '0 4px',
    textAlign: 'center',
    zIndex: 1,
  },
}));

const Todo = ({id}) => {
  const classes = useStyles();
  const todos = useSelector(selectTodos);
  const todo = todos.data.find(e => e.id === id);
  const dispatch = useDispatch();
  
  const [name, setName] = useState(todo.name);
  const [isEditVisible, setIsEditVisible] = useState({'display':'none'});

  const doneTodo = () => {
    dispatch(toggleTodo(
      { 
        id: id, 
      }
    )); 
    dispatch(persistDataToLocalStorage());   
  }
  const handleEdit = e => {   
    e.preventDefault(); 
    dispatch(editTodo(
      { 
        id: id, 
        name: name 
      }
    ));
    dispatch(persistDataToLocalStorage());
  }
  const handleRemove = () => {
    dispatch(removeTodo(
      { 
        id: id 
      }
    ));
    dispatch(persistDataToLocalStorage());
  }
  const setEditVisible = () => {
    if(isEditVisible.display === 'none') {
      setIsEditVisible({});
    } else {
      setIsEditVisible({display: 'none'});
    }
  }
  const handleChange = e => {
    setName(e.target.value)
  }
  return (
    <>
      <ListItem id={id} className={classes.root}>
        <ListItemAvatar>
          <Avatar>
            <EventIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText 
          className={classes.list}
          style={{ textDecoration : todo.completed ? 'line-through' : 'none' }} 
          primary={todo.name}
        />      
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="completed" onClick={doneTodo}>
            <DoneIcon />
          </IconButton>
          <IconButton edge="end" aria-label="edit" onClick={setEditVisible}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>     
      </ListItem>
      <form className={classes.form} style={isEditVisible} onSubmit={handleEdit}>
        <OutlinedInput
          className={classes.formElements}
          placeholder={'Edit todo'}
          onChange={handleChange}
          value={name}
        />
        <Button type="submit" variant="contained" color="primary" >
          Edit
        </Button>
      </form>
    </>    
  )
}

export default Todo;