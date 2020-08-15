/**
 NewBoxForm - this component should render a form that when submitted, creates a new Box. You should be able to specify the Box’s width, height, and background color. When the form is submitted, clear the input values.
 */
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import ColorBox from './ColorBox';
import { makeStyles } from '@material-ui/core/styles';

import "./NewBoxForm.css";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    background: "blue",
    color: "white"
  }
}));

function NewBoxForm({addNewBox}) {
  const initialState = {
    backgroundColor: "",
    width: "",
    height: ""
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
    // const {backgroundColor, width, height} = formData;
    // const colorBox = <ColorBox backgroundColor={backgroundColor} width={width} height={height} />
    addNewBox(formData);
    setFormData(initialState);
    // console.log(colorBox)
  }
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="form-text-color" 
        label="Background Color"
        variant="outlined" 
        name="backgroundColor"
        value={formData.backgroundColor}
        onChange={handleChange} />
      <TextField 
        id="form-text-width" 
        label="Box Width" 
        variant="outlined"
        name="width"
        value={formData.width}
        onChange={handleChange} />
      <TextField 
        id="form-text-height" 
        label="Box Height" 
        variant="outlined"
        name="height"
        value={formData.height}
        onChange={handleChange} />
      <Button type="submit" id="form-btn" variant="contained" color="primary" className={classes.button}>Submit</Button>
    </form>
  );
}

export default NewBoxForm;