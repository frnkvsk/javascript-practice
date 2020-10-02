import React from 'react';
import { 
  useSelector, 
} from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { 
  selectShoplyCart,  
} from '../shoplyCartSlice'; 
import { 
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 
import DropDownQuantityList from './DropDownQuantityList';
import PriceComp from './PriceComp';

const useStyles = makeStyles((theme) => ({    
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    border: '1px solid #eeeeee',
  },
  descriptionWrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
    width: '100%',    
    margin: '10px',
    padding: '10px',
    backgroundColor: '#ffffff',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontSize: '18px',
    marginLeft: '12px',
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
}));

export default function CartProduct({id}) {
  const classes = useStyles();  
  let item = {};
  const cartItems = useSelector(selectShoplyCart);
  const inventoryItems = useSelector(selectShoplyInventory);
  if(cartItems[id]) {
    item = cartItems[id];    
  } else if(inventoryItems[id]) {
    item = inventoryItems[id];
  }

  return (  
    <div className={classes.root}>
      {id ? <>
        <div className={classes.descriptionWrapper}>
          <img className={classes.image} src={item.image_url} alt={item.name} /> 
          <div className={classes.description}>
            <div className={classes.title}>
              <label>{item.name}</label>
            </div>
            <DropDownQuantityList id={id}/>
          </div>        
        </div>
        <PriceComp id={id} />
        </>
      : ''      
      }
    </div>    
  );  
}