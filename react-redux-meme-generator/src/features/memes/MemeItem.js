import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import { Box } from '@material-ui/core';
import {
  selectMemes,
  setEditMemeData,
} from './memesSlice';

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    margin: '0 20px',
    cursor: 'pointer',
  },
  box: {
    position: 'relative',
    width: '100%',
  },
  labelTop: {
    position: 'relative',
    width: '100%',
    top: '80px',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
  labelBottom: {
    position: 'relative',
    width: '100%',
    bottom: '80px',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
}));

export default function ImageGrid({id}) {
  let meme = {id:'', top: '', bottom: ''};
  const classes = useStyles();
  const memes = useSelector(selectMemes);
  if(memes.data && memes.data.find(e => e.id === id)) {
    meme = memes.data.find(e => e.id === id);
  }
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    e.preventDefault();
    dispatch(setEditMemeData({
      id: meme.id,
      img: meme.img,
      top: meme.top,
      bottom: meme.bottom,
    }))
  };
  
  return (  
    <div key={uuid()} className={classes.root} onClick={handleOpen}>
      <Box className={classes.box}>          
        <div className={classes.labelTop}>
          <label style={{color: meme.textColor}}>{meme.top}</label>
        </div>
        <img className={classes.box} src={meme.img} alt={meme.top} />
        <div className={classes.labelBottom}>
          <label style={{color: meme.textColor}}>{meme.bottom}</label>
        </div>      
      </Box>        
    </div>    
  );
}
