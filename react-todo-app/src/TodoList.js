/**
 TodoList - this component should render the NewTodoForm component and should render the list of Todo components. Place your state that contains all of the todos in this component.
 */
import React, {useState} from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from "./Todo";
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';
import FormDialog from './EditTodo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    fontSize: '28px',
  },
  todoForm: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#afc2cb',
  },
  todo: {
    width: '100%',
    backgroundColor: '#e3f2fd',    
  },
}));

const TodoList = () => {
  
  let [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || {}  
  );
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  let [editDialogVisible, setEditDialogVisible] = useState(false);
  let [editDialogId, setEditDialogId] = useState("");
  let [editDialogText, setEditDialogText] = useState("");

  const addNewTodo = newTodo => {
    todos[uuid()] = {todo: newTodo, completed: false};
    setTodos(Object.assign({}, todos));
  }
  const saveTodo = (todoId, newTodo) => {
    todos[todoId] = {todo: newTodo, completed: false};
    setTodos(Object.assign({}, todos));
    setEditDialogVisible(false);
  }
  const completedTodo = (id) => {
    todos[id].completed = !todos[id].completed;
    setTodos(Object.assign({}, todos));
  }

  const hideTodo = id => {
    delete todos[id];
    setTodos(Object.assign({}, todos));
  }

  const openEditTodo = (id) => {
    setEditDialogText(todos[id].todo);
    setEditDialogId(id);
    setEditDialogVisible(true);
  }  

  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction="column" >
      <Grid item container>
        <Grid item xs={"auto"} md={2} />
        <Grid item xs={12} md={8} >
          <NewTodoForm addNewTodo={addNewTodo} />

          {(editDialogVisible) ? 
            <FormDialog open={editDialogVisible} todoId={editDialogId} todoText={editDialogText} saveTodo={saveTodo}  /> : null
          }
          
          <List className={classes.todoText}>
            { 
              Object.entries(todos).map(e => ( 
                <Todo 
                  id={e[0]}
                  key={e[0]} 
                  todoText={e[1].todo}
                  completed={e[1].completed}
                  completedTodo={completedTodo}
                  openEditTodo={openEditTodo}
                  hideTodo={hideTodo} />
              ))
            } 
          </List>
        </Grid>      
        <Grid item xs={"auto"} md={2} />
      </Grid>      
    </Grid>
  )

}

export default TodoList;