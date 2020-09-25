import { createSlice } from '@reduxjs/toolkit';

const getData = () => {
  let data = JSON.parse(localStorage.getItem("todos"));
  return data ? Object.values(data) : [];
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    data: getData(),
  },
  reducers: {
    createTodo: (state, action) => {
      state.data.push({
        'id': action.payload.id,
        'name': action.payload.name,
        'completed': false,
      });
    },
    toggleTodo: (state, action) => {
      state.data = state.data.map(e => e.id === action.payload.id ?
        {
          'id': e.id,
          'name': e.name,
          'completed': !e.completed,
        } : e
        );
    },
    editTodo: (state, action) => {
      state.data = state.data.map(e => e.id === action.payload.id ?
        {
          'id': e.id,
          'name': action.payload.name,
          'completed': e.completed,
        } : e
        );
    },
    removeTodo: (state, action) => {
      state.data = state.data.filter(e => e.id !== action.payload.id);
    },
    persistDataToLocalStorage: (state) => {
      localStorage.setItem("todos", JSON.stringify(state.data) || "");
    },
  }
});

export const {
  createTodo,
  toggleTodo,
  editTodo,
  removeTodo, 
  persistDataToLocalStorage, 
} = todosSlice.actions;

export const selectTodos = state => state.todos;

export default todosSlice.reducer;