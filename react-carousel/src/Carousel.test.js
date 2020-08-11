import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// smoke test
it("Card renders without crashing", () => {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("handles icon click events", () => {
  const { getByText, queryByTestId } = render(<Carousel />);
  const small = getByText("Image 1 of 3.");

  let leftArrow = queryByTestId("left-arrow");  
  let rightArrow = queryByTestId("right-arrow");

  // expect left arrow to be hidden on first image
  expect(leftArrow).toBeNull();

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect next image to show 
  expect(small).toHaveTextContent(/^Image 2 of 3.$/);
  
  // expect left arrow to now be visible
  leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeVisible();

  // move forward in the carousel
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect right arrow to hidden on last image
  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeNull();

  // move backward in the carousel
  fireEvent.click(leftArrow);
  expect(small).toHaveTextContent(/^Image 2 of 3.$/);


});