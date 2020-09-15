import React from 'react';
import { useDispatch } from 'react-redux';
import { getMemes } from '../redux/actions/memes';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Button } from '@material-ui/core';

import { useFormInput } from '../hooks/useFormInput';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function NewImageForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const image = useFormInput('');
  const topLabel = useFormInput('');
  const bottomLabel = useFormInput('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('NewImageForm handleSubmit',image)
    dispatch(getMemes([
        {
          img: image.value,
          top: topLabel.value,
          bottom: bottomLabel.value,
        },      
      ]));
  }

  return (
    <div>
      <h2>Create New Meme</h2>
      <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormControl variant="outlined">
          <InputLabel htmlFor="image">Image URL</InputLabel>
          <OutlinedInput name="image" {...image} />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="topLabel">Top Label</InputLabel>
          <OutlinedInput name="topLabel" {...topLabel} />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="bottomLabel">Bottom Label</InputLabel>
          <OutlinedInput name="bottomLabel" {...bottomLabel} />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create Meme
        </Button>
      </form>
    </div>
    
  );
}
