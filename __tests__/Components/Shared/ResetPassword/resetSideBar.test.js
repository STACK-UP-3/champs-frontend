import React from "react";
import { shallow } from "enzyme";
import ResetSideBar from "../../../../src/Components/Shared/ResetSideBar/ResetSideBar";

const setUp = () => {
  const component = shallow(<ResetSideBar />);
  return component;
};

describe("Password Reset Sidebar Test Suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        active: "signIn"
      };
      wrapper = setUp(props);
    });
    it("should render without error", () => {
      const component = wrapper;
      expect(component.find("div").exists()).toBe(true);
    });

    it("should update the state to show the sidebar and a blur background when the hamburger button is clicked", () => {
      const component = wrapper;
      const blurBackground = component.find("#blur-background");
      const sideBar = component.find("#side-bar");

      expect(blurBackground.exists()).toBe(true);
      expect(sideBar.exists()).toBe(true);

      expect(blurBackground.props().className).toBe("blur-background");
      expect(sideBar.props().className).toBe("auth-sidebars");

      const updatedBlurBackground = component.find("#blur-background");
      const updatedSidebar = component.find("#side-bar");

      expect(updatedBlurBackground.props().className).toBe("blur-background");
      expect(updatedSidebar.props().className).toBe("auth-sidebars");
    });

    it("should update the state to hide the sidebar and a blur background when the blur background button is clicked or touched", () => {
      const component = wrapper;
      const blurBackground = component.find("#blur-background");
      const sideBar = component.find("#side-bar");
      const blurBackgroundButton = component.find(".blur-background__button");
      expect(blurBackgroundButton.exists()).toBe(true);
      expect(blurBackground.exists()).toBe(true);
      expect(sideBar.exists()).toBe(true);
      blurBackgroundButton.simulate("touchStart");
      blurBackgroundButton.simulate("touchMove");
      blurBackgroundButton.simulate("touchEnd");
      const updatedBlurBackground = component.find("#blur-background");
      const updatedSidebar = component.find("#side-bar");

      expect(updatedBlurBackground.props().className).toBe("blur-background");
      expect(updatedSidebar.props().className).toBe("auth-sidebars");
    });
  });

  describe("Have no props", () => {
    it("should render", () => {
      const wrapper = shallow(<ResetSideBar />);
      expect(wrapper.find("div").exists()).toBe(true);
    });
  });
});
