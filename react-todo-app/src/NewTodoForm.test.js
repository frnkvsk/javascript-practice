import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

describe("smoke and snapshot", () => {
  const mockAddNewTodo = jest.fn();
  // smoke test
  it("Control renders without crashing", () => {
    render(<NewTodoForm addNewTodo={mockAddNewTodo} />);
  });

  // snapshot test
  it("matches snapshot", () => {
    const {asFragment} = render(<NewTodoForm addNewTodo={mockAddNewTodo} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("check for initial components", () => {
  const mockAddNewTodo = jest.fn();
  let { getByLabelText } = render(<NewTodoForm addNewTodo={mockAddNewTodo} />);
  
  const textInput = screen.getByLabelText('Add a new todo');
  expect(textInput).toBeInTheDocument();
  
  const button = screen.queryByText(/ADD TODO/i);
  expect(button).toBeInTheDocument();
});

describe("check input field", () => {
  it("check for input", async () => {
    const mockAddNewTodo = jest.fn({todo:"do testing"});
    const handleSubmit = jest.fn();

    let { getByLabelText } = render(<NewTodoForm addNewTodo={mockAddNewTodo} />);
  
    const textInput = screen.getByLabelText('Add a new todo');
    fireEvent.change(textInput, { target: { value: "do test"}});
    expect(textInput).toHaveAttribute('value', 'do test');


    const button = screen.queryByText(/ADD TODO/i);
    await fireEvent.click(button);
    // can't figure out how to test handleSubmit or addNewTodo function calls from form submit

  });
});
