import React from "react";
import { shallow, mount } from "enzyme";
import SocialAuth from "../../../../src/Components/Auth/SocialAuth/SocialAuth";

describe("Social Auth Tests", () => {
  it("should render SocialAuth component elements", () => {
    const socialAuth = shallow(<SocialAuth />);
    expect(socialAuth.find("button").length).toEqual(2);
    expect(socialAuth.find("span").length).toEqual(1);
    expect(socialAuth.find("div").length).toEqual(2);
  });

  it("should test google button click event", () => {
    window.open = jest.fn();
    const socialAuth = mount(<SocialAuth />);
    socialAuth.find("button.social-signin-section__google").simulate("click");
    expect(window.open).toHaveBeenCalled();
  });

  it("should test facebook button click event", () => {
    window.open = jest.fn();
    const socialAuth = mount(<SocialAuth />);
    socialAuth.find("button.social-signin-section__facebook").simulate("click");
    expect(window.open).toHaveBeenCalled();
  });
});
