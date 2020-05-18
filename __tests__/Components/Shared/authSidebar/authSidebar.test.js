import React from "react";
import { shallow } from "enzyme";
import AuthSidebar from "../../../../src/Components/Shared/AuthSidebar/AuthSidebar";

const setUp = (props = {}) => {
  const component = shallow(<AuthSidebar {...props} />);
  return component;
};

describe("AuthSidebar test suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        active: "signIn"
      };
      wrapper = setUp(props);
    });

    it("should test for a sign-up link", () => {
      const component = setUp({
        active: "signUp"
      });
      const SignUpLink = component.find("#sign-up-link");
      expect(SignUpLink.props().className).toBe(
        "auth-sidebar__nav__links auth-sidebar__nav__links--active"
      );
    });
    it("should render without error", () => {
      const component = wrapper;
      expect(component.find("div").exists()).toBe(true);
    });

    it("should update the state to show the sidebar and a blur background when the hamburger button is clicked", () => {
      const component = wrapper;
      const hamburger = component.find(".auth-navbar__hamburger");
      const blurBackground = component.find("#blur-background");
      const sideBar = component.find("#side-bar");

      expect(hamburger.exists()).toBe(true);
      expect(blurBackground.exists()).toBe(true);
      expect(sideBar.exists()).toBe(true);

      expect(blurBackground.props().className).toBe("blur-background");
      expect(sideBar.props().className).toBe("auth-sidebar");
      hamburger.simulate("click");

      const updatedBlurBackground = component.find("#blur-background");
      const updatedSidebar = component.find("#side-bar");

      expect(updatedBlurBackground.props().className).toBe(
        "blur-background blur-background--active"
      );
      expect(updatedSidebar.props().className).toBe(
        "auth-sidebar auth-sidebar--active"
      );
    });

    it("should update the state to hide the sidebar and a blur background when the blur background button is clicked or touched", () => {
      const component = wrapper;
      const hamburger = component.find(".auth-navbar__hamburger");
      const blurBackground = component.find("#blur-background");
      const sideBar = component.find("#side-bar");
      const blurBackgroundButton = component.find(".blur-background__button");
      expect(blurBackgroundButton.exists()).toBe(true);
      expect(hamburger.exists()).toBe(true);
      expect(blurBackground.exists()).toBe(true);
      expect(sideBar.exists()).toBe(true);
      hamburger.simulate("click");
      blurBackgroundButton.simulate("touchStart");
      blurBackgroundButton.simulate("touchMove");
      blurBackgroundButton.simulate("touchEnd");
      const updatedBlurBackground = component.find("#blur-background");
      const updatedSidebar = component.find("#side-bar");

      expect(updatedBlurBackground.props().className).toBe("blur-background");
      expect(updatedSidebar.props().className).toBe("auth-sidebar");
    });
  });

  describe("Have no props", () => {
    it("should not render", () => {
      const wrapper = shallow(<AuthSidebar />);
      expect(wrapper.find("div").exists()).toBe(false);
    });
  });
});
