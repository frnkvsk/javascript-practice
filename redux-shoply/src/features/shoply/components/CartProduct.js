import React, { useState } from 'react';
import { 
  useSelector, 
  useDispatch 
} from 'react-redux';
import { makeStyles } from '@material-ui/core';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { 
  addCartItem, 
  removeCartItem,
  // persistDataToLocalStorage,
  selectShoplyCart,
} from '../shoplyCartSlice'; 
import { 
  addInventoryItem, 
  removeInventoryItem,
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    // padding: '10px',
    // cursor: 'pointer',
    // flexWrap: 'wrap',
    // boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
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
    width: '50px',
    margin: '10px',
  }
  
}));

export default function CartProduct({id}) {
  // console.log(useDispatch,addCartItem,removeCartItem,persistDataToLocalStorage,addInventoryItem,removeInventoryItem)
  const classes = useStyles();
  const dispatch = useDispatch();
  
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
  // console.log('cartItems',typeof cartItems, cartItems)
  // console.log('inventoryItemss=',typeof inventoryItems, inventoryItems)
  // console.log('CartProduct item=',item)
  
  const handleQuantityChange = (e) => {
    console.log('0---handleQuantityChange',e.target.value, quantity)
    if(+e.target.value < quantity) {
      // increment inventory item quantity
      dispatch(addInventoryItem({
        id: id,
        quantity: quantity - +e.target.value,
      }));
      // decrement cart item quantity
      dispatch(removeCartItem({
        id: id,
        quantity: quantity - +e.target.value,
      }));

    } else if(+e.target.value > quantity) {
      // decrement inventory item quantity
      dispatch(removeInventoryItem({
        id: id,
        quantity: +e.target.value - quantity,
      }));
      // increment cart item quantity
      dispatch(addCartItem({
        id: id,
        quantity: +e.target.value - quantity,
      }));
    }
    setQuantity(+e.target.value);
    console.log('1---handleQuantityChange',e.target.value, quantity)
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
          <input 
            id="inputQuantity" 
            className={classes.input} 
            type="number" 
            defaultValue={""+item.quantity} 
            // value={item.quantity} 
            min="0" 
            max={inventoryItemQuantity + item.quantity} 
            onChange={handleQuantityChange}
            />
        </div>
        
      </div>
      <div className={classes.priceWrapper}>
        <div className={classes.icon}>$</div><div className={classes.price}>{item.quantity * item.price}</div>
      </div>   
    </div>    
  );
  
}