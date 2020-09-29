import React from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { selectShoplyInventory } from '../shoplyInventorySlice';
// import { selectShoplyCart } from './shoplyCartSlice';
import EachProduct from '../components/EachProduct';
import { makeStyles } from '@material-ui/core';

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
    flexDirection: 'column',
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

export default function ProductItem() {
  const classes = useStyles();
  const {id} = useParams();
  // let products = useSelector(selectShoplyInventory);

  return (
    <div className={classes.root}>
      <h1>ProductItem</h1>
      <div className={classes.display}>
        <EachProduct key={id} id={id} />
      </div>
    </div>
  )
}