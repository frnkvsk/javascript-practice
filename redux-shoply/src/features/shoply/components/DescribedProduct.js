import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { 
  addCartItem, 
} from '../shoplyCartSlice'; 
import { 
  removeInventoryItem,
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 

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
  input: {
    fontSize: '18px',
    fontWeight: '500',
    width: '15%',
    margin: '10px',
  },  
}));

export default function EachProduct({id}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();  
  let inventoryItems = useSelector(selectShoplyInventory);
  const [quantity, setQuantity] = useState(1);
  let item = inventoryItems[id]; 
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      ...item,
      quantity: quantity,
      id: id,
    }
    dispatch(removeInventoryItem(newItem));
    // add cart item
    dispatch(addCartItem(newItem));
    setQuantity(1);
    history.push(`/cart/`);
  }
  const handleQuantityChange = (e) => {
    setQuantity(+e.target.value);    
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
          max={item.quantity} 
          onChange={handleQuantityChange}
          />
        <Button 
          id="btnAdd" 
          className={classes.formElements} 
          type="submit" 
          variant="contained" 
          color="primary" 
          onClick={handleAddItem}>Add to Cart</Button>
      </form>     
    </div>    
  );
  
}