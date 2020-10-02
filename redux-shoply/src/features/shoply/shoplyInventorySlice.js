import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data.json';

const getData = () => {
  let data = JSON.parse(localStorage.getItem('shoply_cart'));
  for(let key in data) {
    let cartAmt = data[key].quantity;
    let inventoryAmt = products[key].quantity;
    if(cartAmt <= inventoryAmt) {
      inventoryAmt -= cartAmt;
    } else {      
      cartAmt -= (cartAmt - inventoryAmt);
      inventoryAmt = 0;
    }
    data[key].quantity = cartAmt;
    products[key].quantity = inventoryAmt;
  }
  
  return products
}
export const shoplyInventorySlice = createSlice({
  name: 'shoply_inventory',
  initialState: getData(),
  reducers: {
    addInventoryItem: (state, action) => {
      if(state[action.payload.id].quantity !== undefined) {
        // item exists in inventory
        // change inventory quantity (added item/items to cart)
        state[action.payload.id].quantity += action.payload.quantity;
      }
    },
    removeInventoryItem: (state, action) => {
      if(state[action.payload.id].quantity) {
        // item exists in inventory
        // change inventory quantity (added item/items to cart)
        state[action.payload.id].quantity -= action.payload.quantity;
      }
    },
  }
});

export const {
  addInventoryItem,
  removeInventoryItem,
} = shoplyInventorySlice.actions;

export const selectShoplyInventory = state => state.shoply_inventory;

export default shoplyInventorySlice.reducer;