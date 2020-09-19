import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ImageGrid from './ImageGrid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      width: '70%'
    },
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
}));

export default function MemeGridList() {
  const classes = useStyles();
  const memesData = useSelector(state => state.memes);
  console.log('memeData',memesData)
  return (
    <div className={classes.root}>
      <Grid spacing={1} container className={classes.grid}>
        {memesData.length && memesData.map((tile) => (
          <ImageGrid key={tile.img} img={tile} />
        ))}
      </Grid>
    </div>
  );
}
