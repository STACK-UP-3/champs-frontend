import React from "react";
import { shallow } from "enzyme";
import SignIn from "../../../src/Components/SignIn/SignIn";

describe("<SignIn />", () => {
  it("it renders home component", () => {
    const testSignIn = shallow(<SignIn />);
    expect(testSignIn.find("h2").length).toEqual(1);
  });
});
