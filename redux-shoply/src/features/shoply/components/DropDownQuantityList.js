import React, { useState } from 'react';
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import { makeStyles, Button } from '@material-ui/core';
import { 
  addCartItem, 
  removeCartItem,
  selectShoplyCart,
} from '../shoplyCartSlice'; 
import { 
  addInventoryItem, 
  removeInventoryItem,
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 

const useStyles = makeStyles((theme) => ({  
  root: {
    fontSize: '18px',
    fontWeight: '500',
    width: '60px',
    margin: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  dropBtn: {
    fontSize: '16px',
    width: '90px',
    textAlign: 'center',
    backgroundColor: '#81c784',
    color: 'white',
    border: 'none',
    padding: '3px',
    cursor: 'pointer',
    zIndex: '1',
  }, 
  linkWrapper: {
    position: 'absolute',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: '100',
  },
  link: {
    opacity: '1',
    fontSize: '13px',
    width: '70px',
    cursor: 'pointer',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'rgba(207, 207, 207)',
    },
    border: '1px solid rgba(207, 207, 207, 0.4)',
    padding: '0 3px 0 30px',
  },
  input: {
    width: '60px',
    height: '25px',
    margin: '2px',
  },
  btn: {
    width: '40px',
    height: '25px',    
  },
  quantity: {
    fontSize: '13px',
  }, 
}));

export default function DropDownQuantityList({id}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState('none');
  const [visible10, setVisible10] = useState('none');
  let item = {};
  const cartItems = useSelector(selectShoplyCart);
  const inventoryItems = useSelector(selectShoplyInventory);
  const inventoryItemQuantity = inventoryItems[id].quantity;
  if(cartItems[id]) {
    item = cartItems[id];    
  } else if(inventoryItems[id]) {
    item = inventoryItems[id];
  }
  const [quantity, setQuantity] = useState(item.quantity);
  const handleVisibilty = () => {
    setVisible(visible === 'block' ? 'none' : 'block');
  }
  const handleQuantityChange = (Q) => {    
    if(Q === 'ten') {
      setVisible10('block');
      setVisible('none');
      Q = quantity;
    } else {
      setVisible10('none');
      // limit quantity to what is currently in stock
      Q = Math.min(Q, inventoryItemQuantity + cartItems[id].quantity);
    }
    
    if(Q < cartItems[id].quantity) {
      // increment inventory item quantity
      dispatch(addInventoryItem({
        id: id,
        quantity: cartItems[id].quantity - Q,
      }));
      // decrement cart item quantity
      dispatch(removeCartItem({
        id: id,
        quantity: cartItems[id].quantity - Q,
      }));

    } else if(Q > cartItems[id].quantity) {
      // decrement inventory item quantity
      dispatch(removeInventoryItem({
        id: id,
        quantity: Q - cartItems[id].quantity,
      }));
      // increment cart item quantity
      dispatch(addCartItem({
        id: id,
        quantity: Q - cartItems[id].quantity,
      }));
    }
    setQuantity(Q);
    setVisible('none');
  }

  const handleMouseLeave = () => {
    setVisible('none');
  }

  return (  
    <div className={classes.dropdown} onMouseLeave={handleMouseLeave}>
      <div className={classes.dropBtn} onClick={handleVisibilty}>Qty: {quantity}</div>
      <div className={classes.update} style={{display: visible10}}>
        <input
          className={classes.input}
          onChange={e => setQuantity(+e.target.value)}
          value={quantity}
        />
        <Button 
          className={classes.btn} 
          type="submit" 
          variant="contained" 
          color="default" 
          onClick={() => handleQuantityChange(quantity)}>
          Update
        </Button>
      </div>
      <div className={classes.linkWrapper} style={{display: visible}}>
        <div className={classes.link} onClick={() => handleQuantityChange(0)} >0 (Delete)</div>
        <div className={classes.link} onClick={() => handleQuantityChange(1)} >1</div>
        <div className={classes.link} onClick={() => handleQuantityChange(2)} >2</div>
        <div className={classes.link} onClick={() => handleQuantityChange(3)} >3</div>
        <div className={classes.link} onClick={() => handleQuantityChange(4)} >4</div>
        <div className={classes.link} onClick={() => handleQuantityChange(5)} >5</div>
        <div className={classes.link} onClick={() => handleQuantityChange(6)} >6</div>
        <div className={classes.link} onClick={() => handleQuantityChange(7)} >7</div>
        <div className={classes.link} onClick={() => handleQuantityChange(8)} >8</div>
        <div className={classes.link} onClick={() => handleQuantityChange(9)} >9</div>
        <div className={classes.link} onClick={() => handleQuantityChange('ten')} >10+</div>
      </div> 
      <label className={classes.quantity}>{inventoryItemQuantity ? `In Stock: ${inventoryItemQuantity} items left.` : `Out of stock.`}</label>     
    </div>     
  );  
}