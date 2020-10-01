import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { 
  selectShoplyCart,
} from '../shoplyCartSlice'; 
import { 
  selectShoplyInventory,
} from '../shoplyInventorySlice'; 

const useStyles = makeStyles((theme) => ({  
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    },
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row'
    },
    [theme.breakpoints.up('xl')]: {
      flexDirection: 'row'
    },    
    width: '100%',
    padding: '10px 0 10px 0',    
    flexWrap: 'wrap',
    border: '1px solid #eeeeee',
  },
  diplayWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '40%',
    paddingRight: '30px',
  },
  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    flexWrap: 'wrap',
    margin: '10px',
    paddingLeft: '30px',
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
    },
    descriptionWrapper: {
      alignItems: 'center',
      padding: '0',
    },
  },  
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