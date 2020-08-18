import React from "react";
import { render } from "@testing-library/react";
import Control from "./Control";

// smoke test
it("Control renders without crashing", () => {
  render(<Control />);
});

// snapshot test
it("matches snapshot", () => {
  const {asFragment} = render(<Control />);
  expect(asFragment()).toMatchSnapshot();
});
