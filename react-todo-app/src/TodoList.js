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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    fontSize: '28px',
    border: '1px solid blue',
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
  todoText: {    
    // border: '1px solid #afc2cb',
    // multiline: 'true',
  }
}));

function TodoList() {
  let [todos, setTodo] = useState([]);
  const addNewTodo = newTodo => {
    console.log('addnewtodo ',newTodo)
    todos.push(newTodo);
    setTodo(todos.slice());
  }
  // const editTodo = (id, newText) => {
  //   console.log('hideTodo ',id)
  //   todos = todos.map(e => {
  //     // if(e.id === id) e. ? 
  //   });
  //   setTodo(todos.slice());
  // }
  const hideTodo = id => {
    console.log('hideTodo ',id)
    todos = todos.filter(e => e.id !== id);
    setTodo(todos.slice());
  }

  const classes = useStyles();
  return (
    <Grid className={classes.root} container direction="column" >
      <Grid item container>
        <Grid item xs={0} md={2} />
        <Grid item xs={12} md={8} >
          <NewTodoForm addNewTodo={addNewTodo} />
          <List className={classes.todoText}>
            {todos.map(e => {
              const id = uuid();
              e.id = id;
              return <Todo 
                      id={id}
                      key={id} 
                      todoText={e.addNewTodo}
                      hideTodo={hideTodo} />
              })} 
          </List>
        </Grid>      
        <Grid item xs={0} md={2} />
      </Grid>      
    </Grid>
    // <div className={classes.root}>
    //   <Grid container spacing={2} xs={12}>
    //     <Grid item container xs={12} md={8} className={classes.todoForm}>        
    //       <NewTodoForm addNewTodo={addNewTodo} />
    //     </Grid>
    //     <Grid item container xs={12} md={8} className={classes.todo}>
    //       <List>
    //         {todos.map(e => {
    //           const id = uuid();
    //           e.id = id;
    //           return <Todo 
    //                     id={id}
    //                     key={id} 
    //                     todoText={e.addNewTodo}
    //                     hideTodo={hideTodo}  
    //                     className={classes.todoText}/>
    //         })} 
    //       </List>
    //     </Grid>
    //   </Grid>
    // </div>
  )



  // const useStyles = makeStyles((theme) => ({
  //   container: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignContent: 'center',
  //     justifyContent: 'center',
  //     width: '70%',
  //     margin: '10px',
  //     padding: '10px',
  //     background: 'rgb(218, 238, 245)',
  //     // border: '1px solid rgb(218, 238, 245)',
  //   },
  // }));
  
  // const classes = useStyles();
  // let [boxes, setBoxes] = useState([]);
  // const addNewTodo = newBox => {
  //   boxes.push(newBox);
  //   setBoxes(boxes.slice());
  // }
  // const hideBox = (id) => {
  //   boxes = boxes.filter(e => e.id !== id);
  //   setBoxes(boxes.slice());
  // }

  // return (
  //   <div className={classes.container} >
  //     <NewTodoForm addNewTodo={addNewTodo}/>
  //     {boxes.map(e => {
  //       const uid = uuid();
  //       e.id = uid;
  //       return <Todo 
  //         key={uid}
  //         id={uid}
  //         backgroundColor={e.backgroundColor} 
  //         width={e.width} 
  //         height={e.height}
  //         hideBox={hideBox} />
  //     }        
  //     )}
  //   </div>
  // );
}

export default TodoList;