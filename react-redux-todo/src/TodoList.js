import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import { Button, OutlinedInput } from '@material-ui/core';
// import { create } from './todoSlice';
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

// const mapDispatch = { create };

const TodoList = () => {
  const classes = useStyles();
  const todos = useSelector(state => state.todos);
  // const dispatch = useDispatch();
  // const [newTodo, setNewTodo] = useState('');

  // const handleSubmit = () => {   
  //   if(newTodo.trim()) {
  //     // id ???? payload = {id: id, text: newTodo} ????
  //     create(newTodo);
  //   }   
  //   setNewTodo("");
  // }

  // const handleChange = (e) => {
  //   setNewTodo(e.target.value);
  // }

  return (

    <div className={classes.root}>
      <TodoForm />
      <div className={classes.list}>
        {todos && todos.map(todo => (
          <Todo key={uuid()} id={todo.id} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;




// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, OutlinedInput } from '@material-ui/core';
// import {
//   create,
//   complete,
//   incomplete,
//   edit,
//   remove,
//   selectTodo,
// } from './todoSlice';

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     width: '100%',
//     margin: '30px 0 20px 0',
//     // border: '1px solid red'
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#ffffff',
//     marginRight: '5px',
//   },
// }));

// export function Todo() {
//   const classes = useStyles();
//   const todos = useSelector(selectTodo);
//   const dispatch = useDispatch();
//   const [newTodo, setNewTodo] = useState('');

//   const handleSubmit = () => {   
//     if(newTodo.trim()) {

//     }   
//     setNewTodo("");
//   }

//   const handleChange = (e) => {
//     setNewTodo(e.target.value);
//   }

//   return (
//     <div>
//       <form className={classes.form} noValidate autoComplete="off">
//         <OutlinedInput 
//           className={classes.input} 
//           id="searchInput" 
//           placeholder={`Search for ${nextPage}`} 
//           variant="outlined" 
//           value={newTodo}
//           onChange={handleChange}
//         />
//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Create Todo
//         </Button>
//       </form>
//     </div>
//   );
// }
