import { render, screen } from "@testing-library/react";
import App from "./App";

/**
 * Test sprawdzający renderowanie linku "learn react".
 *
 * @function
 */
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
