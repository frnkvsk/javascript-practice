/**
 Todo- this component should display a div with the task of the todo.
 */
import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
  }
}));

const Todo = ({id, todoText, completed, completedTodo, openEditTodo, hideTodo}) => {

  const classes = useStyles();

  const doneTodo = () => {
    completedTodo(id)
  }
  const editTodo = () => {
    openEditTodo(id)
  }
  const removeTodo = () => {
    hideTodo(id)
  }

  return (
    <ListItem id={id} className={classes.root}>
      <ListItemAvatar>
        <Avatar>
          <EventIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText  
        style={{ textDecoration : completed ? 'line-through' : 'none' }} 
        primary={todoText}
      />

      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="completed" onClick={doneTodo}>
          <DoneIcon />
        </IconButton>
        <IconButton edge="end" aria-label="edit" onClick={editTodo}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )

}

export default Todo;