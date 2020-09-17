import { combineReducers } from 'redux';
import memesReducer from './memesReducer';

const rootReducer = combineReducers({
  memes: memesReducer,
});

export default rootReducer;