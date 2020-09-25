import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  createTodo,
  toggleTodo,
  editTodo,
  removeTodo, 
  persistDataToLocalStorage,
  selectTodos,
} from '../../features/todos/todosSlice';

const testData1 = {
  id: 'testId1',
  name: 'testName1',
  completed: false,
}
const testData2 = {
  id: 'testId1',
  name: 'testName2',
  completed: false,
}

const CreateTodoTestComponent = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeTodo(testData1));
    dispatch(createTodo(testData1));
  }, []);

  return (
    <div>
      {todos.data.length ?
        <div>
          <div>{todos.data[0].id}</div>
          <div>{todos.data[0].name}</div>
          <div>{""+todos.data[0].completed}</div>
        </div> 
        : ''
      }      
    </div>
  )
}

describe('createTodo', () => {
  it('should create a new todo', () => {
    render(
      <Provider store={store}>
        <CreateTodoTestComponent />
      </Provider>
    );
    
    expect(screen.getByText('testId1')).toBeInTheDocument();
    expect(screen.getByText('testName1')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });  
});


const ToggleTodoTestComponent = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeTodo(testData1));
    dispatch(createTodo(testData1));
    dispatch(toggleTodo(testData1));
  }, []);

  return (
    <div>
      {todos.data.length ?
        <div>
          <div>{todos.data[0].id}</div>
          <div>{todos.data[0].name}</div>
          <div>{""+todos.data[0].completed}</div>
        </div> 
        : ''
      }      
    </div>
  )
}

describe('toggleTodo', () => {
  it('should create a new todo, then toggle completed', () => {
    render(
      <Provider store={store}>
        <ToggleTodoTestComponent />
      </Provider>
    );

    expect(screen.getByText('testId1')).toBeInTheDocument();
    expect(screen.getByText('testName1')).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });  
});


const EditTodoTestComponent = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeTodo(testData1));
    dispatch(createTodo(testData1));
    dispatch(editTodo(testData2));
  }, []);

  return (
    <div>
      {todos.data.length ?
        <div>
          <div>{todos.data[0].id}</div>
          <div>{todos.data[0].name}</div>
          <div>{""+todos.data[0].completed}</div>
        </div> 
        : ''
      }      
    </div>
  )
}

describe('toggleTodo', () => {
  it('should create a new todo, then edit name', () => {
    render(
      <Provider store={store}>
        <EditTodoTestComponent />
      </Provider>
    );

    expect(screen.getByText('testId1')).toBeInTheDocument();
    expect(screen.getByText('testName2')).toBeInTheDocument();
    expect(screen.getByText('false')).toBeInTheDocument();
  });  
});


const PersistTodoTestComponent = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeTodo(testData1));
    dispatch(createTodo(testData1));
    dispatch(persistDataToLocalStorage());
  }, []);

  return (<div></div>)
}

describe('persistDataToLocalStorage', () => {
  it('should create a new todo, then persistDataToLocalStorage', () => {
    render(
      <Provider store={store}>
        <PersistTodoTestComponent />
      </Provider>
    );

    const ls = JSON.parse(window.localStorage.getItem('todos'));
    expect(ls.length).toEqual(1);
    expect(ls[0].id).toEqual('testId1')
  });  
});