import { createSlice } from '@reduxjs/toolkit';

const getData = () => {
  let data = localStorage.getItem('shoply_cart');
  return data ? JSON.parse(data) : {};
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
      localStorage.setItem("shoply_cart", JSON.stringify(state));
    },
    removeCartItem: (state, action) => {
      if(state[action.payload.id]) {    
        if(state[action.payload.id].quantity > action.payload.quantity) {
          state[action.payload.id].quantity -= action.payload.quantity;
        } else {
          delete state[action.payload.id];
        }        
      } 
      localStorage.setItem("shoply_cart", JSON.stringify(state));
    },
  }
});

export const {
  addCartItem,
  removeCartItem,
  // persistDataToLocalStorage,
} = shoplyCartSlice.actions;

export const selectShoplyCart = state => state.shoply_cart;

export default shoplyCartSlice.reducer;