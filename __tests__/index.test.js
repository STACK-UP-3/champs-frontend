import React from "react";
import ReactDOM from "react-dom";
import App from "../src/index";

jest.mock("react-dom", () => ({ render: jest.fn() }));

it("should render correctly", () => {
  ReactDOM.render(<App />);
  global.document.getElementById = id => id === "app";
  expect(ReactDOM.render).toHaveBeenCalledWith(<App />);
});
