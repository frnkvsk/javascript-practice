import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { useFormInput } from '../../hooks/useFormInput';
import { v4 as uuid } from 'uuid';
import { 
  selectMemes, 
  createMeme, 
  editMeme, 
  persistDataToLocalStorage, 
  removeMeme, 
  setEditMemeData } from './memesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: '0',
    backgroundColor: '#f3e5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '350px',
  },
  formElements: {
    width: '100%',
    marginBottom: '8px',
  }
}));

export default function NewMemeForm() {
  const classes = useStyles();
  const [textColor, setTextColor] = useState('#000000');
  const dispatch = useDispatch();
  const memes = useSelector(selectMemes);
  const isEdit = memes.editData.hasOwnProperty('id');
  const image = useFormInput(isEdit ? memes.editData.img : '');
  const topLabel = useFormInput(isEdit ? memes.editData.top : '');
  const bottomLabel = useFormInput(isEdit ? memes.editData.bottom : '');
  
  const handleTextColor = (e) => {
    e.preventDefault();
    setTextColor(e.target.value);
  }

  const clear = () => {
    image.clear();
    topLabel.clear();
    bottomLabel.clear();
  }
  const handleNewMeme = (e) => {
    e.preventDefault();
    dispatch(createMeme({
      id: uuid(),
      img: image.value,
      top: topLabel.value,
      bottom: bottomLabel.value,
      textColor: textColor,
    }));
    dispatch(persistDataToLocalStorage());
    clear();
  }
  const handleEditMeme = (e) => {
    e.preventDefault();
    dispatch(editMeme({
      id: memes.editData.id,
      top: topLabel.value,
      bottom: bottomLabel.value,
      textColor: textColor,
    }));
    dispatch(persistDataToLocalStorage());
    clear();
  }
  const handleRemoveMeme = (e) => {
    e.preventDefault();
    dispatch(removeMeme({
      id: memes.editData.id,
    }));
    dispatch(persistDataToLocalStorage());
    clear();
  }
  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(setEditMemeData({}));
    dispatch(persistDataToLocalStorage());
    clear();
  }

  return (
    <div className={classes.root}>
      <h2>Meme Generator</h2>
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classes.formElements} >
        Text Color&nbsp;  
        <input           
          type="color" 
          onChange={handleTextColor}
          defaultValue="#000000" /> 
        </div>
        
        {!isEdit && <TextField 
          className={classes.formElements} 
          label="URL" 
          variant="outlined" 
          value={image.value} 
          onChange={image.onChange} />}
        <TextField 
          className={classes.formElements} 
          label="Top Label" 
          variant="outlined" 
          value={topLabel.value} 
          onChange={topLabel.onChange} />
        <TextField 
          className={classes.formElements} 
          label="Bottom Label" 
          variant="outlined" 
          value={bottomLabel.value} 
          onChange={bottomLabel.onChange} />
        
        {!isEdit && <>
        <Button 
          id="btnNew" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleNewMeme}>Create Meme</Button></>}

        {isEdit && <>
        <Button 
          id="btnEdit" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleEditMeme}>Edit Meme</Button>
        <Button 
          id="btnRemove" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleRemoveMeme}>Remove Meme</Button>
        <Button 
          id="btnCancel" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleCancel}>Cancel</Button></>}
      </form>
    </div>    
  );
}
