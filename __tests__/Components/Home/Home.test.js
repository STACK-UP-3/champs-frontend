import React from "react";
import { shallow } from "enzyme";
import Home from "../../../src/Components/Home/Home";

describe("<Home />", () => {
  it("it renders home component", () => {
    const testHome = shallow(<Home />);
    expect(testHome.find("h2").length).toEqual(1);
  });
});
