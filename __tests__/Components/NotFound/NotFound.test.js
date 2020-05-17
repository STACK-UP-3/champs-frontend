import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../../src/Components/NotFound/NotFound";

describe("<NotFound />", () => {
  it("it renders home component", () => {
    const testNotFound = shallow(<NotFound />);
    expect(testNotFound.find("h1").length).toEqual(1);
  });
});
