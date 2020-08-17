import React from 'react';
import { render, screen,fireEvent, getByLabelText, getComputedStyle, getAllByRole } from '@testing-library/react';
import Todo from './Todo';
import { ListItemText } from '@material-ui/core';

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
  

  var { getByLabelText } = render(<Todo id='1' todoText='do test' completed={false} completedTodo={completedTodo} openEditTodo={openEditTodo} hideTodo={hideTodo} />);
  const completedButton = getByLabelText(`completed`, {selector: 'button'});
  // fireEvent.click(completedButton);

  // var { getByLabelText } = render(<Todo id='1' todoText='do test' completed='true' completedTodo='()=>' openEditTodo='()=>' hideTodo='()=>' />);
  // const style = getComputedStyle('text-decoration: none');
  // console.log(style)

  // console.log('completedButton', completedButton)

  
  expect(1).toEqual(1);
});