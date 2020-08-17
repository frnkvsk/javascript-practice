import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// smoke test
it("Control renders without crashing", () => {
  render(<Todo />);
});

// snapshot test
it("matches snapshot", () => {
  const {asFragment} = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("handles completed button events", async () => {
  const completedTodo = jest.fn();
  const openEditTodo = jest.fn();
  const hideTodo = jest.fn();
  

  var { getByLabelText, getByText } = render(<Todo id='1' todoText='do test' completed={false} completedTodo={completedTodo} openEditTodo={openEditTodo} hideTodo={hideTodo} />);
  
  expect(getByText('do test')).toBeInTheDocument();
  
  const completedButton = getByLabelText(`completed`, {selector: 'button'});
  fireEvent.click(completedButton);
  expect(completedTodo).toHaveBeenCalled();

  const editButton = getByLabelText(`edit`, {selector: 'button'});
  fireEvent.click(editButton);
  expect(openEditTodo).toHaveBeenCalled();

  const deleteButton = getByLabelText(`delete`, {selector: 'button'});
  fireEvent.click(deleteButton);
  expect(hideTodo).toHaveBeenCalled();

  var { getByLabelText, getByText } = render(<Todo id='2' todoText='do test' completed={true} completedTodo={completedTodo} openEditTodo={openEditTodo} hideTodo={hideTodo} />);

});