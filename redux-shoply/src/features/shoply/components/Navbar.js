import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { selectShoplyCart } from '../shoplyCartSlice';
import cart from './cart-mini4.svg';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#ffffff',
    textDecoration: 'none',
  },
  button: {
    fontWeight: 'bold',
  },
  
  cartWrapper: {
    position: 'relative',
    top: '-3px',
    width: '100px',
    height: '30px',
    fontWeight: '600',
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid rgba(0,0,0,0.3)'
    },
  },
  image: {
    position: 'absolute',
    left: '5px',
    width: '40px',
  },
  cart: {
    position: 'absolute',
    left: '40px',
    color: 'white',
    fontWeight: '600',
    margin: '8px',
  },
  quantity: {
    position: 'absolute',
    textAlign: 'center',
    width: '22px',
    left: '17px',
    top: '-3px',
    color: '#fb8c00',
    fontWeight: '550',
    fontSize: '14px',
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const cartItems = useSelector(selectShoplyCart);
  const quantity = Object.values(cartItems).reduce((a,b) => a+b.quantity,0) || 0;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} component={Link} to={"/"} >
            Shoply
          </Typography>
          <Button className={classes.cartWrapper} component={Link} to={"/cart/"} >
            <img className={classes.image} src={cart} alt="cart" />
            <div className={classes.cart}>Cart</div>
            <div className={classes.quantity}>{quantity}</div>
          </Button>          
        </Toolbar>
      </AppBar>
    </div>
  );
}

