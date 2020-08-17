import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';

// smoke test
it("Control renders without crashing", () => {
  render(<TodoList />);
});

// snapshot test
it("matches snapshot", () => {
  const {asFragment} = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("has NewTodoForm", async () => {

  const { getByLabelText, getByText } = render(<TodoList />);
  
  expect(screen.getByLabelText('Add a new todo')).toBeInTheDocument();
  
  expect(screen.queryByText(/ADD TODO/i)).toBeInTheDocument();  
  
});