import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './features/shoply/components/Navbar'; 
// import { ShoplyList } from './features/shoply/components/ShoplyList';
import ProductsList from './features/shoply/pages/ProductsList';
import ProductItem from './features/shoply/pages/ProductItem';
import ShoppingCart from './features/shoply/pages/ShoppingCart'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <ProductsList />        
        </Route>
        <Route exact path="/productitem/:id">
          <ProductItem />        
        </Route>
        <Route exact path="/cart/:id">
          <ShoppingCart />        
        </Route>
        
      </Switch>       
    </BrowserRouter>
  );
}

export default App;
