import React from "react";
import { shallow } from "enzyme";
import NavBar from "../../../../src/Components/Shared/NavBar/NavBar";

describe("<NavBar />", () => {
  it("it renders NavBar component", () => {
    const testNavBar = shallow(<NavBar />);
    expect(testNavBar.find("Fragment").length).toEqual(1);
  });
});
