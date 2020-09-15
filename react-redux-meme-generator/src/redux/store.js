import { createStore, compose } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const store = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__(),

)(createStore)(rootReducer);

export default store;