import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoplyInventory } from '../shoplyInventorySlice';
import ListProduct from '../components/ListProduct';
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
    width: '100%',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
}));

export default function ProductsList() {
  const classes = useStyles();
  let products = useSelector(selectShoplyInventory);

  return (
    <div className={classes.root}>
      <h1>Products</h1>
      <div className={classes.display}>
        {products ? Object.keys(products).map(key => (
          <ListProduct key={key} id={key} />
        )) : ''}
      </div>
    </div>
  )
}