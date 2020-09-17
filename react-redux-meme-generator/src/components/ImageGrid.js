import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '400px',
    margin: '30px',
  },
  image: {
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  labelTop: {
    position: 'relative',
    width: '100%',
    top: '60px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
  labelBottom: {
    position: 'relative',
    width: '100%',
    bottom: '60px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
}));

export default function ImageGrid({img}) {
  const classes = useStyles();

  return (    
    <Box key={uuid()} className={classes.root}>
      <div className={classes.labelTop}>
        <label>{img.top}</label>
      </div>
      <img className={classes.image} src={img.img} alt={img.top} />
      <div className={classes.labelBottom}>
        <label>{img.bottom}</label>
      </div>    
    </Box>
  );
}
