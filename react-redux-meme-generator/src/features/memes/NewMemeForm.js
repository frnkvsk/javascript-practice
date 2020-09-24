import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { useFormInput } from '../../hooks/useFormInput';
// import { useUserInfo } from '../../hooks/useUserInfo';
import { v4 as uuid } from 'uuid';
import { createMeme, persistDataToLocalStorage } from './memesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '300px',
    marginBottom: '8px',
  }
}));

export default function NewMemeForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const image = useFormInput('');
  const topLabel = useFormInput('');
  const bottomLabel = useFormInput('');
  // const { userInfo, setUserInfoStorage } = useUserInfo();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();    
    dispatch(createMeme({
      id: id,
      img: image.value,
      top: topLabel.value,
      bottom: bottomLabel.value,
    }))
    dispatch(persistDataToLocalStorage());
    image.clear();
    topLabel.clear();
    bottomLabel.clear();
  }

  return (
    <div className={classes.root}>
      <h2>Meme Generator</h2>
      <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField 
          className={classes.formElements} 
          label="URL" 
          variant="outlined" 
          value={image.value} 
          onChange={image.onChange} />
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
        
        <Button className={classes.formElements} type="submit" variant="contained" color="primary">
          Create Meme
        </Button>
      </form>
    </div>    
  );
}
