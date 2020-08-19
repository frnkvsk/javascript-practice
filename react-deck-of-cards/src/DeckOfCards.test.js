import React from 'react';
import { render } from '@testing-library/react';
import DeckOfCards from './DeckOfCards';

// smoke test
it("Control renders without crashing", () => {
  render(<DeckOfCards />);
});

// snapshot test
it("matches snapshot", () => {
  const {asFragment} = render(<DeckOfCards />);
  expect(asFragment()).toMatchSnapshot();
});