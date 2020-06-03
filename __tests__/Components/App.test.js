import React from "react";
import { shallow } from "enzyme";
import App from "../../src/Components/App.jsx";

describe("<App />", () => {
  it("it renders App component", () => {
    const testApp = shallow(<App />);
    expect(testApp.length).toBe(1);
  });
});
