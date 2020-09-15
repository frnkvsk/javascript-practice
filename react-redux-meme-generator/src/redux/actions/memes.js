import * as type from '../reducers/types';

export function getMemes(memes) {
  return {
    type: type.GET_MEMES,
    payload: memes,
  }
}