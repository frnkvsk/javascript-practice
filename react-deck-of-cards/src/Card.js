import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function MediaCard({rotation, src}) {
  const useStyles = makeStyles({
    root: {
      gridArea: '1 / 1',
      position: 'absolute',
      top: '100vh / 2',
      left: '100vw / 2',
      width: '355px',
      height: '500px',
      transform: `rotate(${rotation}deg)`,
      backgroundColor: 'green'
    },
    media: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${src})`,
      borderRadius: '19px'
    },
  });
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <img className={classes.media} src={src} alt="" />
    </div>
  );
}
