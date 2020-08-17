import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = ({ todoId, todoText, saveTodo }) => {

  const initialState = {
    id: todoId,
    todoTextValue: "",
  }
  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  const handleCancel = () => {
    saveTodo(formData.id, todoText);      
  };
  
  const handleSave = () => {
    if(formData.todoTextValue.length)
      saveTodo(formData.id, formData.todoTextValue);
    else 
      saveTodo(formData.id, todoText);
  };

  return (
    <div>
      <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {todoText}
          </DialogContentText>
          <TextField
            autoFocus
            name="todoTextValue"
            margin="dense"
            id="name"
            label="Enter your edited todo"
            type="email"
            fullWidth
            value={formData.todoTextValue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
