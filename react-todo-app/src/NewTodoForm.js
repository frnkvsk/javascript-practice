/**
 NewTodoForm - this component should render a form with one text input for the task to be created. When this form is submitted, a new Todo component should be created.
 */
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import "./NewBoxForm.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '4fr 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas:
      'TextField Button',
    width: '100%'

  },
  button: {
    background: 'blue',
    color: 'white',
    marginLeft: '5px'
  }
}));

function NewTodoForm({addNewTodo}) {
  const initialState = {
    addNewTodo: "",
  }
  const [formData, setFormData] = useState(initialState)
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }
  const handleSubmit = e => {
    e.preventDefault();
    if(formData.addNewTodo.length) {
      addNewTodo(formData);
      setFormData(initialState);
    }    
  }
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
      <TextField 
        id="form-text-color" 
        label="Add a new todo"
        variant="outlined" 
        name="addNewTodo"
        value={formData.addNewTodo}
        onChange={handleChange} />
      <Button type="submit" id="form-btn" variant="contained" color="primary" className={classes.button}>Add Todo</Button>
    </form>
  );
}

export default NewTodoForm;