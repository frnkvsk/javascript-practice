// happy, sad, angry, confused
const INITIAL_STATE = { mood: 'happy'};

function moodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "HAPPY": 
      return { ...state, mood: action.payload};
    case "SAD": 
      return { ...state, mood: action.payload};
    case "ANGRY": 
      return { ...state, mood: action.payload};
    case "CONFUSED": 
      return { ...state, mood: action.payload};
    default: 
      return state;
  }
}

const store = Redux.createStore(moodReducer);