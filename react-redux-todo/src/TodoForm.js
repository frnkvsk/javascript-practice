import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput } from '@material-ui/core';
// import { create } from './todoSlice';
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    width: '100%',
    margin: '30px 0 20px 0',
    // border: '1px solid red'
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginRight: '5px',
  },
}));

// const mapDispatch = { create };

const TodoForm = () => {
  const classes = useStyles();
  // const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = e => {   
    e.preventDefault();
    if(newTodo.trim()) {
      // id ???? payload = {id: id, text: newTodo} ????
      console.log('newTodo',newTodo)
      dispatch({ 
        type: 'NEWTODO',
        id: uuid(),
        name: newTodo
      });
    }   
    setNewTodo("");
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
