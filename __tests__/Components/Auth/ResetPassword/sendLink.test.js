import React from "react";
import { shallow } from "enzyme";

import {
  ResetPassword,
  mapDispatchToProps,
  mapStateToProps
} from "../../../../src/Components/Auth/ForgetPassword/ResetPassword/ResetPassword";

const setup = props => {
  const { sendLinkAction, status, loading } = props;

  const wrapper = shallow(
    <ResetPassword
      sendLinkAction={sendLinkAction}
      status={status}
      loading={loading}
    />
  );
  return wrapper;
};

const simulateChangeOnInput = (
  component,
  inputSelector,
  inputName,
  newValue
) => {
  const input = component.find(inputSelector);
  input.simulate("change", {
    target: {
      name: inputName,
      value: newValue
    }
  });
  return component.find(inputSelector);
};

describe("Send Password Reset Link Test Suite", () => {
  describe("Have props", () => {
    let wrapper;
    beforeEach(() => {
      const resetMock = jest.fn();
      const props = {
        sendLinkAction: resetMock
      };
      wrapper = setup(props);
    });

    it("should render without errors", () => {
      const component = wrapper;
      expect(component.length).toBe(1);
    });

    it("should have an inputbox and button tag", () => {
      const component = wrapper;
      expect(component.find("input").exists()).toBe(true);
      expect(component.find("#auth-email").exists()).toBe(true);
    });

    it("should simulate a change on inputBox", () => {
      const component = wrapper;
      const updatedEmail = simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );
      expect(updatedEmail.props().value).toBe("kalisa@gmail.com");
    });

    it("should test the state of the app after onChange event", () => {
      const component = wrapper;
      const componentInstance = component.instance();
      const updatedEmail = simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );
      expect(componentInstance.state.email).toEqual(updatedEmail.props().value);
    });

    it("should simulate submit event", () => {
      const resetMock = jest.fn();
      const props = {
        sendLinkAction: resetMock,
        loading: true
      };
      const component = setup(props);

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );

      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(resetMock).toHaveBeenCalledTimes(1);
    });

    it("should redirect to Home component", () => {
      jest.useFakeTimers();
      const props = {
        status: 0,
        sendLinkAction: jest.fn()
      };

      const component = setup(props);

      simulateChangeOnInput(
        component,
        "#auth-email",
        "email",
        "kalisa@gmail.com"
      );

      const form = component.find("form");
      form.simulate("submit", {
        preventDefault: () => {}
      });
      expect(component.instance().props.status).toBe(0);
      component.setProps({ status: 200 });
      jest.advanceTimersByTime(500);
    });

    it("should test the mapDispatchToProps", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).sendLinkAction();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });

    it("should return an object", () => {
      const expectedObject = {
        status: 400,
        loading: false
      };
      const stateObject = {
        resetLink: {
          status: 400,
          loading: false
        }
      };
      const returnedObject = mapStateToProps(stateObject);
      expect(returnedObject).toStrictEqual(expectedObject);
    });
  });
});
