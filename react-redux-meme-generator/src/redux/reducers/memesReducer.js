// import * as type from './types';

const initialState = [
  {
    img: 'https://images.unsplash.com/photo-1599908758979-25ba52737fb5',
    top: 'top text',
    bottom: 'bottom text',
  }
];

export default function memesReducer(state = initialState, action) {
  // switch (action.type) {
  //   case type.GET_MEMES:
  //     return {
  //       ...state,
  //       memes: action.payload
  //     }
  //   default:
  //     return state;
  // }
  return state;
}