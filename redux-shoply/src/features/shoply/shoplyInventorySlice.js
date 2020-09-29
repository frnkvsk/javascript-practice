import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data.json';

console.log(products)
export const shoplyInventorySlice = createSlice({
  name: 'shoply_inventory',
  initialState: products,
  reducers: {
    addInventoryItem: (state, action) => {
      if(state[action.payload.id].quantity !== undefined) {
        // item exists in inventory
        // change inventory quantity (added item/items to cart)
        state[action.payload.id].quantity += action.payload.quantity;
      }
    },
    removeInventoryItem: (state, action) => {
      console.log('shoplyInventorySlice',action)
      console.log('state=',state[action.payload.id].quantity)
      // const index = state.data.findIndex(e => e.id === action.payload.id);
      // console.log('shoplyInventorySlice removeInventoryItem index=',index,' action=',action)
      if(state[action.payload.id].quantity) {
        // item exists in inventory
        // change inventory quantity (added item/items to cart)
        state[action.payload.id].quantity -= action.payload.quantity;
      }
      console.log('after quantity',state[action.payload.id].quantity)
    },
  }
});

export const {
  addInventoryItem,
  removeInventoryItem,
} = shoplyInventorySlice.actions;

export const selectShoplyInventory = state => state.shoply_inventory;

export default shoplyInventorySlice.reducer;