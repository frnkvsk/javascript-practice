import * as type from './types';
import { v4 as uuid } from 'uuid';

export default function memesReducer(state = [], action) {
  switch (action.type) {
    case type.GET_MEMES:
      return [
        {
          id: uuid(),
          img: action.payload.img,
          top: action.payload.top,
          bottom: action.payload.bottom,
        }, ...state
      ]
    default:
      return state;
  }
}