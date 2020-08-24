import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// smoke and appearance tests
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const colorForm = getByText(/welcome to the color factory/i);
  expect(colorForm).toBeInTheDocument();
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

// test complete display of color page
it("handles ColorDisplay click events", () => {
  // get link to display page and fire event to open display page
  var { getByText } = render(<App />);
  const red = getByText("red");
  expect(red).toBeInTheDocument();
  fireEvent.click(red);
  // verify display page is open
  var { getAllByText } = render(<App />);
  const redDisplay = getAllByText("ISN'T IT BEAUTIFUL?");
  expect(redDisplay[0]).toBeInTheDocument();
  const goBack = getAllByText("GO BACK");
  // click on go link to take us back to the home page
  fireEvent.click(goBack[0]);
  // verify we are now on home page
  var { getAllByText } = render(<App />);
  const green = getAllByText("green");
  expect(green[0]).toBeInTheDocument();
});

// test complete add a color form process
it("handles ColorForm click events", () => {
  // get link to form and fire event to open form
  var { getByText } = render(<App />);
  const addAColor = getByText(/add a color/i);
  expect(addAColor).toBeInTheDocument();
  fireEvent.click(addAColor);
  // verify form is open
  var { getAllByText } = render(<App />);
  const addThisColor = getAllByText(/add this color/i);
  expect(addThisColor[0]).toBeInTheDocument();
  const colorName = getAllByText(/color name/i);
  expect(colorName[0]).toBeInTheDocument();
  // add a new color text to the form input field and fire button click event
  fireEvent.change(colorName[0].nextSibling, {target : {value : 'purple'}});
  fireEvent.click(addThisColor[0]);
  // should take us back to the home page and new color should be present
  var { getAllByText } = render(<App />);
  const purple = getAllByText("purple");
  expect(purple[0]).toBeInTheDocument();
});