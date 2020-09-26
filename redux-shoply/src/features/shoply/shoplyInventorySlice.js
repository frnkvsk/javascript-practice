import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data.json';

console.log(products)
export const shoplyInventorySlice = createSlice({
  name: 'shoply_inventory',
  initialState: products,
  reducers: {
    addInventoryItem: (state, action) => {
      // const index = state.data.findIndex(e => e.id === action.payload.id);
      // if(index > -1) {
      //   state.data[index].quantity = action.payload.quantity;
      // } else {
      //   // functionality to add a new product not implemented yet
      //   // state.data.push({
      //   //   id: action.payload.id,
      //   //   name: action.payload.name,
      //   //   description: action.payload.description,
      //   //   image_url: action.payload.image_url,
      //   //   quantity: action.payload.quantity,
      //   // })
      // }
    },
    removeInventoryItem: (state, action) => {
      // exact same functionality as addInventoryItem
      // const index = state.data.findIndex(e => e.id === action.payload.id);
      // if(index > -1) {
      //   state.data[index].quantity = action.payload.quantity;
      // }
    },
  }
});

export const {
  addInventoryItem,
  removeInventoryItem,
} = shoplyInventorySlice.actions;

export const selectShoplyInventory = state => state.shoply_inventory;

export default shoplyInventorySlice.reducer;