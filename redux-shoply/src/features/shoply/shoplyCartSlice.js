import { createSlice } from '@reduxjs/toolkit';

const getData = () => {
  return JSON.parse(localStorage.getItem('shoply_cart')) || {}
}

export const shoplyCartSlice = createSlice({
  name: 'shoply_cart',
  initialState: getData(),
  reducers: {
    addCartItem: (state, action) => {
      if(state[action.payload.id]) {       
        state[action.payload.id].quantity += action.payload.quantity;
      } else {
        state[action.payload.id] = {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          image_url: action.payload.image_url,
          quantity: action.payload.quantity,
          price: action.payload.price,
        };
      }
      
    },
    removeCartItem: (state, action) => {
      if(state[action.payload.id]) {   
        console.log('shoplyCartSlice removeCartItem ',state[action.payload.id].quantity , action.payload.quantity)     
        if(state[action.payload.id].quantity > action.payload.quantity) {
          state[action.payload.id].quantity -= action.payload.quantity;
        } else {
          delete state[action.payload.id];
        }        
      } 
    },
    persistDataToLocalStorage: (state) => {
      localStorage.setItem("shoply_cart", JSON.stringify(state.data) || "");
    },
  }
});

export const {
  addCartItem,
  removeCartItem,
  persistDataToLocalStorage,
} = shoplyCartSlice.actions;

export const selectShoplyCart = state => state.shoply_cart;

export default shoplyCartSlice.reducer;