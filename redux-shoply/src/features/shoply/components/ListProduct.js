import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { 
  // addCartItem, 
  // removeCartItem,
  // persistDataToLocalStorage,
  selectShoplyCart,
} from '../shoplyCartSlice'; 
import { 
  // addInventoryItem, 
  // removeInventoryItem,
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: '10px 0 10px 0',    
    flexWrap: 'wrap',
    boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
    borderTop: '.5px solid #eeeeee',
    borderBottom: '.5px solid #eeeeee',
  },
  diplayWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '440px',
  },
  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '440px',
    flexWrap: 'wrap',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },  
  image: {
    width: '200px',  
    cursor: 'pointer',  
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: '10px',
    cursor: 'pointer',
  }, 
  priceWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: '22px',
    fontWeight: '600',
  },
  icon: {
    width: '8px',
    fontSize: '14px',
    paddingTop: '4px',
  },
  [theme.breakpoints.down('md')]: {
    diplayWrapper: {
      justifyContent: 'center',
    },
    descriptionWrapper: {
      alignItems: 'center',
    },
  }
  
}));

export default function ListProduct({id}) {
  const classes = useStyles();
  const history = useHistory();
  let item = {};
  const cartItems = useSelector(selectShoplyCart);
  const inventoryItems = useSelector(selectShoplyInventory);
  if(cartItems[id]) {
    item = cartItems[id];
  } else if(inventoryItems[id]) {
    item = inventoryItems[id];
  }
  
  
  const handleClick = () => {
    // console.log('ListProduct item.id')
    history.push(`/productitem/${id}`);
  }
  
  return (  
    <div className={classes.root}>
      <div className={classes.diplayWrapper}>
        <img 
          className={classes.image} 
          src={item.image_url} 
          alt={item.name} 
          onClick={handleClick}/>
      </div>      
      <div className={classes.descriptionWrapper}>
        <div 
          className={classes.title} 
          onClick={handleClick}>
          <label>{item.name}</label>
        </div>
        <div className={classes.priceWrapper}>
          <div className={classes.icon}>$</div><div className={classes.price}>{item.price}</div>
        </div> 
      </div>          
    </div>    
  );
  
}