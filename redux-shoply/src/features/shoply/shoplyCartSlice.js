import { createSlice } from '@reduxjs/toolkit';

const getData = () => {
  const data = JSON.parse(localStorage.getItem('shoply_cart'));
  return data ? Object.values(data) : [];
}

export const shoplyCartSlice = createSlice({
  name: 'shoply_cart',
  initialState: {
    data: getData(),
  },
  reducers: {
    addCartItem: (state, action) => {
      const index = state.data.findIndex(e => e.id === action.payload.id);
      if(index > -1) {
        state.data[index].quantity++;
      } else {
        state.data.push({
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          image_url: action.payload.image_url,
          quantity: action.payload.quantity,
        })
      }
    },
    removeCartItem: (state, action) => {
      const index = state.data.findIndex(e => e.id === action.payload.id);
      if(index > -1) {
        if(state.data[index].quantity === action.payload.quantity) {
          state.data = state.data.filter(e => e.id !== action.payload.id);
        } else {
          state.data[index].quantity = action.payload.quantity;
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