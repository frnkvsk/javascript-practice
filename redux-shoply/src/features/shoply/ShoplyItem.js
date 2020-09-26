import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
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
    margin: '30px 20px',
    cursor: 'pointer',
    flexWrap: 'wrap',
    border: '1px solid pink',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: '10px 0',
    backgroundColor: '#ffffff',
    border: '1px solid green',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '350px',
  },
  image: {
    width: '300px',
    border: '1px solid blue'
  },
  
  
  formElements: {
    width: '100%',
    marginBottom: '8px',
  },
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
      <div className={classes.description}>

        <div>
          <label>{item.name}</label>
        </div>

        <div>
          <label className={classes.price}>${item.price}</label>
        </div>          
        
        <div>
          <label>{item.description}</label>
        </div>
        
        <div>          
          <label>{item.quantity}</label>
        </div>
      </div>

      <form className={classes.form}>
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
            color="primary" 
            onClick={handleRemoveItem}>Remove from Cart</Button>
      </form>     
    </div>    
  );
  
}