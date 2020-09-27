import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { 
  addCartItem, 
  removeCartItem,
  persistDataToLocalStorage,
  selectShoplyCart,
} from './shoplyCartSlice'; 
import { 
  addInventoryItem, 
  removeInventoryItem,
  selectShoplyInventory,
} from './shoplyInventorySlice'; 

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '10px 0 10px 0',
    cursor: 'pointer',
    flexWrap: 'wrap',
    boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
    border: '.5px solid #eeeeee',
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
    width: '430px',    
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
    // border: '1px solid yellow',
  },
  icon: {
    // display: 'flex',
    // alignSelf: 'flex-start',
    width: '8px',
    fontSize: '14px',
    paddingTop: '4px',
    // border: '.5px solid pink',
  },
  price: {
    // alignSelf: 'flex-start',
    // padding: '0',
  },
  description: {
    fontSize: '18px',
    fontWeight: '500',
  },
  quantity: {
    paddingTop: '5px',
    fontSize: '14px',
  },
  input: {
    fontSize: '18px',
    fontWeight: '500',
    width: '15%',
    margin: '10px',
  }
  
}));

export default function ShoplyItem({id}) {
  console.log(useDispatch,addCartItem,removeCartItem,persistDataToLocalStorage,addInventoryItem,removeInventoryItem)
  const classes = useStyles();
  let item = {};
  const cartItems = useSelector(selectShoplyCart);
  const inventoryItems = useSelector(selectShoplyInventory);
  if(cartItems[id]) {
    item = cartItems[id];
  } else if(inventoryItems[id]) {
    item = inventoryItems[id];
  }
  item.id = id;
  
  const handleAddItem = () => {
    
  }
  const handleRemoveItem = () => {

  }
  return (  
    <div className={classes.root}>
      <img className={classes.image} src={item.image_url} alt={item.name} />
      <div className={classes.descriptionWrapper}>

        <div className={classes.title}>
          <label>{item.name}</label>
        </div>

        <div className={classes.priceWrapper}>
          <div className={classes.icon}>$</div><div className={classes.price}>{item.price}</div>
        </div>          
        
        <label className={classes.description}>{item.description}</label>
        
        <label className={classes.quantity}>{item.quantity ? `In Stock: ${item.quantity} items left.` : `Out of stock.`}</label>
      </div>
      
      <form className={classes.form}>
        <input 
          id="inputQuantity" 
          className={classes.input} 
          type="number" 
          defaultValue="1" 
          min="1" 
          max={item.quantity} />
        <Button 
          id="btnAdd" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleAddItem}>Add to Cart</Button>
        <Button 
          id="btnRemove" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="default" 
          onClick={handleRemoveItem}>Remove from Cart</Button>
      </form>     
    </div>    
  );
  
}