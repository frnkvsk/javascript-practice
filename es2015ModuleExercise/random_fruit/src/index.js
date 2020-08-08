import React from 'react';
import ReactDOM from 'react-dom';
import fruits from './foods';
import {choice, remove} from './helpers';

const fruitChoice = choice(fruits);
const fruitsArr = remove(fruits, fruitChoice);
ReactDOM.render(
  <>
    <p>I'd like one {fruitChoice}, please.</p>
    <p>Here you go: {fruitChoice}</p>
    <p>Delicious! May I have another?</p>
    <p>I’m sorry, we’re all out. We have {fruitsArr.length} left.</p>
  </>,
  document.getElementById('root')
);
