import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { selectShoplyCart } from '../shoplyCartSlice';
import cart from './cart-mini4.svg';
import { Link } from 'react-router-dom';

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
    width: '80px',
    height: '30px',
    fontWeight: '600',
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid rgba(0,0,0,0.3)'
    },
    // '&$focused': {
    //   // backgroundColor: '#fff',
    //   boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    //   borderColor: theme.palette.primary.main,
    // },

    // border: 'none',
    // "&:hover": {
    //   border: '1px solid rgba(0,0,0,0.3)'
    // },
    // "& .MuiInput-underline:after": {
    //   boxShadow: 'none'
    // },
    // border: 'none',//'0 2px 4px rgba(0,0,0,0.3)',
    // "&:hover": {
    //   border: '1px solid #223d75'
    // },
  },
  image: {
    position: 'absolute',
    left: '5px',
    width: '40px',
  },
  cart: {
    position: 'absolute',
    left: '40px',
    fontWeight: '600',
    margin: '5px',
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
  // const auth = useContext(AuthContext);
  // const handleClick = () => {
  //   auth.setAuthState({
  //     token: "",
  //     userInfo: {}
  //   });
  // }
  // console.log('Navbar cartItems',cartItems)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} component={Link} to={"/"} >
            Shoply
          </Typography>
          <div className={classes.cartWrapper}>
            <img className={classes.image} src={cart} alt="cart" />
            <div className={classes.cart}>Cart</div>
            <div className={classes.quantity}>{Object.values(cartItems).reduce((a,b) => a+b.quantity,0) || 0}</div>
          </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

