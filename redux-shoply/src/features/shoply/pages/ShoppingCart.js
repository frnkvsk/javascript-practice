import React from 'react';
import { useSelector } from 'react-redux';
import { selectShoplyCart } from '../shoplyCartSlice';
// import { selectShoplyCart } from './shoplyCartSlice';
import CartProduct from '../components/CartProduct';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',    
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
    margin: '0px',
    padding: '0px',
    border: '1px solid red',
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
      width: '80%'
    },
    border: '1px solid green',
  },
}));

export default function ShoppingCart() {
  const classes = useStyles();
  let products = useSelector(selectShoplyCart);
  // console.log('ShoppingCart products=',products)
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <div style={{fontSize: '32px'}}>Shopping Cart</div>
        <div style={{fontSize: '18px'}}>Price</div>
      </div>
      <div className={classes.display}>
        {/* {console.log('ShoplyList products',products)} */}
        {products ? Object.keys(products).map(key => (
          <CartProduct key={key} id={key} />
        )) : ''}
      </div>
    </div>
  )
}