import React from 'react';
import { render } from '@testing-library/react';
import ColorBox from './ColorBox';

// smoke test
it("Control renders without crashing", () => {
  render(<ColorBox />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<ColorBox />);
  expect(asFragment()).toMatchSnapshot();
});
