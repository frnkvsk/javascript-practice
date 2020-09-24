import { configureStore } from '@reduxjs/toolkit';
import memesReducer from '../features/memes/memesSlice';

export default configureStore({
  reducer: {
    memes: memesReducer,
  },
});
