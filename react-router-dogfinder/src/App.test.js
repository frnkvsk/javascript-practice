import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// smoke and appearance test
test('renders dog name from list', () => {
  const { getByText } = render(<App />);
  const listElement = getByText(/Name: Whiskey/i);
  expect(listElement).toBeInTheDocument();
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

it("handles Nav click event", () => {
  var { getByText } = render(<App />);
  const whiskey = getByText("Whiskey");
  expect(whiskey).toBeInTheDocument();
  fireEvent.click(whiskey);
  var { getByText } = render(<App />);
  const dogFact = getByText("Whiskey loves eating popcorn.");
  expect(dogFact).toBeInTheDocument();

});
it("handles DogList click event", () => {
  var { getByText } = render(<App />);
  const tubby = getByText("Name: Tubby");
  expect(tubby).toBeInTheDocument();
  fireEvent.click(tubby);
  var { getByText } = render(<App />);
  const dogFact = getByText("Tubby is really stupid.");
  expect(dogFact).toBeInTheDocument();

});

it("handles DogDisplay click events", () => {
  var { getByText } = render(<App />);
  const tubby = getByText("Name: Tubby");
  fireEvent.click(tubby);
  var { getByText } = render(<App />);
  const back = getByText(/back/i);
  fireEvent.click(back);
  var { getAllByText } = render(<App />);
  const whiskey = getAllByText("Name: Whiskey");
  expect(whiskey[0]).toBeInTheDocument();

});