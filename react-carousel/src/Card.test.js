import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// smoke test
it("Card renders without crashing", () => {
  render(<Card />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
