import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoplyInventory } from '../shoplyInventorySlice';
// import { selectShoplyCart } from './shoplyCartSlice';
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

export default function ProductsList() {
  const classes = useStyles();
  let products = useSelector(selectShoplyInventory);

  return (
    <div className={classes.root}>
      <h1>Products</h1>
      <div className={classes.display}>
        {/* {console.log('ShoplyList products',products)} */}
        {products ? Object.keys(products).map(key => (
          <ListProduct key={key} id={key} />
        )) : ''}
      </div>
    </div>
  )
}