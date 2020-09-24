import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField } from '@material-ui/core';
import { useFormInput } from '../../hooks/useFormInput';
// import { useUserInfo } from '../../hooks/useUserInfo';
import { v4 as uuid } from 'uuid';
import { selectMemes, persistDataToLocalStorage, editMeme } from './memesSlice';

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
  let memes = useSelector(selectMemes);
  const image = useFormInput(memes.editData.img);
  const topLabel = useFormInput(memes.editData.top);
  const bottomLabel = useFormInput(memes.editData.bottom);
  // const { userInfo, setUserInfoStorage } = useUserInfo();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuid();    
    dispatch(editMeme({
      id: id,
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
      <h2>Edit Meme</h2>
      <Box className={classes.root} onClick={handleSubmit}>
        <div className={classes.labelTop}>
          <label>{topLabel.value}</label>
        </div>
        <img className={classes.image} src={image.value} alt={topLabel.value} />
        <div className={classes.labelBottom}>
          <label>{bottomLabel.value}</label>
        </div>      
      </Box>
      <form className={classes.form} onSubmit={handleSubmit} noValidate autoComplete="off">
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
