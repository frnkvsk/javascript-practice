import React from 'react';
import { useSelector } from 'react-redux';
import { selectMemes } from './memesSlice';
import NewMemeForm from './NewMemeForm';
import MemeItem from './MemeItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',    
  },

  display: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '70%'
    },
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
}));

export function Memes() {
  const classes = useStyles();
  let memes = useSelector(selectMemes);
  
  return (
    <div className={classes.root}>
      <NewMemeForm />
      <div className={classes.display}> 
        {memes.editData.hasOwnProperty('id') ? <MemeItem key={memes.editData.id} id={memes.editData.id} /> :       
        memes.hasOwnProperty('data') && memes.data.map(meme => (
          <MemeItem key={meme.id} id={meme.id} />
        ))}
      </div>      
    </div>
  );
}
