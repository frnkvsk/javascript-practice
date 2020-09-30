import React from 'react';
import { 
  useSelector, 
  // useDispatch 
} from 'react-redux';
import { makeStyles } from '@material-ui/core';
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
import DropDownQuantityList from './DropDownQuantityList';

const useStyles = makeStyles((theme) => ({  
  
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    border: '.5px solid #eeeeee',
  },
  descriptionWrapper: {
    display: 'flex',
    width: '440px',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center',
    maxWidth: '500px',
    padding: '10px',
    marginBottom: '20px',
    width: '350px',
  },
  image: {
    width: '200px',    
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: '10px',
  },  
  formElements: {
    width: '100%',
    margin: '10px',
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
  description: {
    fontSize: '18px',
    fontWeight: '500',
  },
  quantity: {
    paddingTop: '5px',
    fontSize: '14px',
  },  
}));

export default function CartProduct({id}) {
  const classes = useStyles();
  // const dispatch = useDispatch();
  
  let item = {};
  const cartItems = useSelector(selectShoplyCart);
  const inventoryItems = useSelector(selectShoplyInventory);
  // const inventoryItemQuantity = inventoryItems[id].quantity;
  if(cartItems[id]) {
    item = cartItems[id];    
  } else if(inventoryItems[id]) {
    item = inventoryItems[id];
  }
  // const handleRemoveItem = (e) => {
  //   e.preventDefault();
  // }

  return (  
    <div className={classes.root}>
      <div className={classes.descriptionWrapper}>
        <img className={classes.image} src={item.image_url} alt={item.name} />
        <div>
          <div className={classes.title}>
            <label>{item.name}</label>
          </div>
          <DropDownQuantityList id={id}/>
        </div>        
      </div>
      <div className={classes.priceWrapper}>
        <div className={classes.icon}>$</div><div className={classes.price}>{item.quantity * item.price}</div>
      </div>   
    </div>    
  );  
}