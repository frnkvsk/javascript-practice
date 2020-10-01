import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoplyCart } from '../shoplyCartSlice';
import CartProduct from '../components/CartProduct';
import PriceComp from '../components/PriceComp';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0px',
    padding: '0px',
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
  price: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontSize: '28px',
    width: '180px',
    padding: '10px',
  },
}));

export default function ShoppingCart() {
  const classes = useStyles();
  let products = useSelector(selectShoplyCart);
  
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <div style={{fontSize: '32px'}}>Shopping Cart</div>
        <div style={{fontSize: '18px'}}>Price</div>
      </div>
      <div className={classes.display}>
        {products ? Object.keys(products).map(key => (
          <CartProduct key={key} id={key} />
        )) : ''}
      </div>
      <div className={classes.price}>
        Total: <PriceComp />
      </div>      
    </div>
  );
}