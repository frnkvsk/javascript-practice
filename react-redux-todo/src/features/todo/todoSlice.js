import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoName: '',
    todoStatus: 'INCOMPLETE',
    remove: false,
  },
  reducers: {
    create: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todoName = action.payload.name;
    },
    complete: state => {
      state.todoStatus = 'COMPLETE';
    },
    incomplete: state => {
      state.todoStatus = 'INCOMPLETE';
    },
    edit: (state, action) => {
      state.name += action.payload.name;
    },
    remove: state => {
      state.remove = true;
    },
  },
});

export const { 
  create,
  complete,
  incomplete,
  edit,
  remove, 
} = todoSlice.actions;

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodo = state => state.todos;

export default todoSlice.reducer;
