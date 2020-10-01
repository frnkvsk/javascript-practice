import React from 'react';
import { 
  useSelector, 
} from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { 
  selectShoplyCart,
} from '../shoplyCartSlice'; 

const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 10px 0 15px',
  },
  price: {

  },
  totalPrice: {

  },
  icon: {
    width: '8px',
    fontSize: '14px',
    paddingTop: '4px',
  },
}));

const formatPrice = price => {
  return price.toFixed(2);
}
export default function CartProduct({id}) {
  const classes = useStyles();
  const cartItems = useSelector(selectShoplyCart);
  let price = '';
  if(id) {
    price = formatPrice(cartItems[id].price * cartItems[id].quantity)
  } else {    
    price = formatPrice(Object.values(cartItems).reduce((a,b) => a + b.price * b.quantity, 0));
  }

  return (  
    <div className={classes.root}>
      <div className={classes.icon}>$</div><div className={classes.price}>{price}</div>    
    </div>    
  );  
}