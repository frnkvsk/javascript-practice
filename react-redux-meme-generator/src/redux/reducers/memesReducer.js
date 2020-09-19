import * as type from './types';

export default function memesReducer(state = [], action) {

  switch (action.type) {
    case type.GET_MEMES:
      return [
        {
          id: action.payload.id,
          img: action.payload.img,
          top: action.payload.top,
          bottom: action.payload.bottom,
        }, ...state
      ]
    case type.UPDATE_MEME:
      return [
        {
          id: action.payload.id,
          img: action.payload.img,
          top: action.payload.top,
          bottom: action.payload.bottom,
        }, ...state
      ]
    case type.DELETE_MEME:
      return [
        {
          id: action.payload.id,
          img: action.payload.img,
          top: action.payload.top,
          bottom: action.payload.bottom,
        }, ...state
      ]
    default:
      return state;
  }
}