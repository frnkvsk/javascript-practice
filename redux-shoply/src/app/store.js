import { configureStore } from '@reduxjs/toolkit';
import shoplyCartReducer from '../features/shoply/shoplyCartSlice';
import shoplyInventoryReducer from '../features/shoply/shoplyInventorySlice';

export default configureStore({
  reducer: {
    shoply_cart: shoplyCartReducer,
    shoply_inventory: shoplyInventoryReducer,
  },
});
