import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './features/shoply/components/Navbar'; 
import ProductsList from './features/shoply/pages/ProductsList';
import Product from './features/shoply/pages/Product';
import ShoppingCart from './features/shoply/pages/ShoppingCart'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '85%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '75%'
    },
    border: '1px solid #eeeeee',
  },
}));
function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Navbar />
      <div className={classes.root}>
        <main className={classes.main}>
        <Switch>        
          <Route exact path="/">
            <ProductsList />        
          </Route>
          <Route exact path="/productitem/:id">
            <Product />        
          </Route>
          <Route exact path="/cart">
            <ShoppingCart />        
          </Route>                 
        </Switch> 
        </main>        
      </div>       
    </BrowserRouter>
  );
}

export default App;
