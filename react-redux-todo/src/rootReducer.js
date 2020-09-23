const INITIAL_STATE = { todos: [] };

function rootReducer(state = INITIAL_STATE, action) {
  let newTodo;
  switch (action.type) {

    case "NEWTODO":      
      newTodo = [...state.todos, { 
        'id': action.id,
        'name': action.name,
        'completed': false,
      }];
      return { ...state, todos: newTodo };

    case "TOGGLETODO":
      newTodo = [...state.todos].map(e => e.id === action.id ? { ...e, 'completed': !e.completed } : e);
      return { ...state, todos: newTodo };

    case "EDITTODO":
      newTodo = [...state.todos].map(e => e.id === action.id ? { ...e, 'name': action.name } : e);
      return { ...state, todos: newTodo };

    case "REMOVETODO":
      newTodo = [...state.todos].filter(e => e.id !== action.id);
      return { ...state, todos: newTodo };

    default:
      return state;
  }
}

export default rootReducer;
