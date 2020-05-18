import React from "react";
import { render } from "enzyme";
import App from "../../src/Components/App.jsx";

describe("<App />", () => {
  it("it renders App component", () => {
    const testApp = render(<App />);
    expect(testApp);
  });
});
