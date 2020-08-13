import React from "react";
import { render, fireEvent, getByTestId, screen, getByRole } from "@testing-library/react";
import Board from "./Board";

// smoke test
it("Board renders without crashing", () => {
  render(<Board />);
});


